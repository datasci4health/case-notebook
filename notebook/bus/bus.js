/**
 * Bus
 */

class MessageBus {
   constructor(externalized) {
      this._externalized = externalized;
      this._listeners = [];
   }
   
   subscribe(topic, callback) {
      let status = true;
      
      // Topic Filter: transform wildcards in regular expressions
      if (topic.indexOf("+") > 0 || topic.indexOf("#") > 0) {
         const reTopic = topic.replace("/", "\\/")
                              .replace("+", "[\\w -.]+")
                              .replace("#", "[\\w\\/ -.]+");
         this._listeners.push({topic: topic,
                               regexp: new RegExp(reTopic),
                               callback: callback});
         
      } else 
         this._listeners.push({topic: topic,
                               callback: callback});
      
      return status;
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
   
   publish(topic, message) {
      // console.log("-- publish topic: " + topic + "; message: " + message);
      for (let l in this._listeners)
         if (this.matchTopic(l, topic))
            this._listeners[l].callback(topic, message);
   }
   
   /* Checks if this topic has a subscriber */
   hasSubscriber(topic) {
      let hasSub = false;
      for (let l = 0; !hasSub && l < this._listeners.length; l++)
         hasSub = this.matchTopic(l, topic);
      return hasSub;
   }
   
   matchTopic(index, topic) {
      let matched = false; 
      if (this._listeners[index].regexp) {
         const matchStr = this._listeners[index].regexp.exec(topic);
         if (matchStr != null && matchStr[0] === topic)
            matched = true;
      } else if (this._listeners[index].topic === topic)
         matched = true;
      return matched;
   }
   

   /* Message analysis services */
   
   /*
    * Returns the label at a specific level of the message.
    */
   static extractLevel(topic, level) {
      let label = null;
      if (topic != null) {
         const levelSet = topic.split("/");
         if (level <= levelSet.length)
            label = levelSet[level-1];
      }
      return label;
   }   
}

(function() {
   window.messageBus = {
      int: new MessageBus(false),
      ext: new MessageBus(true)
   };
})();