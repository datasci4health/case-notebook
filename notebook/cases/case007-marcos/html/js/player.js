const storePrefix = "casenote_";

class PlayerManager {
   static instance() {
      if (!PlayerManager._instance)
         PlayerManager._instance = new PlayerManager();
      return PlayerManager._instance;
   }
   
   constructor() {
      this._server = new DCCPlayerServer();
      this.controlEvent = this.controlEvent.bind(this);
      window.messageBus.subscribe("control", this.controlEvent);
      this.navigateEvent = this.navigateEvent.bind(this);
      window.messageBus.subscribe("navigate", this.navigateEvent);
      this.inputEvent = this.inputEvent.bind(this);
      window.messageBus.subscribe("input", this.inputEvent);
   }
   
   /*
    * Event handlers
    * **************
    */
   
   controlEvent(topic, message) {
      switch (topic) {
         case "control/register": this.register(); break;
         case "control/signin":   this.signIn(); break;
      }
   }
   
   navigateEvent(topic, message) {
      this.trackTrigger(message);
      window.messageBus.dispatch("checkout", message);
      switch (topic) {
         case "navigate/previous-knot": window.history.back();
                                        break;
         case "navigate/start-knot": window.open(this._server.getStartKnot().
                                       replace(/ /igm, "_") + ".html", "_self");
                                     break;
         case "navigate/trigger": window.open(message, "_self");
                                  break;
      }
   }

   inputEvent(topic, message) {
      this._server.recordInput(topic.substring(6), message);
   }   
   
   startKnot() {
      
   }
   
   /*
    * Registry related operations
    * ***************************
    */
   
   startGame() {
      this._server.resetRunningCase();
      let currentUser = this._server.getCurrentUser();
      if (currentUser == null)
         document.querySelector("#signin-register").style.display = "flex";
      else {
         let userId = document.querySelector("#user-id");
         userId.innerHTML = userId.innerHTML + currentUser;
         let profile = this._server.getProfile(currentUser);
         let userName = document.querySelector("#user-name");
         userName.innerHTML = userName.innerHTML + profile.name;
         document.querySelector("#signed-user").style.display = "initial";
      }
    }
   
   register() {
      let userId = document.querySelector("#idInput").value;
      let userName = document.querySelector("#nameInput").value;
      let userAge = document.querySelector("#ageInput").value;
      let invalidId = document.querySelector("#invalid-id");
      let answerAll = document.querySelector("#answer-all");

      if (userId.trim().length >0 && userName.trim().length > 0 && parseInt(userAge) > 0) {
         let users = this._server.getUsers();
         if (users.ids.indexOf(userId) > -1) {
             invalidId.style.display = "initial";
             answerAll.style.display = "none";
         } else {
             let profile = {id: userId,
                            name: userName,
                            age: userAge,
                            cases: []};
             this._server.setProfile(profile);
             invalidId.style.display = "none";
             answerAll.style.display = "none";
             document.querySelector("#signed-user").style.display = "initial";
             document.querySelector("#registration-form").style.display = "none";
             this._server.setCurrentUser(userId);
         }
      } else {
          invalidId.style.display = "none";
          answerAll.style.display = "initial";
      }
   }
   
   signIn() {
      var userId = document.querySelector("#idInput").value;

      if (this._server.getUsers().ids.indexOf(userId) > -1) {
          var profile = this._server.getProfile(userId);
          var userName = document.querySelector("#user-name");
          userName.innerHTML = userName.innerHTML + profile.name;
          document.querySelector("#request-id").style.display = "none";
          document.querySelector("#invalid-id").style.display = "none";
          document.querySelector("#signed-user").style.display = "initial";
          this._server.setCurrentUser(userId);
      } else
          document.querySelector("#invalid-id").style.display = "initial";
   }
   
   /*
    * Start the tracking record of a case
    */
   startCase() {
      this._server.generateRunningCase();
   }
   
   /*
    * Tracking player
    * ***************
    */
   
   trackTrigger(trigger) {
      this._server.trackRoute("#nav:" + trigger);
   }
}