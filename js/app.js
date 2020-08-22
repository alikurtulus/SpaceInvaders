"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const healthBar = document.getElementById('health-bar')
const wound = document.getElementById('wound')
const checkKey = (e) => {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        console.log(spaceShip.style.top)
        console.log('sda')
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }
    else if (e.keyCode == '32') {
        // fire
     }

}
document.onkeydown = checkKey;
healthBar.style.cssText="background-color:#00FF00;width:140px;height:30px;border-radius:8px;"



