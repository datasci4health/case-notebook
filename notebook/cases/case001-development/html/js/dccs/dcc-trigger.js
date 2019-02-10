/* Trigger DCC
 * 
 * xstyle - controls the behavior of the style
 *   * "in" or not defined -> uses the internal trigger-button style
 *   * "none" ->  apply a minimal styling (just changes cursor to pointer)
 *   * "out"  -> apply an style externally defined with the name "trigger-button-template"
**************************************************************************/

class DCCTrigger extends DCCBlock {
   constructor() {
     super();
     
     this.elementTag = DCCTrigger.elementTag;
     // this._pendingRequests = 0;
     
     this._computeTrigger = this._computeTrigger.bind(this);
     /*
     this.defineXstyle = this.defineXstyle.bind(this);
     this.defineLocation = this.defineLocation.bind(this);
     this._renderInterface = this._renderInterface.bind(this);
     */
   }
   
   /* Attribute Handling */

   static get observedAttributes() {
     return DCCBlock.observedAttributes.concat(["type", "link", "action"]);
   }

   connectedCallback() {
      if (this.type == "**" && !this.hasAttribute("location"))
         this.location = "#out";
      super.connectedCallback();
      /*
      if (!this.hasAttribute("xstyle") && window.messageBus.hasSubscriber("dcc/request-xstyle")) {
         window.messageBus.subscribe("dcc/xstyle/" + this.id, this.defineXstyle);
         window.messageBus.dispatch("dcc/request-xstyle", this.id);
         this._pendingRequests++;
      }
      if (this.type == "**" &&
          (!this.hasAttribute("location") && window.messageBus.hasSubscriber("dcc/request-location"))) {
         window.messageBus.subscribe("dcc/location/" + this.id, this.defineLocation);
         window.messageBus.dispatch("dcc/request-location", this.id);
         this._pendingRequests++;
      }
      this._checkRender();
      */
   }
   
   /*
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
   */
   
   get type() {
      return this.getAttribute("type");
   }
   
   set type(newValue) {
      this.setAttribute("type", newValue);
   }
   
   get link() {
      return this.getAttribute("link");
   }
   
   set link(newValue) {
      this.setAttribute("link", newValue);
   }
   
   get action() {
      return this.getAttribute("action");
   }
   
   set action(newValue) {
      this.setAttribute("action", newValue);
   }
  
   /* Rendering */
   
   _renderInterface() {
      /*
      let xstyle = (this.hasAttribute("xstyle")) ? this.xstyle : "in";
      if (xstyle.startsWith("out") && this.hasAttribute("location")) {
         this._presentation = document.querySelector("#" + this.location);
         if (xstyle == "out")
            this._presentation.innerHTML = this.label;
         else
            this._presentation.title = this.label;
         this._presentation.style.cursor = "pointer";
      } else {
         let linkWeb = (this.hasAttribute("link")) ? "href='" + this.link + "' " : "";
         
         let renderWeb;
         switch (xstyle) {
            case "in"  : renderWeb = "trigger-button"
                         break;
            case "none": renderWeb = "trigger-button-minimal";
                         break;
            case "out-image":
            case "out":  renderWeb = "trigger-button-template";
                         break;
            default:     renderWeb = this.xstyle;
         }
         
         let triggerWeb = null;
         if (this.hasAttribute("image"))
            triggerWeb = DCCTrigger.templateElements.image.replace("[link]", linkWeb)
                                                   .replace("[label]", this.label)
                                                   .replace("[image]", this.image);
         else
            triggerWeb = DCCTrigger.templateElements.regular.replace("[render]", renderWeb)
                                                     .replace("[link]", linkWeb)
                                                     .replace("[label]", this.label);

         const template = document.createElement("template");
         template.innerHTML = DCCTrigger.templateHTML;
         
         let host = this;
         if (xstyle == "in" || xstyle == "none")
            host = this.attachShadow({mode: "open"});

         host.appendChild(template.content.cloneNode(true));
         this._presentation = host.querySelector("#presentation-dcc");
         this._presentation.innerHTML = triggerWeb;
      }
      */
      let presentation = super._renderInterface();
      
      presentation.style.cursor = "pointer";
      presentation.addEventListener("click", this._computeTrigger);
   }
   
   _generateTemplate(render) {
      let linkWeb = (this.hasAttribute("link")) ? "href='" + this.link + "' " : "";
      let elements = null;
      if (this.hasAttribute("image"))
         elements = DCCTrigger.templateElements.image.replace("[render]", render)
                                                     .replace("[link]", linkWeb)
                                                     .replace("[label]", this.label)
                                                     .replace("[image]", this.image);
      else
         elements = DCCTrigger.templateElements.regular.replace("[render]", render)
                                               .replace("[link]", linkWeb)
                                               .replace("[label]", this.label);
      
      
      return DCCTrigger.templateStyle + elements;
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

   DCCTrigger.templateStyle = 
   `<style>
      .regular-style {
         border: 1px solid lightgray;
         border-radius: 5px;
         margin: 5px;
         color: #1d1d1b;   
         padding: 14px 25px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
      }
      .regular-style:hover {
         color: black;
         font-weight: bold;
         cursor: pointer;
      }
      .image-style {
         max-width: 100%;
         max-height: 100%;
         cursor: pointer;
      }
   </style>`;
      
   DCCTrigger.templateElements = {
   regular:
   `<a id='presentation-dcc' class='[render]' [link]>[label]</a>`,
   image:
   `<a id='presentation-dcc' [link] style='cursor:pointer'>
      <img width='100%' height='100%' class='[render]' src='[image]' title='[label]'>
   </a>`
   };

   DCCTrigger.elementTag = "dcc-trigger";

   customElements.define(DCCTrigger.elementTag, DCCTrigger);

})();