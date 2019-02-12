function startSystem() {
   let dm = new AuthorManager();
}

class AuthorManager {
   constructor() {
      this._translator = new Translator();
      this._compiledCase = null;
      this._knots = null;
      
      this._server = new DCCAuthorServer();
      
      this._currentCaseName = null;
      this._knotSelected = null;
      this._htmlKnot = null;
      this._renderSlide = true;
      this._editor = null;
      
      this.controlEvent = this.controlEvent.bind(this);
      window.messageBus.subscribe("control", this.controlEvent);

      this._caseLoadSelected = this._caseLoadSelected.bind(this);
      this._templateLoadSelected = this._templateLoadSelected.bind(this);
   }
   
   controlEvent(topic, message) {
      switch (topic) {
         case "control/load": this.selectCase();
                              break;
         case "control/save": this.saveCase();
                              break;
         case "control/edit-knot": this.editKnot();
                                   break;
         case "control/play": this.playCase();
                              break;
         case "control/knot-selected": this.knotSelected(message);
                                       break;
      }
   }
   
   /*
    * ACTION: control-load (1)
    */
   async selectCase() {
      this._resourcePicker = new DCCResourcePicker();
      
      window.messageBus.subscribe("dcc/resource-picker/selected", this._caseLoadSelected);
      
      const cases = await this._server.casesList(this._resourcePicker);
      this._resourcePicker.addSelectList(cases);
      let knotPanel = document.querySelector("#knot-panel");
      knotPanel.appendChild(this._resourcePicker);
   }

   /*
    * ACTION: control-load (2)
    */
   async _caseLoadSelected(topic, message) {
      window.messageBus.unsubscribe("dcc/resource-picker/selected", this._caseLoadSelected);
      this._currentCaseName = message;
      let caseMd = await this._server.loadCase(this._currentCaseName);
      let navigationPanel  = document.querySelector("#navigation-panel");
      let knotPanel = document.querySelector("#knot-panel");
      knotPanel.removeChild(this._resourcePicker);
      
      this._compiledCase = this._translator.compileMarkdown(this._currentCaseName, caseMd);
      this._knots = this._compiledCase.knots;
      
      for (let kn in this._knots) {
         if (this._knots[kn].type == "knot") {
            let miniature = document.createElement("div");
            miniature.classList.add("navigation-knot");
            miniature.classList.add("std-border");
            miniature.innerHTML = "<h2><dcc-trigger action='control/knot-selected' xstyle='none' " +
                                      "label = '" + this._knots[kn].title + "'>"
                                  "</dcc-trigger></h2>";
            navigationPanel.appendChild(miniature);
         }
            
      }
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
         const versionFile = await this._server.saveCase(this._currentCaseName, md);
         
         console.log("Case saved! Previous version: " + versionFile);
         document.querySelector("#message-space").innerHTML = "Saved";
         setTimeout(this._clearMessage, 2000);

         let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 2000);
         });
         let result = await promise;
         document.querySelector("#message-space").innerHTML = "";
      }
   }

   /*
    * ACTION: control-play
    */
   async playCase() {
      let message = document.querySelector("#message-space");
      message.innerHTML = "Preparing...";
      await this._server.prepareCaseHTML(this._currentCaseName);

      this._templateSet = {
         player: await this._server.loadTemplate("player")
      };
      
      const total = Object.keys(this._knots).length;
      let processing = 0;
      for (let kn in this._knots) {
         processing++;
         message.innerHTML = "Processed: " + processing + "/" + total; 
         let htmlName = kn.replace(/ /igm, "_");
         let finalHTML = await this._generateHTMLBuffer(kn);
         finalHTML = this._templateSet.player.replace("{knot}", finalHTML);
         await this._server.saveKnotHTML(this._currentCaseName,
                                         htmlName + ".html", finalHTML);
      }
      message.innerHTML = "Finalizing...";
      
      let caseJSON = this._translator.generateCompiledJSON(this._compiledCase);
      await this._server.saveCaseScript(this._currentCaseName, "case.js", caseJSON);
      
      message.innerHTML = "";
      
      delete this._templateSet;
      window.open("../cases/" + this._currentCaseName + "/html/index.html", "_blank");
   }
   
   /*
    * ACTION: config
    */
   async config() {
      this._resourcePicker = new DCCResourcePicker();
      
      window.messageBus.subscribe("dcc/resource-picker/selected", this._caseLoadSelected);
      
      const cases = await this._server.casesList(this._resourcePicker);
      this._resourcePicker.addSelectList(cases);
      let knotPanel = document.querySelector("#knot-panel");
      knotPanel.appendChild(this._resourcePicker);
   }

   /*
    * ACTION: knot-selected
    */
   async knotSelected(knotTitle) {
      if (this._knots[knotTitle]) {
         this._checkKnotModification();
         this._knotSelected = knotTitle;
         this._htmlKnot = await this._generateHTML(this._knotSelected);
         this._renderKnot();
      }
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
         if (!this._templateSet[templates[tp]])
            this._templateSet[templates[tp]] =
               await this._server.loadTemplate(templates[tp]);
      let finalHTML = this._translator.generateKnotHTML(this._knots[knot]);
      for (let tp in templates)
         finalHTML = this._templateSet[templates[tp]].replace("{knot}", finalHTML);
      
      return finalHTML;
   }
   
   _renderKnot() {
      let knotPanel = document.querySelector("#knot-panel");
      
      if (this._renderSlide) {
         document.querySelector("#player-panel").innerHTML = "";
         knotPanel.innerHTML = this._htmlKnot;
         
         let dccs = document.querySelectorAll("*");
         for (let d = 0; d < dccs.length; d++)
            if (dccs[d].tagName.toLowerCase().startsWith("dcc-lively-talk"))
               dccs[d].editDCC();
      } else {
         knotPanel.innerHTML = "<div id='editor-space'></div>";
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