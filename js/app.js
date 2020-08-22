"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const healthBar = document.getElementById('health-bar')
const wound = document.getElementById('wound')
const player = new SpaceShip(780, 680, 100, spaceShip)
const checkKey = (e) => {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        player.movesUp()
    }
    else if (e.keyCode == '40') {
        // down arrow
        player.movesDown()
    }
    else if (e.keyCode == '37') {
       // left arrow
       player.movesLeft()
    }
    else if (e.keyCode == '39') {
       // right arrow
       player.movesRight()
    }
    else if (e.keyCode == '32') {
        // fire
        player.fireBullet()
     }

}
document.onkeydown = checkKey;
healthBar.style.cssText="background-color:#00FF00;width:140px;height:30px;border-radius:8px;"



