/**
 * 
 */

class Tracker {
   constructor() {
      this.inputTyped = this.inputTyped.bind(this);
      window.messageBus.ext.subscribe("/+/typed", this.inputTyped);
      this.inputChanged = this.inputChanged.bind(this);
      window.messageBus.ext.subscribe("/+/changed", this.inputChanged);
   }
   
   // tracks the user typing an input
   inputTyped(topic, message) {
      console.log("Topic: " + topic + "; typed: " + JSON.stringify(message));
   }
   
   inputChanged(topic, message) {
      console.log("Topic: " + topic + "; changed: " + JSON.stringify(message));
   }
}