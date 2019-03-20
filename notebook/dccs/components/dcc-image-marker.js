/* Image Marker DCC
 ******************/
class DCCImageMarker extends DCCBase {
   constructor() {
      super();
      
      this._pendingRequests = 0;
      
      this._currentState = 0;
      this._stateVisible = false;
      
      /*
      this._showState = this._showState.bind(this);
      this._hideState = this._hideState.bind(this);
      this._changeState = this._changeState.bind(this);
      this.defineStates = this.defineStates.bind(this);
      */
      
      this.markerSpot = this.markerSpot.bind(this);
    }
    
    async connectedCallback() {
       /*
       this._presentation.addEventListener("mouseover", this._showState);
       this._presentation.addEventListener("mouseout", this._hideState);
       this._presentation.addEventListener("click", this._changeState);
       */
       
       // <TODO> limited: considers only one group per page
       /*
       this.completeId = this.id;  
       if (!this.hasAttribute("states") && window.messageBus.page.hasSubscriber("dcc/marker-states/request")) {
          this.context = await window.messageBus.page.request("dcc/marker-context/request", this.id, "dcc/marker-context/" + this.id);
          this.completeId = this.context.message + "." + this.id;

          window.messageBus.page.subscribe("dcc/marker-states/" + this.id, this.defineStates);
          window.messageBus.page.publish("dcc/marker-states/request", this.id);
          this._pendingRequests++;
       }
       
       this._checkRender();

       window.messageBus.ext.publish("var/" + this.completeId + "/subinput/ready",
                                     {sourceType: DCCStateSelector.elementTag,
                                      content: this.innerHTML});
                                      */
       
       this._renderInterface();
    }
    
    /*
    disconnectedCallback() {
       this._presentation.removeEventListener('mouseover', this._showState);
       this._presentation.removeEventListener('mouseout', this._hideState);
       this._presentation.removeEventListener('click', this._changeState);
    }

    defineStates(topic, message) {
       window.messageBus.page.unsubscribe("dcc/marker-states/" + this.id, this.defineStates);
       this.states = message;
       this._pendingRequests--;
       this._checkRender();
    }
    
    _checkRender() {
       if (this._pendingRequests == 0)
          this._renderInterface();
    }
    */
    
    /*
     * Property handling
     */
    
    static get observedAttributes() {
       return ["id", "label", "states", "colors"];
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

    get coords() {
       return this.getAttribute("coords");
     }

    set coords(newValue) {
       this.setAttribute("coords", newValue);
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
       window.messageBus.page.publish("dcc/marker-spot/set",
             {label: this.label, 
              coords: this.coords,
              handler: this.markerSpot});
       /*
      if (this._presentation != null) {
        if (this._presentationState != null) {
           if (this._stateVisible && this.states != null) {
              const statesArr = this.states.split(",");
              this._presentationState.innerHTML = "[" + statesArr[this._currentState] + "]";
           } else
              this._presentationState.innerHTML = "";
        }
        this._presentation.className =
           DCCStateSelector.elementTag + "-template " +
           DCCStateSelector.elementTag + "-" + this._currentState + "-template";
      }
      */
    }
    
    /* Event handling */
       
    markerSpot() {
       console.log("***** Spot *****");
    }
    
    /*
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
        window.messageBus.ext.publish("var/" + this.completeId + "/state_changed",
              {sourceType: DCCInput.elementTag,
               state: statesArr[this._currentState]});
      }
      this._renderInterface();
    }
    */
}

/* Group Marker DCC
 ******************/
class DCCGroupMarker extends DCCBase {
   constructor() {
     super();
     this.requestContext = this.requestContext.bind(this); 
     this.requestStates = this.requestStates.bind(this);
     this.setMarkerSpot = this.setMarkerSpot.bind(this);
   }
   
   connectedCallback() {
      const templateHTML = DCCGroupMarker.templateElements.replace("[image]", this.image);

      // building the template
      let template = document.createElement("template");
      template.innerHTML = templateHTML;
      let shadow = this.attachShadow({mode: "open"});
      shadow.appendChild(template.content.cloneNode(true));
      this._imageMap = shadow.querySelector("#image-map");

      window.messageBus.page.subscribe("dcc/marker-context/request", this.requestContext);
      window.messageBus.page.subscribe("dcc/marker-states/request", this.requestStates);
      window.messageBus.page.subscribe("dcc/marker-spot/set", this.setMarkerSpot);
      
      window.messageBus.ext.publish("var/" + this.context + "/group_input/ready",
            DCCGroupSelector.elementTag);
   }

   disconnectedCallback() {
      window.messageBus.page.unsubscribe("dcc/marker-context/request", this.requestContext);
      window.messageBus.page.unsubscribe("dcc/marker-states/request", this.requestStates);
      window.messageBus.page.unsubscribe("dcc/marker-spot/set", this.setMarkerSpot);
   }
   
   
   requestStates(topic, message) {
      window.messageBus.page.publish("dcc/marker-states/" + message, this.states);
   }   
   
   requestContext(topic, message) {
      window.messageBus.page.publish("dcc/marker-context/" + message, this.context);
   }
   
   /*
    * Property handling
    */

   static get observedAttributes() {
    return ["image", "context", "states", "colors"];
   }

   get image() {
      return this.getAttribute("image");
    }

   set image(newValue) {
      this.setAttribute("image", newValue);
   }

   get context() {
      return this.getAttribute("context");
    }

   set context(newValue) {
      this.setAttribute("context", newValue);
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
   
   /* Event handling */
   setMarkerSpot(topic, message) {
      let area = document.createElement("area");
      area.alt = message.label;
      area.title = message.label;
      area.coords = message.coords;
      area.shape = "rect";
      area.addEventListener("mouseover", message.handler);
      this._imageMap.appendChild(area);
   }
}

(function() {

DCCImageMarker.elementTag = "dcc-image-marker";
customElements.define(DCCImageMarker.elementTag, DCCImageMarker);

DCCGroupMarker.templateElements =
  `<style>
      .image-spot {
         background-color: red;
      }
      .image-spot:hover {
         cursor: pointer;
      }
   </style>
   <img src="[image]" width="100%" height="100%" usemap="#imagemap">
   <map id="image-map" name="imagemap" class="image-spot"></map>`;

DCCGroupMarker.elementTag = "dcc-group-marker";
customElements.define(DCCGroupMarker.elementTag, DCCGroupMarker);

})();