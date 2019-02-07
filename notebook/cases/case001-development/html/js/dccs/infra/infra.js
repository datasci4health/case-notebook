/**
 * Bus
 */

class MessageBus {
   constructor() {
      this._listeners = [];
   }
   
   subscribe(topic, address) {
      this._listeners.push({topic: topic,
                            address: address});
   }
   
   unsubscribe(topic, address) {
      let found = false;
      for (let l = 0; l < this._listeners.length && !found; l++)
         if (this._listeners[l].topic == topic &&
             this._listeners[l].address == address) {
            this._listeners.splice(l, 1);
            found = true;
         }
   }
   
   dispatchMessage(topic, message) {
      for (let l in this._listeners)
         if (this._listeners[l].topic == topic ||
             (topic.startsWith(this._listeners[l].topic) &&
              topic[this._listeners[l].topic.length] == "/"))
            this._listeners[l].address(topic, message);
   }
}

(function() {
   window.messageBus = new MessageBus();
})();