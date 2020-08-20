"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const checkKey = (e) => {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        spaceShip.style.top ='75vh'
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


