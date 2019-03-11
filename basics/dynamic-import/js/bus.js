/**
 * Bus
 */

class MessageBus {
   constructor() {
      this._listeners = [];
   }
   
   subscribe(topic, callback) {
      this._listeners.push({topic: topic,
                            callback: callback});
   }
   
   unsubscribe(topic, callback) {
      let found = false;
      for (let l = 0; l < this._listeners.length && !found; l++)
         if (this._listeners[l].topic == topic &&
             this._listeners[l].callback == callback) {
            this._listeners.splice(l, 1);
            found = true;
         }
   }
   
   dispatch(topic, message) {
      for (let l in this._listeners)
         if (this._listeners[l].topic == topic ||
             (topic.startsWith(this._listeners[l].topic) &&
              topic[this._listeners[l].topic.length] == "/"))
            this._listeners[l].callback(topic, message);
   }
   
   /* Checks if this topic has a subscriber */
   hasSubscriber(topic) {
      let hasSub = false;
      for (let l = 0; !hasSub && l < this._listeners.length; l++)
         if (this._listeners[l].topic == topic ||
             (topic.startsWith(this._listeners[l].topic) &&
              topic[this._listeners[l].topic.length] == "/"))
            hasSub = true;
      return hasSub;
   }
}

(function() {
   window.messageBus = new MessageBus();
})();