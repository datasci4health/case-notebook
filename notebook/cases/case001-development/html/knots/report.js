(function() { PlayerManager.instance().presentKnot(` <div id="report-panel"></div>
<script>
function produceReport() {
   const server = new DCCPlayerServer();
   let output = "";
   output += "##current-user: " + server.getCurrentUser() + "\n";
   output += "##running-case: " + server.getRunningCasekey() + "\n";
   const users = server.getUsers();
   for (let u in users.ids) {
       output += "##userid: " + users.ids[u] + "\n";
       let profile = server.getProfile(users.ids[u]);
       output += "##profile: " + JSON.stringify(profile) + "\n";
       if (profile != null) {
           for (c in profile.cases) {
               var casetrack = server.getCaseInstance(profile.cases[c]);
               output += "##case: " + JSON.stringify(casetrack);
           }
       }
   }   
   document.querySelector("#report-panel").innerHTML = "<pre>" + output + "</pre>";
}
produceReport();
 </script>
`) })();