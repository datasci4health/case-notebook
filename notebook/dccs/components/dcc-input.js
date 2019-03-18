/**
 * Input DCC
 */


class DCCInput extends DCCBlock {
   constructor() {
      super();
      this.submitInput = this.submitInput.bind(this);
      this.inputTyped = this.inputTyped.bind(this);
      this.inputChanged = this.inputChanged.bind(this);
   }
   
   connectedCallback() {
      super.connectedCallback();
      
      window.messageBus.ext.publish("var/" + this.variable + "/input/ready", DCCInput.elementTag);

      window.messageBus.ext.subscribe("get-input/" + this.variable, this.submitInput);
      window.messageBus.ext.subscribe("checkout", this.submitInput);
   }
   
   /*
    * <TODO> Redesign
    */
   submitInput(topic, message) {
      /*
      const value = document.querySelector("#" + this.variable).value;
      window.messageBus.ext.publish("input/" + this.variable, value);
      */
   }
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return DCCBlock.observedAttributes.concat(["variable", "rows", "vocabulary"]);
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
   
   /* Event handling */
   
   inputTyped() {
      window.messageBus.ext.publish("var/" + this.variable + "/typed",
                                    {sourceType: DCCInput.elementTag,
                                     value: this._inputVariable.value});
   }

   inputChanged() {
      window.messageBus.ext.publish("var/" + this.variable + "/changed",
                                    {sourceType: DCCInput.elementTag,
                                     value: this._inputVariable.value});
   }
   
   /* Rendering */
   
   elementTag() {
      return DCCInput.elementTag;
   }
   
   _injectDCC(presentation, render) {
      presentation.innerHTML = this._generateTemplate(render);
      const selector = "#" + this.variable.replace(/\./g, "\\.");
      console.log("dcc-input variable: " + selector);
      this._inputVariable = presentation.querySelector(selector);
      this._inputVariable.addEventListener("input", this.inputTyped);
      this._inputVariable.addEventListener("change", this.inputChanged);
   }
   
   _generateTemplate(render) {
      let elements = null;
      if (this.hasAttribute("rows") && this.rows > 1)
         elements = DCCInput.templateElements.area.replace("[rows]", this.rows)
                                                  .replace("[variable]", this.variable)
                                                  .replace("[render]", render);
      else
         elements = DCCInput.templateElements.text.replace("[variable]", this.variable)
                                                  .replace("[render]", render);
     
      return elements;
   }
}

(function() {
   // <TODO> temporary (size = 50)
   DCCInput.templateElements = {
      text: "<input type='text' id='[variable]' class='[render]' size='28'></input>",
      area: "<textarea rows='[rows]' id='[variable]' class='[render]' size='28'></text-area>"
   };

   DCCInput.elementTag = "dcc-input";
   DCCInput.editableCode = false;
   customElements.define(DCCInput.elementTag, DCCInput);
})();
