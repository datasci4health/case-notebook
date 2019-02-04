function startSystem() {
   let dm = new AuthorManager();
}

class AuthorManager {
   constructor() {
      this._translator = new Translator();
      this._compiledCase = null;
      
      this._server = new DCCNotebookServer();
      
      this._currentCaseName = null;
      this._knotSelected = null;
      // this._htmlTemplates = null;
      this._htmlKnot = null;
      this._renderSlide = true;
      this._editor = null;
      
      this.controlEvent = this.controlEvent.bind(this);
      window.messageBus.subscribe("control", this.controlEvent);
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
      this._resPicker = new DCCResourcePicker();
      this._resourceSelected = this._resourceSelected.bind(this);
      
      document.addEventListener("control/resource-selected", this._resourceSelected);
      this._resPicker.addSelectionListener(this);
      
      const cases = await this._server.casesList(this._resPicker);
      this._resPicker.addSelectList(cases);
      let knotPanel = document.querySelector("#knot-panel");
      knotPanel.appendChild(this._resPicker);
   }

   /*
    * ACTION: control-load (2)
    */
   async _resourceSelected(event) {
      this._currentCaseName = event.detail;
      let caseMd = await this._server.loadCase(this._currentCaseName);
      let navigationPanel  = document.querySelector("#navigation-panel");
      let knotPanel = document.querySelector("#knot-panel");
      knotPanel.removeChild(this._resPicker);
      
      this._compiledCase = this._translator.compileMarkdown(caseMd);
      
      for (let kn in this._compiledCase) {
         if (this._compiledCase[kn].type == "knot") {
            let miniature = document.createElement("div");
            miniature.classList.add("navigation-knot");
            miniature.classList.add("std-border");
            miniature.innerHTML = "<h2><dcc-trigger action='control/knot-selected' render='none' " +
                                      "label = '" + this._compiledCase[kn].title + "'>"
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
      await this._server.prepareCaseHTML(this._currentCaseName);
      this._allKnotTitles = Object.keys(this._compiledCase);
      this._knotLoop = -1;
      this._templateSet = {
         player: await this._server.loadTemplate("player")
      };
      
      for (let kn in this._compiledCase) {
         
         let htmlName = kn.replace(/ /igm, "_");
         let finalHTML = await this._generateHTMLBuffer(kn);
         finalHTML = this._templateSet.player.replace("{knot}", finalHTML);
         
         /*
         let templates = (this._compiledCase[kn].categories) ?
               this._compiledCase[kn].categories : ["knot"];
         for (let tp in templates)
            if (!this._templateSet[tp])
               this._templateSet[tp] = await this._server.loadTemplate(tp);
         let htmlName = kn.replace(/ /igm, "_");
         let finalHTML = this._translator.generateKnotHTML(this._compiledCase[kn]);
         for (let tp in templates)
            finalHTML = this._templateSet[tp].replace("{knot}", finalHTML);
         finalHTML = this._templateSet.player.replace("{knot}", finalHTML);
         */
         
         /*
         let finalHTML =  this._templateSet.player.replace("{knot}",
            this._templateSet[template].replace("{knot}",
               this._translator.generateKnotHTML(this._compiledCase[kn])));      
         */
         await this._server.saveKnotHTML(this._currentCaseName,
                                         htmlName + ".html", finalHTML);
      }
      
      delete this._templateSet;
      window.open("../cases/" + this._currentCaseName + "/html/index.html", "_blank");
   }
     
   /*
    * ACTION: knot-selected
    */
   async knotSelected(knotTitle) {
      // this._htmlTemplates = null;
      
      if (this._compiledCase[knotTitle]) {
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
         if (this._compiledCase[this._knotSelected]._source != editorText) {
            modified = true;
            this._compiledCase[this._knotSelected]._source = editorText;
            this._translator.extractKnotAnnotations(this._compiledCase[this._knotSelected]);
            this._translator.compileKnotMarkdown(this._compiledCase[this._knotSelected]);
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
      let templates = (this._compiledCase[knot].categories) ?
                       this._compiledCase[knot].categories : ["knot"];
      console.log("Templates:");
      console.log(templates);
      for (let tp in templates)
         if (!this._templateSet[templates[tp]])
            this._templateSet[templates[tp]] =
               await this._server.loadTemplate(templates[tp]);
      // let htmlName = kn.replace(/ /igm, "_");
      let finalHTML = this._translator.generateKnotHTML(this._compiledCase[knot]);
      for (let tp in templates)
         finalHTML = this._templateSet[templates[tp]].replace("{knot}", finalHTML)
                                                     .replace("{case}", this._currentCaseName);
      
      // finalHTML = this._templateSet.player.replace("{knot}", finalHTML);
      return finalHTML;
   }
   
   /*
   async _generateHTML() {
      this._htmlKnot = this._translator.generateKnotHTML(this._compiledCase[this._knotSelected]);
      let templates = (this._compiledCase[this._knotSelected].categories) ?
                       this._compiledCase[this._knotSelected].categories : ["knot"];
      this._templateHTML = await this._server.loadTemplate(template);
   }
   */

   _renderKnot() {
      let knotPanel = document.querySelector("#knot-panel");
      
      if (this._renderSlide) {
         document.querySelector("#player-panel").innerHTML = "";
         /*
         let htmlFinal = this._templateHTML
                             .replace("{title}", this._compiledCase[this._knotSelected].title)
                             .replace("{knot}", this._htmlKnot);
         knotPanel.innerHTML = htmlFinal;
         */
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
         this._editor.insertText(0, this._compiledCase[this._knotSelected]._source);
      }
   }
   
   // <TODO> Temporary
   dispatchEvent(event) {
      this._resourceSelected(event);
   }
}