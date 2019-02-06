/**
 * Styler DCC
 */
class DCCStyler extends DCCBase {
   constructor() {
      super();
      this.requestXstyle = this.requestXstyle.bind(this);
   }

   connectedCallback() {
      window.messageBus.subscribe("dcc/request-xstyle", this.requestXstyle);
   }

   disconnectedCallback() {
      window.messageBus.unsubscribe("dcc/request-xstyle", this.requestXstyle);
   }

   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["xstyle"];
   }

   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
   
   requestXstyle(topic, message) {
      // <TODO> improve: sending a message again to everybody
      window.messageBus.dispatchMessage("dcc/xstyle", this.xstyle);
   }
}
      
(function() {
   DCCStyler.editableCode = false;
   customElements.define("dcc-styler", DCCStyler);
})();