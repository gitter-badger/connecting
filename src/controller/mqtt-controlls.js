/**
 * [config description]
 * @type {[type]}
 */
var  config = require('simpler-config');
var url = null;
var settings = null;
var topics = null;
var client = null;
var isSubscribed = false;
var isPublishing = false;
var stopPub = false;

/**
 *
 */
import * as mqtt from 'mqtt';

// var client = null;
/**
 * [shiftr description]
 * @return {[type]} [description]
 */

export function patcher() {
}

export var settings = settings;
export var url = url;
export var topics = topics;
export var isSubscribed = isSubscribed;
export var isPublishing = isPublishing;
export var stopPub = stopPub;

export function init (){
  console.log('patcher is initialised');
 url = 'mqtt://' + config.login.user + ':' + config.login.pw + '@broker.shiftr.io';
 settings = {
  'clientId': config.login.clientId
};
 topics = {
  'subscribe':'/output/#',
  'publish':'/input/'
};
};

export function connect() {
  console.log(`Connecting client: ${settings.clientId} to url:"${url}"`);
  client = mqtt.connect(url, settings);
}
export function disconnect(force = false, cb = undefined) {
  console.log(`Disconnecting client: ${settings.clientId}`);
  stopPub = true;

  client.end(force, cb);
}
export function reconnect() {
  client.end(false, () => {
    console.log(`Reconnecting client: ${settings.clientId}`);
    client.connect(url, settings);
  });
}
export function subscribe(){
  console.log(`Subscribing client ${settings.clientId} to topic: ${topics.subscribe}`);
  client.subscribe(topics.subscribe);
  isSubscribed = true;
}

export function unsubscribe(){
  console.log(`Unsubscribing client ${settings.clientId} from topic: ${topics.subscribe}`);
  if(isSubscribed === true){
    client.unsubscribe(topics.subscribe,()=>{
      console.log('sucessfully unsubscribed');
      isSubscribed = false;
    });
  }
}
export function unpublish (){
  console.log(`Client ${settings.clientId} should stop publishing to topic ${topics.publish}`);
  stopPub = true;
}

export function publish(){
  // if(isSubscribed === true){

  console.log(`Client ${settings.clientId} is publishing to topic ${topics.publish}`);
    // client.on('message',()=>{});
    // this is just for testing purpouse
    // maybe we dont need to stop and stat publishing
    var timer = setInterval(()=>{
      client.publish(topics.publish,'ping');
      if(stopPub === true){
        clearInterval(timer);
        stopPub = false;
      }
    }, 1000);

  // }
}



export function listen(){
  console.log(`Client ${settings.clientId} is listening on topic ${topics.subscribe}`);
  client.on('message',()=>{
    // here we listen on
  });
}
// export var client = client;
/**
 * [patch description]
 * @return {[type]} [description]
 */
export function patch() {
  // init();
  let client = mqtt.connect(url, settings);
  client.on('connect', () => {
    client.subscribe('/output/#');
    client.on('message', (topic, message) => {
      let json = JSON.parse(message);
      if (json.clientId === config.patch[0].clientId) {
        // now we know wo send the message.
        // currently not set
      }
      client.publish('/input/simple-js-input',
        `this message was patched from output to input via patcher ${message.toString()}`);
      // console.log(`topic: ${topic} message: ${message.toString()}`);
    });
  });
}
