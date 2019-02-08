/* Trigger DCC
 * 
 * xstyle - controls the behavior of the style
 *   * "in" or not defined -> uses the internal trigger-button style
 *   * "none" ->  apply a minimal styling (just changes cursor to pointer)
 *   * 
**************/

class DCCTrigger extends DCCBase {
   constructor() {
     super();
     
     this._computeTrigger = this._computeTrigger.bind(this);
     this.defineXstyle = this.defineXstyle.bind(this);
     this._renderInterface = this._renderInterface.bind(this);
   }
   
   /* Attribute Handling */

   static get observedAttributes() {
     return ["link", "action", "label", "image", "location", "xstyle"];
   }

   connectedCallback() {
      if (!this.hasAttribute("xstyle")) {
         window.messageBus.subscribe("dcc/xstyle", this.defineXstyle);
         window.messageBus.dispatchMessage("dcc/request-xstyle", "");
      }
      this._checkRender();
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
   
   disconnectedCallback() {
      this._presentation.removeEventListener("click", this._computeTrigger);
   }

   get link() {
      return this.getAttribute("link");
   }
   
   set link(newLink) {
      this.setAttribute("link", newLink);
   }
   
   get action() {
      return this.getAttribute("action");
   }
   
   set action(newAction) {
      this.setAttribute("action", newAction);
   }
   
   get label() {
      return this.getAttribute("label");
   }
   
   set label(newLabel) {
      this.setAttribute("label", newLabel);
   }
   
   get image() {
      return this.getAttribute("image");
   }
   
   set image(newImage) {
     this.setAttribute("image", newImage);
   }

   get location() {
      return this.getAttribute("location");
   }
    
   set location(newLocation) {
     this.setAttribute("location", newLocation);
   }
    
   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
  
   /* Rendering */
   
   _renderInterface() {
      let xstyle = (this.hasAttribute("xstyle")) ? this.xstyle : "in";
      if (xstyle == "out" && this.hasAttribute("location")) {
         this._presentation = document.querySelector("#" + this.location);
         this._presentation.innerHTML = this.label;
         this._presentation.style.cursor = "pointer";
      } else {
         let linkWeb = (this.hasAttribute("link")) ? "href='" + this.link + "' " : "";
         
         let renderWeb;
         switch (xstyle) {
            case "in"  : renderWeb = "trigger-button"
                         break;
            case "none": renderWeb = "trigger-button-minimal";
                         break;
            case "out":  renderWeb = "trigger-button-template";
                         break;
            default:     renderWeb = this.xstyle;
         }
         
         let triggerWeb = null;
         if (this.hasAttribute("image"))
            triggerWeb = DCCTrigger.templates.image.replace("[link]", linkWeb)
                                                   .replace("[label]", this.label)
                                                   .replace("[image]", this.image);
         else
            triggerWeb = DCCTrigger.templates.regular.replace("[render]", renderWeb)
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
      
      this._presentation.addEventListener("click", this._computeTrigger);
   }
   
   _computeTrigger() {
      if (this.hasAttribute("label") || this.hasAttribute("action")) {
         let eventLabel = (this.hasAttribute("action")) ? this.action : "navigate/trigger";
         let message = (this.hasAttribute("link")) ? this.link : this.label;
         window.messageBus.dispatchMessage(eventLabel, message);
      }
   }
}

(function() {

DCCTrigger.templateHTML = 
`<style>
   .trigger-button-minimal:hover {
      cursor: pointer;
   }

   .trigger-button {
      border: 1px solid lightgray;
      border-radius: 5px;
      margin: 5px;
      color: #1d1d1b;   
      padding: 14px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
   }
   
   .trigger-button:hover {
      color: black;
      font-weight: bold;
      cursor: pointer;
   }
   
   .trigger-image {
      max-width: 100%;
      max-height: 100%;
      cursor: pointer;
   }
</style>
<span id="presentation-dcc"></span>`;
   
DCCTrigger.templates = {
regular:
`<a class='[render]' [link]>[label]</a>`,
image:
`<a [link] style='cursor:pointer'>
   <img width='100%' height='100%' class='trigger-image' src='[image]' title='[label]'>
</a>`
};

customElements.define("dcc-trigger", DCCTrigger);

})();