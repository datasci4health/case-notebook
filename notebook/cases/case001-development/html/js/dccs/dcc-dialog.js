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
         window.messageBus.dispatch("dcc/request-xstyle", "");
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
         let character = document.querySelector("#talk-character");
         if (character != null)
            character.innerHTML = this.character;
         let image = document.querySelector("#talk-character-image");
         if (image != null)
            image.setAttributeNS("http://www.w3.org/1999/xlink", "href",
                  "images/" + this.character.replace(/ /igm, "_").toLowerCase() + ".png");
         let speech = document.querySelector("#talk-speech");
         if (speech != null)
           speech.innerHTML = this.speech;
      }
   }
}


(function() {
   DCCTalk.editableCode = false;
   customElements.define("dcc-talk", DCCTalk);
})();