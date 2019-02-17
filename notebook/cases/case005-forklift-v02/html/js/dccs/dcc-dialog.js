/**
 * 
 */
class DCCTalk extends DCCBase {
   static get observedAttributes() {
      return ["character", "speech"];
   }

   
}

(function() {
   DCCTalk.editableCode = false;
   customElements.define("dcc-talk", DCCTalk);
})();