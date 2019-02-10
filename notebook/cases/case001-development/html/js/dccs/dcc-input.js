/**
 * Input DCC
 */


class DCCInput extends DCCBase {
   constructor() {
      super();
      this.defineXstyle = this.defineXstyle.bind(this);
      this._renderInterface = this._renderInterface.bind(this);
      this.submitInput = this.submitInput.bind(this);
   }
   
   connectedCallback() {
      if (!this.hasAttribute("xstyle")) {
         window.messageBus.subscribe("dcc/xstyle", this.defineXstyle);
         window.messageBus.dispatch("dcc/request-xstyle", "");
      }
      this._checkRender();
      window.messageBus.subscribe("get-input/" + this.variable, this.submitInput);
   }
   
   defineXstyle(topic, message) {
      window.messageBus.unsubscribe("dcc/xstyle", this.defineXstyle);
      this.xstyle = message;
      this._checkRender();
   }
   
   _checkRender() {
      if (document.readyState === "complete")
         this._renderInterface();
      else
         window.addEventListener("load", this._renderInterface);
   }

   submitInput(topic, message) {
      const value = document.querySelector("#" + this.variable).value;
      window.messageBus.dispatch("input/" + this.variable, value);
   }
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["variable", "rows", "vocabulary", "xstyle"];
   }

   get variable() {
      return this.getAttribute("variable");
   }
   
   set variable(newValue) {
      this.setAttribute("variable", newValue);
   }
   
   get rows() {
      return this.getAttribute("rows");
   }
   
   set rows(newValue) {
      this.setAttribute("rows", newValue);
   }
   
   get vocabulary() {
      return this.getAttribute("vocabulary");
   }
   
   set vocabulary(newValue) {
      this.setAttribute("vocabulary", newValue);
   }
   
   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
  
   /* Rendering */
   
   _renderInterface() {
      let inputType = "input";
      let inputParam = "type='text'";
      if (this.hasAttribute("rows") && this.rows > 1) {
         inputType = "textarea";
         inputParam = "rows=" + rows;
      }
      const finalHTML = DCCInput.templates.out.replace(/\[input-type\]/igm, inputType)
                                              .replace("[input-parameters]", inputParam)
                                              .replace(/\[variable\]/igm, this.variable);
     
      if (this.hasAttribute("xstyle") && this.xstyle == "out") {
         const elem = document.querySelector("#input-" + this.variable);
         elem.innerHTML = finalHTML;
      }
   }
}

(function() {
   // <TODO> temporary (size = 50)
   DCCInput.templates = {
   out: "<[input-type] [input-parameters] id='[variable]' size='50'></[input-type]>"
   };

   DCCInput.editableCode = false;
   customElements.define("dcc-input", DCCInput);
})();


