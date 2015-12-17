import * as remote from 'remote';
var Rune = require('rune.js');
var connections = remote.getGlobal('connections');

const diam = 50;
var radians =  (d) => {return d * (Math.PI/180);}
var degrees = (r) => {return r * (180/Math.PI);}

$(document).ready(function() {

  let r = new Rune({
    container: '#flow',
    width: 600,
    height: 400
  });

let w = 20;
let h = 20;
var a = 0;
var step = 360/connections.bits.length;
console.log('connections.bits.length ' , connections.bits.length);
console.log('step ' , step);
var positions = [];
for(let p = 0; p < connections.bits.length; p++){

let x = (Math.sin(radians(a))* diam) + r.width/2;
let y = (Math.cos(radians(a))* diam) + r.height/2;
positions.push([x,y]);
a+=step;
}

  for (let i = 0; i < connections.bits.length; i++) {
    let bit = positions[i];
    console.log(bit);
    r.ellipse(bit[0], bit[1], w, h).fill('#4FA153').strokeWidth(2);
  }
for(let i = 0; i < connections.bits.length;i++){
  let current_obj = connections.bits[i];
  let current_id = current_obj.clientId;
  // let current_out = current_obj.output;
  let current_in = current_obj.input;

  for(let j = 0; j < connections.bits.length;j++){
    if(j!==i){
      let other_obj = connections.bits[j];
      let other_id = other_obj.clientId;
      // let other_out = other_obj.output;

      if(current_in === other_id){
        r.line(positions[i][0],positions[i][1],positions[j][0],positions[j][1]).strokeWidth(2);
        r.rect(positions[i][0],positions[i][1], 5,5).fill('#4FA153').strokeWidth(2);
        console.log(`"${current_id}" input is connected to object "${other_id}" output`);

      }
    }

  }
}

  r.draw();
});
