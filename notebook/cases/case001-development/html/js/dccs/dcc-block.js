/* Block DCC
 * 
 * xstyle - controls the behavior of the style
 *   * "in" or not defined -> uses the internal trigger-button style
 *   * "none" ->  apply a minimal styling (just changes cursor to pointer)
 *   * "out"  -> apply an style externally defined with the name "trigger-button-template"
**************************************************************************/

class DCCBlock extends DCCBase {
   constructor() {
     super();
     
     this.elementTag = DCCTrigger.elementTag;
     this._pendingRequests = 0;
     
     this.defineXstyle = this.defineXstyle.bind(this);
     this.defineLocation = this.defineLocation.bind(this);
     this._renderInterface = this._renderInterface.bind(this);
   }
   
   /* Attribute Handling */

   static get observedAttributes() {
     return ["id", "label", "image", "location", "xstyle"];
   }

   connectedCallback() {
      if (!this.hasAttribute("xstyle") && window.messageBus.hasSubscriber("dcc/request-xstyle")) {
         window.messageBus.subscribe("dcc/xstyle/" + this.id, this.defineXstyle);
         window.messageBus.dispatch("dcc/request-xstyle", this.id);
         this._pendingRequests++;
      }
      if (((!this.hasAttribute("location") || this.location == "#out") &&
            window.messageBus.hasSubscriber("dcc/request-location"))) {
         window.messageBus.subscribe("dcc/location/" + this.id, this.defineLocation);
         window.messageBus.dispatch("dcc/request-location", this.id);
         this._pendingRequests++;
      }
      this._checkRender();
   }

   defineXstyle(topic, message) {
      window.messageBus.unsubscribe("dcc/xstyle/" + this.id, this.defineXstyle);
      this.xstyle = message;
      this._pendingRequests--;
      this._checkRender();
   }
   
   defineLocation(topic, message) {
      window.messageBus.unsubscribe("dcc/location/" + this.id, this.defineLocation);
      this.location = message;
      this._pendingRequests--;
      this._checkRender();
   }
   
   _checkRender() {
      if (this._pendingRequests == 0) {
         if (document.readyState === "complete")
            this._renderInterface();
         else
            window.addEventListener("load", this._renderInterface);
      }
   }
   
   get id() {
      return this.getAttribute("id");
   }
   
   set id(newValue) {
      this.setAttribute("id", newValue);
   }
   
   get label() {
      return this.getAttribute("label");
   }
   
   set label(newValue) {
      this.setAttribute("label", newValue);
   }
   
   get image() {
      return this.getAttribute("image");
   }
   
   set image(newValue) {
     this.setAttribute("image", newValue);
   }

   get location() {
      return this.getAttribute("location");
   }
    
   set location(newValue) {
     this.setAttribute("location", newValue);
   }
    
   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
  
   /* Rendering */
   
   _renderInterface() {
      let presentation = null;
      let xstyle = (this.hasAttribute("xstyle")) ? this.xstyle : "in";
      if (xstyle.startsWith("out") && this.hasAttribute("location")) {
         presentation = document.querySelector("#" + this.location);
         if (xstyle == "out")
            presentation.innerHTML = this.label;
         else
            presentation.title = this.label;
         // this._presentation.style.cursor = "pointer";
      } else {
         let render;
         switch (xstyle) {
            case "in"  : if (this.hasAttribute("image"))
                            render = "image-style"
                         else
                            render = "regular-style"
                         break;
            case "none": render = "";
                         break;
            case "out-image":
            case "out":  render = this.elemenTag + "-template";
                         break;
            default:     render = this.xstyle;
         }
         
         let template = document.createElement("template");
         template.innerHTML = this._generateTemplate(render);
         
         let host = this;
         if (xstyle == "in" || xstyle == "none")
            host = this.attachShadow({mode: "open"});
         host.appendChild(template.content.cloneNode(true));
         presentation = host.querySelector("#presentation-dcc");
         /*
         this._presentation = host.querySelector("#presentation-dcc");
         this._presentation.innerHTML = triggerWeb;
         */
      }
      return presentation;
   }
   
   _computeTrigger() {
      if (this.hasAttribute("label") || this.hasAttribute("action")) {
         let eventLabel = (this.hasAttribute("action")) ? this.action : "navigate/trigger";
         let message = (this.hasAttribute("link")) ? this.link : this.label;
         window.messageBus.dispatch(eventLabel, message);
      }
   }
}

(function() {
   DCCBlock.elementTag = "dcc-block";

   customElements.define(DCCBlock.elementTag, DCCBlock);

})();