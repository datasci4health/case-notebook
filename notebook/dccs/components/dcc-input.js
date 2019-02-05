/**
 * Input DCC
 */


class DCCInput extends DCCBase {
   constructor() {
      super();
      this._renderInterface = this._renderInterface.bind(this);
      this.submitInput = this.submitInput.bind(this);
   }
   
   connectedCallback() {
      if (document.readyState === "complete")
         this._renderInterface();
      else
         window.addEventListener("load", this._renderInterface);
      window.messageBus.subscribe("get-input/" + this.variable, this.submitInput);
   }
   
   submitInput(topic, message) {
      const value = document.querySelector("#" + this.variable).value;
      window.messageBus.dispatchMessage("input/" + this.variable, value);
   }
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["variable", "rows", "vocabulary", "outstyle"];
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
   
   get outstyle() {
      return this.hasAttribute("outstyle");
   }
   
   set outstyle(isOutstyle) {
      if (outstyle)
         this.setAttribute("outstyle", "");
      else
         this.removeAttribute("outstyle");
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
     
      if (this.outstyle) {
         const elem = document.querySelector("#input-" + this.variable);
         elem.innerHTML = finalHTML;
      }
   }
}

(function() {
   DCCInput.templates = {
   out: "<[input-type] [input-parameters] id='[variable]'></[input-type]>"
   };

   DCCInput.editableCode = false;
   customElements.define("dcc-input", DCCInput);
})();


