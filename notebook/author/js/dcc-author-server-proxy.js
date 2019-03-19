/**
 * Local component that works as a proxy to the server functionalities
 */

class DCCAuthorServer {
   constructor() {
      this.templateFamiliesList = this.templateFamiliesList.bind(this);
      window.messageBus.ext.subscribe("template_family/*/get", this.templateFamiliesList);
      this.casesList = this.casesList.bind(this);
      window.messageBus.ext.subscribe("case/*/get", this.casesList);
      this.loadCase = this.loadCase.bind(this);
      window.messageBus.ext.subscribe("case/+/get", this.loadCase);
      this.saveCase = this.saveCase.bind(this);
      window.messageBus.ext.subscribe("case/+/set", this.saveCase);
      this.loadTemplate = this.loadTemplate.bind(this);
      window.messageBus.ext.subscribe("template/+/get", this.loadTemplate);
      this.prepareCaseHTML = this.prepareCaseHTML.bind(this);
      window.messageBus.ext.subscribe("case/+/prepare", this.prepareCaseHTML);
      this.saveKnotHTML = this.saveKnotHTML.bind(this);
      window.messageBus.ext.subscribe("knot/+/set", this.saveKnotHTML);
      this.saveCaseObject = this.saveCaseObject.bind(this);
      window.messageBus.ext.subscribe("case/+/set", this.saveCaseObject);
   }
   
   // wrapper of the services
   
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
      window.messageBus.ext.publish("template_family/*", finalFamiliesList);
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
      window.messageBus.ext.publish("case/*", finalCasesList);
   }
   
   async loadCase(topic) {
      const caseName = MessageBus.extractLevel(topic, 2);
      if (caseName != "*") {
         const response = await fetch(DCCAuthorServer.serverAddress + "load-case", {
            method: "POST",
            body: JSON.stringify({"caseName": caseName}),
            headers:{
              "Content-Type": "application/json"
            }
         });
         const jsonResponse = await response.json();
         window.messageBus.ext.publish("case/" + caseName, jsonResponse.caseMd);
      }
   }

   async saveCase(topic, message) {
      if (message.format == "markdown") {
         const caseName = MessageBus.extractLevel(topic, 2);
         const response = await fetch(DCCAuthorServer.serverAddress + "save-case", {
            method: "POST",
            body: JSON.stringify({"caseName": caseName,
                                  "caseText": message.source}),
            headers:{
              "Content-Type": "application/json"
            }
         });
         const jsonResponse = await response.json();
         window.messageBus.ext.publish("case/" + caseName + "/version", jsonResponse.versionFile);
      }
   }

   /*
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
   */

   async loadTemplate(topic) {
      const templateCompleteName = MessageBus.extractLevel(topic, 2);
      const separator = templateCompleteName.indexOf("."); 
      const templateFamily = templateCompleteName.substring(0, separator);
      const templateName = templateCompleteName.substring(separator+1);
      const response = await fetch(DCCAuthorServer.serverAddress + "load-template", {
         method: "POST",
         body: JSON.stringify({"templateFamily": templateFamily,
                               "templateName": templateName}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      window.messageBus.ext.publish("template/" + templateCompleteName, jsonResponse.template);
   }

   async prepareCaseHTML(topic, templateFamily) {
      const caseName = MessageBus.extractLevel(topic, 2);
      const response = await fetch(DCCAuthorServer.serverAddress + "prepare-case-html", {
         method: "POST",
         body: JSON.stringify({"templateFamily": templateFamily,
                               "caseName": caseName}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      window.messageBus.ext.publish("case/" + caseName + "/prepare/status", jsonResponse.status);
   }

   async saveKnotHTML(topic, message) {
      const knotId = MessageBus.extractLevel(topic, 2);
      
      const response = await fetch(DCCAuthorServer.serverAddress + "save-knot-html", {
         method: "POST",
         body: JSON.stringify({"caseName": message.caseId,
                               "knotFile": knotId + ".js",
                               "knotHTML": message.source}),
         headers:{
           "Content-Type": "application/json"
         }
      });
      const jsonResponse = await response.json();
      window.messageBus.ext.publish("knot/" + knotId + "/set/status", jsonResponse.status);
   }

   async saveCaseObject(topic, message) {
      if (message.format == "json") {
         const caseId = MessageBus.extractLevel(topic, 2);
         
         // <TODO> change the name of the service
         const response = await fetch(DCCAuthorServer.serverAddress + "save-case-script", {
            method: "POST",
            body: JSON.stringify({"caseName": caseId,
                                  "scriptFile": "case.js",
                                  "scriptJS": message.source}),
            headers:{
              "Content-Type": "application/json"
            }
         });
         const jsonResponse = await response.json();
         window.messageBus.ext.publish("case/" + caseId + "/set/status", jsonResponse.status);
      }
   }
}
