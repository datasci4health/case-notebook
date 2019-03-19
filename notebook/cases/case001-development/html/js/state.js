/**
 * Maintains the state of the play during its execution.
 * 
 * State Object
 * {
 *   variables = {id: <variable name>, value: <variable value>}
 * }
 */

class PlayState {
   constructor() {
      this._state = {
        variables: {}
      };
      
      this.variableGet = this.variableGet.bind(this);
      window.messageBus.ext.subscribe("var/+/get", this.variableGet);
      this.variableSet = this.variableSet.bind(this);
      window.messageBus.ext.subscribe("var/+/set", this.variableSet);
   }
   
   variableGet(topic, value) {
   }

   variableSet(topic, value) {
      const id = MessageBus.extractLevel(topic, 2);
      if (id != null)
         this._state.variables[id] = value;
      console.log("Variables updated:");
      console.log(this._state);
   }
}