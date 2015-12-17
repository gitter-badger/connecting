import * as remote from 'remote';
// import * as mqttControls from 'mqtt-controls';
var mqttControls = remote.getGlobal('mqttControls');
var isConnected = false;
var isSubscribed = false;
var isPublished = false;
// console.log(mqttControls);
window.onload = function() {
  console.log('view-func');
  var connectButton = document.getElementById('btn-connect');
  var subscribeButton = document.getElementById('btn-subscribe');
  var publishButton = document.getElementById('btn-publish');

  connectButton.onclick = function() {
    if (isConnected === false) {
      // console.log('connecting')
      mqttControls.connect();
    } else if (isConnected === true) {
      // console.log('disconnecting')
      mqttControls.disconnect();
    }
    isConnected = !isConnected;
  }

  subscribeButton.onclick = function() {
    if (isConnected === true) {
      if (isSubscribed === false) {
        mqttControls.subscribe();
      } else if (isSubscribed === true) {
        mqttControls.unsubscribe();
      }
      isSubscribed = !isSubscribed;
    }

  }

  publishButton.onclick = function() {
    if (isConnected === true) {
      if (isPublished === false) {
        mqttControls.publish();
      } else if (isPublished === true) {
        mqttControls.unpublish();
      }
      isPublished = !isPublished;
    }
  }
}
