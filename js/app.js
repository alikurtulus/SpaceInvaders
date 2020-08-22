"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const healthBar = document.getElementById('health-bar')
const wound = document.getElementById('wound')
const player = new SpaceShip(670, 680, 100, spaceShip)

let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false};

document.body.addEventListener('keydown', (e) => {
   
    e = e || window.event;
   if (e.keyCode in keysPressed){
          
       keysPressed[e.keyCode] = true;
       console.log(keysPressed)
       if( keysPressed[38] && keysPressed[37]){
          player.movesUpLeft()
       }
       else if( keysPressed[38] && keysPressed[39] ){
          player.movesUpRight()
       }
       else if( keysPressed[40] && keysPressed[37] ){
          player.movesDownLeft()
       }
       else if( keysPressed[40] && keysPressed[39] ){
           player.movesDownRight()
       }
       else if( keysPressed[38] ){
           console.log('ad')
           player.movesUp()
       }
       else if( keysPressed[40] ){
           player.movesDown()
       }
       else if( keysPressed[37] ){
           player.movesLeft()
       }
       else if( keysPressed[39] ){
           console.log('ad')
           player.movesRight()
       }
   }
});
document.body.addEventListener('keyup', (e) => {
     keysPressed[e.keyCode] = false;
 });
healthBar.style.cssText="background-color:#00FF00;width:140px;height:30px;border-radius:8px;"



