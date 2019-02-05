/**
 * 
 */

class DCCPlayerServer {
   /*
    * Case services
    * *************
    */

   getCaseId() {
      return DCCPlayerServer.playerObj.id;
   }
   
   getStartKnot() {
      return DCCPlayerServer.playerObj.start;
   }
   
   /*
    * Running Case services
    * *********************
    */
   
   generateRunningCase() {
      const caseid = this.getCaseId();
      const profile = this.getCurrentProfile();

      const currentDateTime = new Date();
      const casekey = profile.id + "#" + caseid + "#" + this.generateUID();
      profile.cases.push(casekey);
      this.setProfile(profile);
      this.setRunningCasekey(casekey);

      const casetrack = {
        userid : profile.id,
        caseid : caseid,
        start  : currentDateTime.toJSON(),
        inputs : {},
        route : []
      };
      this.setCaseInstance(casekey, casetrack);
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
   
   getRunningCasekey() {
      return localStorage.getItem(DCCPlayerServer.storePrefix + "running-case");
   }
   
   resetRunningCase() {
      localStorage.removeItem(DCCPlayerServer.storePrefix + "running-case");
   }
   
   setRunningCasekey(casekey) {
      localStorage.setItem(DCCPlayerServer.storePrefix + "running-case", casekey);
   }
   
   getCaseInstance(casekey) {
      return JSON.parse(localStorage.getItem(DCCPlayerServer.storePrefix + casekey));
   }
   
   setCaseInstance(casekey, caseInstance) {
      localStorage.setItem(DCCPlayerServer.storePrefix + casekey, JSON.stringify(caseInstance));
   }

   trackRoute(item) {
      const casekey = this.getRunningCasekey();
      if (casekey != null) {
         const casetrack = this.getCaseInstance(casekey);
         const currentDateTime = new Date();
         casetrack.route.push(item + "," + currentDateTime.toJSON());
         this.setCaseInstance(casekey, casetrack);
      }
   }
   
   /*
    * User services
    * *************
    */
   
   getCurrentUser() {
      return localStorage.getItem(DCCPlayerServer.storePrefix + "current-user");
   }
   
   setCurrentUser(userId) {
      localStorage.setItem(DCCPlayerServer.storePrefix + "current-user", userId);
   }
   
   getUsers() {
      let usersStr = localStorage.getItem(DCCPlayerServer.storePrefix + "users");
      return (usersStr == null) ? {ids: []} : JSON.parse(usersStr);
   }
   
   getCurrentProfile() {
      return this.getProfile(this.getCurrentUser());
   }
   
   getProfile(userid) {
      return JSON.parse(localStorage.getItem(DCCPlayerServer.storePrefix + "profile-" + userid));
   }
   
   addProfile(profile) {
      this.setProfile(profile);
      let users = this.getUsers();
      users.ids.push(profile.id);
      localStorage.setItem(DCCPlayerServer.storePrefix + "users", JSON.stringify(users));
   }
   
   setProfile(profile) {
      localStorage.setItem(DCCPlayerServer.storePrefix + "profile-" + profile.id, JSON.stringify(profile));
   }
   
}

(function() {
   DCCPlayerServer.storePrefix = "casenote_";
})();