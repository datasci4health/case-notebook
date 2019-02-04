const storePrefix = "casenote_";

class PlayerManager {
   static instance() {
      if (!PlayerManager._instance)
         PlayerManager._instance = new PlayerManager();
      return PlayerManager._instance;
   }
   
   constructor() {
      this.controlEvent = this.controlEvent.bind(this);
      window.messageBus.subscribe("control", this.controlEvent);
      this.navigateEvent = this.navigateEvent.bind(this);
      window.messageBus.subscribe("navigate", this.navigateEvent);
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
      switch (topic) {
         case "navigate/previous-knot": window.history.back(); break;
      }
   }

   startKnot() {
      
   }
   
   /*
    * Start the tracking record of a case
    */
   startCase(caseid) {
      const profile = this.retrieveCurrentProfile();

      const currentDateTime = new Date();
      const casekey = profile.id + "#" + caseid + "#" + this.generateUID();
      profile.cases.push(casekey);
      localStorage.setItem(storePrefix + "current-case", casekey);

      const casetrack = {
        userid : profile.id,
        caseid : caseid,
        start  : currentDateTime.toJSON(),
        startTime : currentDateTime.getTime(),
        inputs : {},
        route : []
      };
      localStorage.setItem(storePrefix + casekey, JSON.stringify(casetrack));
   }

   generateUID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      const currentDateTime = new Date();
      return currentDateTime.toJSON() + "-" +
             s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
   
   /*
    * Registry related operations
    * ***************************
    */
   
   startGame() {
      let currentUser = this.retrieveCurrentUser();
      if (currentUser == null)
         document.querySelector("#signin-register").style.display = "flex";
      else {
         let userId = document.querySelector("#user-id");
         userId.innerHTML = userId.innerHTML + currentUser;
         let profile = this.retrieveProfile(currentUser);
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
         let users = this.retrieveUsers();
         if (users.ids.indexOf(userId) > -1) {
             invalidId.style.display = "initial";
             answerAll.style.display = "none";
         } else {
             let profile = {id: userId,
                            name: userName,
                            age: userAge,
                            cases: []};
             localStorage.setItem(storePrefix + "profile-" + userId, JSON.stringify(profile));
             users.ids.push(userId);
             localStorage.setItem(storePrefix + "users", JSON.stringify(users));
             invalidId.style.display = "none";
             answerAll.style.display = "none";
             document.querySelector("#signed-user").style.display = "initial";
             document.querySelector("#registration-form").style.display = "none";
             localStorage.setItem(storePrefix + "current-user", userId);
         }
      } else {
          invalidId.style.display = "none";
          answerAll.style.display = "initial";
      }
   }
   
   signIn() {
      var userId = document.querySelector("#idInput").value;

      if (this.retrieveUsers().ids.indexOf(userId) > -1) {
          var profile = this.retrieveProfile(userId);
          var userName = document.querySelector("#user-name");
          userName.innerHTML = userName.innerHTML + profile.name;
          document.querySelector("#request-id").style.display = "none";
          document.querySelector("#invalid-id").style.display = "none";
          document.querySelector("#signed-user").style.display = "initial";
          localStorage.setItem(storePrefix + "current-user", userId);
      } else
          document.querySelector("#invalid-id").style.display = "initial";
   }
   
   /*
    * Tracking player
    * ***************
    */
   
   trackTrigger(trigger) {
      const casekey = localStorage.getItem(storePrefix + "current-case");
      const casetrack = this.retrieveCurrentCase();

      const currentDateTime = new Date();
      casetrack.route.push("#navigate:" + trigger + "," + currentDateTime.toJSON());

      localStorage.setItem(storePrefix + casekey, JSON.stringify(casetrack));
   }

   /*
    * Generic services
    * ****************
    */
   
   retrieveCurrentUser() {
      return localStorage.getItem(storePrefix + "current-user");
   }
   
   retrieveUsers() {
      let usersStr = localStorage.getItem(storePrefix + "users");
      return (usersStr == null) ? {ids: []} : JSON.parse(usersStr);
   }
   
   retrieveCurrentProfile() {
      return this.retrieveProfile(this.retrieveCurrentUser());
   }
   
   retrieveProfile(userid) {
      return JSON.parse(localStorage.getItem(storePrefix + "profile-" + userid));
   }
   
   retrieveCurrentCase() {
      const casekey = localStorage.getItem(storePrefix + "current-case");
      return JSON.parse(localStorage.getItem(storePrefix + casekey));
   }
}