/**
 * Local component that worls as a proxy to the server functionalities
 */

class DCCAuthorServer {
   async templateFamiliesList() {
      const response = await fetch(DCCAuthorServer.serverAddress + "template-families-list", {
         method: "POST",
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      const families = jsonResponse.templateFamiliesList;
      let finalFamiliesList = {};
      for (var f in families)
         finalFamiliesList[families[f]] = "icons/mono-slide.svg";
      return finalFamiliesList;
   }
   
   async casesList() {
      const response = await fetch(DCCAuthorServer.serverAddress + "cases-list", {
         method: "POST",
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      const cases = jsonResponse.casesList;
      let finalCasesList = {};
      for (var c in cases)
         finalCasesList[cases[c]] = "icons/mono-slide.svg";
      return finalCasesList;
   }
   
   async loadCase(caseName) {
      const response = await fetch(DCCAuthorServer.serverAddress + "load-case", {
         method: "POST",
         body: JSON.stringify({"caseName": caseName}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.caseMd;
   }

   async saveCase(caseName, caseText) {
      const response = await fetch(DCCAuthorServer.serverAddress + "save-case", {
         method: "POST",
         body: JSON.stringify({"caseName": caseName,
                               "caseText": caseText}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.versionFile;
   }

   async loadPlayer() {
      const response = await fetch(DCCAuthorServer.serverAddress + "load-player", {
         method: "POST",
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.player;
   }

   async loadTemplate(templateFamily, templateName) {
      const response = await fetch(DCCAuthorServer.serverAddress + "load-template", {
         method: "POST",
         body: JSON.stringify({"templateFamily": templateFamily,
                               "templateName": templateName}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.template;
   }

   async prepareCaseHTML(templateFamily, caseName) {
      const response = await fetch(DCCAuthorServer.serverAddress + "prepare-case-html", {
         method: "POST",
         body: JSON.stringify({"templateFamily": templateFamily,
                               "caseName": caseName}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.status;
   }

   async saveKnotHTML(caseName, knotFile, knotHTML) {
      const response = await fetch(DCCAuthorServer.serverAddress + "save-knot-html", {
         method: "POST",
         body: JSON.stringify({"caseName": caseName,
                               "knotFile": knotFile,
                               "knotHTML": knotHTML}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.status;
   }

   async saveCaseScript(caseName, scriptFile, scriptJS) {
      const response = await fetch(DCCAuthorServer.serverAddress + "save-case-script", {
         method: "POST",
         body: JSON.stringify({"caseName": caseName,
                               "scriptFile": scriptFile,
                               "scriptJS": scriptJS}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      return jsonResponse.status;
   }
}

(function() {
   DCCAuthorServer.serverAddress = "http://cloud.lis.ic.unicamp.br/case-notebook/v1/server/";
})();