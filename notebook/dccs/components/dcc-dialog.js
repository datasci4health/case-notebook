/**
 * Talk DCC
 */
class DCCTalk extends DCCBase {
   constructor() {
      super();
      this.defineXstyle = this.defineXstyle.bind(this);
      this._renderInterface = this._renderInterface.bind(this);
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
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["character", "speech", "xstyle"];
   }

   get character() {
      return this.getAttribute("character");
   }
   
   set character(newValue) {
      this.setAttribute("character", newValue);
   }
   
   get speech() {
      return this.getAttribute("speech");
   }
   
   set speech(newValue) {
      this.setAttribute("speech", newValue);
   }
   
   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
  
   /* Rendering */
   
   _renderInterface() {
      if (this.hasAttribute("xstyle") && this.xstyle == "out") {
         document.querySelector("#talk-character").innerHTML = this.character;
         document.querySelector("#talk-character-image").
            setAttributeNS("http://www.w3.org/1999/xlink", "href",
                  "images/" + this.character.replace(/ /igm, "_").toLowerCase() + ".png");
         document.querySelector("#talk-speech").innerHTML = this.speech;
      }
   }
}


(function() {
   DCCTalk.editableCode = false;
   customElements.define("dcc-talk", DCCTalk);
})();