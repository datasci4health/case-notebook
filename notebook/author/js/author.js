/*
function startSystem() {
   let dm = new AuthorManager();
}
*/

class AuthorManager {
   constructor() {
      window.messageBus.page = new MessageBus(false);
      
      this._translator = new Translator();
      this._compiledCase = null;
      this._knots = null;
      
      this._navigator = new Navigator();
      
      this._server = new DCCAuthorServer();
      
      this._currentTemplateFamily = "jacinto";
      this._currentCaseName = null;
      this._knotSelected = null;
      this._htmlKnot = null;
      this._renderSlide = true;
      this._editor = null;
      
      this.controlEvent = this.controlEvent.bind(this);
      window.messageBus.ext.subscribe("control/#", this.controlEvent);
      
      this.selectKnot = this.selectKnot.bind(this);
      window.messageBus.ext.subscribe("knot/+/selected", this.selectKnot);

      this._caseLoadSelected = this._caseLoadSelected.bind(this);
      this._templateFamilySelected = this._templateFamilySelected.bind(this);
   }
   
   start() {
      this._navigationPanel = document.querySelector("#navigation-panel");
      this._knotPanel = document.querySelector("#knot-panel");
      this._messageSpace = document.querySelector("#message-space");
   }
   
   /*
    * `control/case/load`
    * `control/case/save`
    * `control/case/play`
    * `control/knot/edit`
    * `control/config/edit`

    * `knot/<knot>/selected`

    */
   controlEvent(topic, message) {
      switch (topic) {
         case "control/case/load": this.selectCase();
                                    break;
         case "control/case/save": this.saveCase();
                                    break;
         case "control/knot/edit": this.editKnot();
                                    break;
         case "control/case/play": this.playCase();
                                    break;
         case "control/config/edit": this.config();
                                     break;
         /*
         case "control/knot/selected": this.selectKnot(message);
                                        break;
         */
      }
   }
   
   /*
    * ACTION: control-load (1)
    */
   async selectCase() {
      this._resourcePicker = new DCCResourcePicker();
      this._resourcePicker.resource = "case";
      
      window.messageBus.ext.subscribe("control/case/selected", this._caseLoadSelected);
      
      // const cases = await this._server.casesList(this._resourcePicker);
      const cases = await window.messageBus.ext.request("case/*/get", "", "case/*");
      this._resourcePicker.addSelectList(cases.message);
      // let knotPanel = document.querySelector("#knot-panel");
      this._knotPanel.appendChild(this._resourcePicker);
   }

   /*
    * ACTION: control-load (2)
    */
   async _caseLoadSelected(topic, message) {
      window.messageBus.ext.unsubscribe("control/case/selected", this._caseLoadSelected);
      this._currentCaseName = message.selected;
      // let caseMd = await this._server.loadCase(this._currentCaseName);
      const caseMd = await window.messageBus.ext.request("case/" + this._currentCaseName + "/get", "",
                                                          "case/" + this._currentCaseName);
      // let navigationPanel  = document.querySelector("#navigation-panel");
      // let knotPanel = document.querySelector("#knot-panel");
      this._knotPanel.removeChild(this._resourcePicker);
      
      this._compiledCase = this._translator.compileMarkdown(this._currentCaseName, caseMd.message);
      this._knots = this._compiledCase.knots;
      
      /*
      this._knotPanel.style.flex = "20%";
      this._navigationPanel.style.flex = "80%";
      this._navigator.mountCase(this._compiledCase.knots);
      */
      this._navigator.mountPlainCase(this, this._compiledCase.knots);
   }

   /*
    * ACTION: control-edit
    */
   async editKnot() {
      if (this._knotSelected != null) {
         if (this._checkKnotModification())
            this._htmlKnot = await this._generateHTML(this._knotSelected);
            // await this._generateHTML();
         this._renderSlide = !this._renderSlide;
         this._renderKnot();
      }
   }
   
   /*
    * ACTION: control-save
    */
   async saveCase() {
      if (this._currentCaseName != null && this._compiledCase != null) {
         let md =this._translator.assembleMarkdown(this._compiledCase);
         // const versionFile = await this._server.saveCase(this._currentCaseName, md);
         const versionFile = await window.messageBus.ext.request("case/" + this._currentCaseName + "/set",
                                                                 {format: "markdown", source: md},
                                                                 "case/" + this._currentCaseName + "/version");
         
         console.log("Case saved! Previous version: " + versionFile.message);
         // document.querySelector("#message-space").innerHTML = "Saved";
         this._messageSpace.innerHTML = "Saved";
         setTimeout(this._clearMessage, 2000);

         let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 2000);
         });
         let result = await promise;
         // document.querySelector("#message-space").innerHTML = "";
         this._messageSpace.innerHTML = "";
      }
   }

   /*
    * ACTION: control-play
    */
   async playCase() {
      // let message = document.querySelector("#message-space");
      this._messageSpace.innerHTML = "Preparing...";
      // await this._server.prepareCaseHTML(this._currentTemplateFamily, this._currentCaseName);
      await window.messageBus.ext.request("case/" + this._currentCaseName + "/prepare",
                                          this._currentTemplateFamily,
                                          "case/" + this._currentCaseName + "/prepare/status");

      this._templateSet = {};
      /*
      this._templateSet = {
         player: await this._server.loadPlayer()
      };
      */
      
      const htmlSet = Object.assign(
                         {"entry": {render: true},
                          "signin": {render: true},
                          "register": {render: true},
                          "report": {render: true}},
                         this._knots);
      const total = Object.keys(htmlSet).length;
      let processing = 0;
      for (let kn in htmlSet) {
         processing++;
         this._messageSpace.innerHTML = "Processed: " + processing + "/" + total;
         if (htmlSet[kn].render) {
            let finalHTML = "";
            if (processing > 4)
               finalHTML = await this._generateHTMLBuffer(kn);
            else 
               finalHTML = await this._loadTemplate(this._currentTemplateFamily, kn);
            finalHTML = (htmlSet[kn].categories && htmlSet[kn].categories.indexOf("note") >= 0)
               ? AuthorManager.jsonNote.replace("{knot}", finalHTML)
               : AuthorManager.jsonKnot.replace("{knot}", finalHTML);
            
            await window.messageBus.ext.request("knot/" + kn + "/set",
                                                {caseId: this._currentCaseName,
                                                 format: "html",
                                                 source: finalHTML},
                                                "knot/" + kn + "/set/status");
            /*
            await this._server.saveKnotHTML(this._currentCaseName,
                                            kn + ".js", finalHTML);
            */
         }
      }
      this._messageSpace.innerHTML = "Finalizing...";
      
      let caseJSON = this._translator.generateCompiledJSON(this._compiledCase);
      // await this._server.saveCaseScript(this._currentCaseName, "case.js", caseJSON);
      await window.messageBus.ext.request("case/" + this._currentCaseName + "/set",
                                          {format: "json", source: caseJSON},
                                          "case/" + this._currentCaseName + "/set/status");
      
      this._messageSpace.innerHTML = "";
      
      delete this._templateSet;
      window.open("../cases/" + this._currentCaseName + "/html/index.html", "_blank");
   }
   
   /*
    * ACTION: config (1)
    */
   async config() {
      this._resourcePicker = new DCCResourcePicker();
      this._resourcePicker.resource = "template_family";
      
      window.messageBus.ext.subscribe("control/template_family/selected", this._templateFamilySelected);
      
      // const families = await this._server.templateFamiliesList(this._resourcePicker);
      const families = await window.messageBus.ext.request("template_family/*/get", "", "template_family/*");
      
      this._resourcePicker.addSelectList(families.message);
      document.querySelector("#knot-panel").appendChild(this._resourcePicker);
   }

   /*
    * ACTION: config (2)
    */
   async _templateFamilySelected(topic, message) {
      window.messageBus.ext.unsubscribe("control/template_family/selected", this._templateFamilySelected);
      this._currentTemplateFamily = message.selected;
      document.querySelector("#knot-panel").removeChild(this._resourcePicker);
   }
   
   /*
    * ACTION: knot-selected
    */
   async selectKnot(topic, message) {
      // console.log("selected - topic: " + topic + "; message: " + message);
      const knotId = MessageBus.extractLevel(topic, 2);
      if (knotId != null) {
         this._checkKnotModification();
         this._knotSelected = knotId;
         this._htmlKnot = await this._generateHTML(this._knotSelected);
         this._renderKnot();
      }

      // <TODO> improve this timeout solution
      /*
      let promise = new Promise((resolve, reject) => {
         setTimeout(() => resolve(), 1000);
      });
      let result = await promise;
      
      if (!this._knots[this._knotSelected].miniature && this._renderSlide) {
         let promiseCapture = html2canvas(document.querySelector('body'), {scale: 0.2});
         this._knots[this._knotSelected].miniature = await promiseCapture;
         this._knots[this._knotSelected].miniature.style.width = "205px";
         this._knots[this._knotSelected].miniature.style.height = "153px";
      }
      const mini = document.querySelector("#mini-" + this._knotSelected.replace(/\./, "_"));
      // mini.innerHTML = "";
      mini.appendChild(this._knots[this._knotSelected].miniature);
      */
      /*
      let promise = new Promise((resolve, reject) => {
         setTimeout(() => resolve(), 1000);
      });
      let result = await promise;
      if (!this._knots[this._knotSelected].miniature && this._renderSlide) {
         let promiseCapture = domtoimage.toPng(this._knotPanel);
         let dataUrl = await promiseCapture;
         let img = new Image();
         img.src = dataUrl;
         img.width = 200;
         img.height = 200;
         const mini = document.querySelector("#mini-" + this._knotSelected.replace(/\./, "_"));
         mini.appendChild(img);
      }
      */
   }
   
   /*
    * Check if the knot was modified to update it
    */
   _checkKnotModification() {
      let modified = false;
      if (!this._renderSlide && this._editor != null) {
         let editorText = this._editor.getText();
         editorText = editorText.substring(0, editorText.length - 1);
         if (this._knots[this._knotSelected]._source != editorText) {
            modified = true;
            this._knots[this._knotSelected]._source = editorText;
            this._translator.extractKnotAnnotations(this._knots[this._knotSelected]);
            this._translator.compileKnotMarkdown(this._knots[this._knotSelected]);
         }
      }
      return modified;
   }
   
   async _generateHTML(knot) {
      this._templateSet = {};
      let finalHTML = await this._generateHTMLBuffer(knot);
      delete this._templateSet;
      return finalHTML;
   }
   
   async _generateHTMLBuffer(knot) {
      let templates = (this._knots[knot].categories) ?
                       this._knots[knot].categories : ["knot"];
      for (let tp in templates)
         if (!this._templateSet[templates[tp]]) {
            const templ = await
                    this._loadTemplate(this._currentTemplateFamily, templates[tp]);
            if (templ != "")
               this._templateSet[templates[tp]] = templ;
            else {
               if (!this._templateSet["knot"])
                  this._templateSet["knot"] = await
                     this._loadTemplate(this._currentTemplateFamily, "knot");
               this._templateSet[templates[tp]] = this._templateSet["knot"];
            }
         }
      let finalHTML = this._translator.generateKnotHTML(this._knots[knot]);
      // for (let tp in templates)
      for (let tp = templates.length-1; tp >= 0; tp--)
         finalHTML = this._templateSet[templates[tp]].replace("{knot}", finalHTML);
      
      return finalHTML;
   }
   
   async _loadTemplate(templateFamily, templateName) {
      const templateObj = await window.messageBus.ext.request(
            "template/" + templateFamily + "." + templateName + "/get", "",
            "template/" + templateFamily + "." + templateName);
      return templateObj.message;
   }
   
   _renderKnot() {
      // let knotPanel = document.querySelector("#knot-panel");
      
      if (this._renderSlide) {
         this._knotPanel.innerHTML = this._htmlKnot;
         
         let dccs = document.querySelectorAll("*");
         for (let d = 0; d < dccs.length; d++)
            if (dccs[d].tagName.toLowerCase().startsWith("dcc-lively-talk"))
               dccs[d].editDCC();
      } else {
         this._knotPanel.innerHTML = "<div id='editor-space'></div>";
         this._editor = new Quill('#editor-space', {
            theme: 'snow'
          });
         this._editor.insertText(0, this._knots[this._knotSelected]._source);
      }
   }
   
   // <TODO> Temporary
   /*
   dispatchEvent(event) {
      this._resourceSelected(event);
   }
   */
}

(function() {
   AuthorManager.jsonKnot = "(function() { PlayerManager.instance().presentKnot(`{knot}`) })();";
   AuthorManager.jsonNote = "(function() { PlayerManager.instance().presentNote(`{knot}`) })();";
   
   AuthorManager.author = new AuthorManager();
})();