/**
 * Styler DCC
 */
class DCCStyler extends DCCBase {
   constructor() {
      super();
      this._locationSet = [];
      this.requestXstyle = this.requestXstyle.bind(this);
      this.requestLocation = this.requestLocation.bind(this);
   }

   connectedCallback() {
      if (this.hasAttribute("xstyle")) {
         window.messageBus.ext.subscribe("dcc/request/xstyle", this.requestXstyle);
      }
      
      if (this.hasAttribute("locations")) {
         this._locationSet = this.locations.split(";");
         window.messageBus.ext.subscribe("dcc/request/location", this.requestLocation);
      }
   }

   disconnectedCallback() {
      window.messageBus.ext.unsubscribe("dcc/request/xstyle", this.requestXstyle);
      window.messageBus.ext.unsubscribe("dcc/request/location", this.requestLocation);
   }

   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["xstyle", "locations"];
   }

   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
   
   get locations() {
      return this.getAttribute("locations");
   }
   
   set locations(newValue) {
      this.setAttribute("locations", newValue);
   }
   
   requestXstyle(topic, message) {
      window.messageBus.ext.publish("dcc/xstyle/" + message, this.xstyle);
   }
   
   requestLocation(topic, message) {
      window.messageBus.ext.publish("dcc/location/" + message,
            (this._locationSet.length > 0) ? this._locationSet.shift() : "");
   }
}
      
(function() {
   DCCStyler.editableCode = false;
   customElements.define("dcc-styler", DCCStyler);
})();