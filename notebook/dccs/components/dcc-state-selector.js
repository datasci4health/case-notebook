/* State Selector DCC
 ********************/
class DCCStateSelector extends HTMLElement {
   constructor() {
     super();
     
     this._pendingRequests = 0;
     
     this._currentState = 0;
     this._stateVisible = false;
     
     const text = this.innerHTML;
     this.innerHTML = DCCStateSelector.templateElements;
     this.querySelector("#presentation-text").innerHTML = text;
     this._presentation = this.querySelector("#presentation-dcc");
     this._presentationState = this.querySelector("#presentation-state");
     
     // <TODO> Shadow version - future
     /*
     let template = document.createElement("template");
     template.innerHTML = DCCStateSelector.templateElements;
     
     this._shadow = this.attachShadow({mode: "open"});
     this._shadow.appendChild(template.content.cloneNode(true));
     
     this._presentation = this._shadow.querySelector("#presentation-dcc");
     this._presentationState = this._shadow.querySelector("#presentation-state");
     */
     
     /* this._group = document.querySelector("dcc-group-selector"); */

     this._showState = this._showState.bind(this);
     this._hideState = this._hideState.bind(this);
     this._changeState = this._changeState.bind(this);
     this.defineStates = this.defineStates.bind(this);
     
     /*
     this._updateStates = this._updateStates.bind(this);
     this._updateColors = this._updateColors.bind(this);
     */
   }
   
   createdCallback() {
     this._renderInterface();
   }

   attributeChangedCallback(name, oldValue, newValue) {
     this._renderInterface();
   }
   
   connectedCallback() {
      this._presentation.addEventListener("mouseover", this._showState);
      this._presentation.addEventListener("mouseout", this._hideState);
      this._presentation.addEventListener("click", this._changeState);
      
      // <TODO> limited: considers only one group per page
      if (!this.hasAttribute("states") && window.messageBus.hasSubscriber("dcc/request/selector-states")) {
         window.messageBus.subscribe("dcc/selector-states/" + this.id, this.defineStates);
         window.messageBus.dispatch("dcc/request/selector-states", this.id);
         this._pendingRequests++;
      }
      
      /*
      this.addEventListener("update-states-event", this._updateStates);
      this.addEventListener("update-colors-event", this._updateColors);
      
      if (this._group != null) {
         if (!this.hasAttribute("states")) {
            let eventStates = new CustomEvent("request-states-event", {detail: this});
            this._group.dispatchEvent(eventStates);
         }
         if (!this.hasAttribute("colors")) {
            let eventColors = new CustomEvent("request-colors-event", {detail: this});
            this._group.dispatchEvent(eventColors);
         }
      }
      */

      this._checkRender();
   }
   
   disconnectedCallback() {
      this._presentation.removeEventListener('mouseover', this._showState);
      this._presentation.removeEventListener('mouseout', this._hideState);
      this._presentation.removeEventListener('click', this._changeState);
      
      /*
      this.removeEventListener('update-states-event', this._updateStates);
      this.removeEventListener('update-colors-event', this._updateColors);
      */
   }

   defineStates(topic, message) {
      window.messageBus.unsubscribe("dcc/selector-states/" + this.id, this.defineStates);
      this.states = message;
      this._pendingRequests--;
      this._checkRender();
   }
   
   _checkRender() {
      if (this._pendingRequests == 0)
         this._renderInterface();
   }
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return ["states", "colors"];
    }

   get states() {
     return this.getAttribute("states");
   }

    set states(newStates) {
     this.setAttribute("states", newStates);
   }

   get colors() {
     return this.getAttribute("colors");
   }

   set colors(newColors) {
     this.setAttribute("colors", newColors);
   }
   
   /* Rendering */

   _renderInterface() {
     if (this._presentation != null) {
       if (this._presentationState != null) {
          if (this._stateVisible && this.states != null) {
             const statesArr = this.states.split(",");
             this._presentationState.innerHTML = "[" + statesArr[this._currentState] + "]";
          } else
             this._presentationState.innerHTML = "";
       }
       /*
       if (this.colors != null) {
         const colorsArr = this.colors.split(",");
         this._presentation.style.backgroundColor = colorsArr[this._currentState];
       }
       */
       this._presentation.className =
          DCCStateSelector.elementTag + "-template " +
          DCCStateSelector.elementTag + "-" + this._currentState + "-template";
     }
   }
   
   /* Event handling */
   
   _showState() {
     this._stateVisible = true;
     this._renderInterface();
   }
   
   _hideState() {
     this._stateVisible = false;
     this._renderInterface();
   }
   
   _changeState() {
     if (this.states != null) {
       const statesArr = this.states.split(",");
       this._currentState = (this._currentState + 1) % statesArr.length;
     }
     this._renderInterface();
   }
   
   /* Container DCC events */

   /*
   _updateStates(event) {
     this.states = event.detail;
   }

   _updateColors(event) {
     this.colors = event.detail;
   }
   */
}

/* Group Selector DCC
 ********************/
class DCCGroupSelector extends HTMLElement {
   constructor() {
     super();
     this.requestStates = this.requestStates.bind(this);
     /*
     this._sendStates = this._sendStates.bind(this);
     this._sendColors = this._sendColors.bind(this);
     */
   }
   
   connectedCallback() {
      window.messageBus.subscribe("dcc/request/selector-states", this.requestStates);
      /*
      this.addEventListener("request-states-event", this._sendStates);
      this.addEventListener("request-colors-event", this._sendColors);
      */
   }

   disconnectedCallback() {
      window.messageBus.unsubscribe("dcc/request/selector-states", this.requestStates);
      /*
      this.removeEventListener("request-states-event", this._sendStates);
      this.removeEventListener("request-colors-event", this._sendColors);
      */
   }
   
   requestStates(topic, message) {
      window.messageBus.dispatch("dcc/selector-states/" + message, this.states);
   }   
   
   /*
   _sendStates(event) {
       let eventStates = new CustomEvent("update-states-event", {detail: this.states});
       event.detail.dispatchEvent(eventStates);
   }
       
   _sendColors(event) {
      let eventColors = new CustomEvent("update-colors-event", {detail: this.colors});
      event.detail.dispatchEvent(eventColors);
   }
   */

   /*
    * Property handling
    */

   static get observedAttributes() {
    return ["states", "colors"];
   }

   get states() {
     return this.getAttribute("states");
   }

    set states(newStates) {
     this.setAttribute("states", newStates);
   }

   get colors() {
     return this.getAttribute("colors");
   }

    set colors(newColors) {
     this.setAttribute("colors", newColors);
   }
}

(function() {

DCCStateSelector.templateElements = 
`<span id="presentation-dcc">
   <span id="presentation-text"><slot></slot></span>
   <span id="presentation-state"></span>
</span>`;
  
DCCStateSelector.elementTag = "dcc-state-selector";
customElements.define(DCCStateSelector.elementTag, DCCStateSelector);

DCCGroupSelector.elementTag = "dcc-group-selector";
customElements.define(DCCGroupSelector.elementTag, DCCGroupSelector);

})();