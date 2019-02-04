/**
 * 
 */


(function() {
   
DCCInput.templates = {
outtemplate:
`
`
};

DCCInput.editableCode = false;
customElements.define("dcc-input", DCCInput);

})();

class DCCInput extends DCCBase {
   

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
      let inputElem = document.createElement((this.rows <= 1) ? "input" : "textarea");
      if (this.outstyle) {
         
      }
         
   }
}
