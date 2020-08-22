"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const healthBar = document.getElementById('health-bar')
const gameBoard = document.getElementById('game')
const wound = document.getElementById('wound')
const player = new SpaceShip(670, 680, 100, spaceShip)
let enemy
let enemies = []
let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false};

const createEnemies = () => {

   let xPos = 0
   let yPos = 50
   let health = 100
   let enemyContainer
   let leftEnemyContainer 
   let rightEnemyContainer
   let middleEnemyContainer
   for(let j = 0; j < 2; j++){

        enemyContainer = document.createElement('div')
        middleEnemyContainer = document.createElement('div')
        leftEnemyContainer = document.createElement('div')
        leftEnemyContainer.textContent="."
        rightEnemyContainer = document.createElement('div')
        rightEnemyContainer.textContent="."
        leftEnemyContainer.style.cssText="width:80px;"
        rightEnemyContainer.style.cssText="width:60px;"
        enemyContainer.appendChild(leftEnemyContainer)

        for( let i = 0; i< 14; i++){
            const enemyDiv = document.createElement('div')
            enemyDiv.id=i+"enemy"
            let enemy = new Enemy(xPos, yPos, health, enemyDiv)
            enemies.push(enemy)
            enemyDiv.style.cssText=`width:64px;height:64px;background-image:url('/images/enemy.png');background-size:cover;`+"left:"+xPos+"px;position:relative;"
            enemyContainer.style.cssText="display:flex;width:100%;"
            enemyContainer.classList.add('enemy-container')
            middleEnemyContainer.style.cssText="display:flex;"
            middleEnemyContainer.appendChild(enemyDiv)
            xPos += 5
            console.log(gameBoard)
        }

        enemyContainer.appendChild(middleEnemyContainer)
        enemyContainer.appendChild(rightEnemyContainer)
        xPos = 0
        yPos += 40
        gameBoard.appendChild(enemyContainer)
       
   }
   console.log(enemies)
  
}
createEnemies()
const enemiesMovement = () => {
    const randomMovement = Math.floor(Math.random() * 3);
    if( randomMovement === 0){
        enemies.map(en => en.movesLeft())
    }
    else if(randomMovement === 1){
        enemies.map(en => en.movesRight())
    }
    else{
        enemies.map(en => en.movesDown())
    }

}
const enemyInterval = setInterval(()=>{
    setTimeout(()=>{
        enemiesMovement()
    },5000)
},1000)
document.body.addEventListener('keydown', (e) => {
   
    e = e || window.event;
   if (e.keyCode in keysPressed){
          
       keysPressed[e.keyCode] = true;

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



