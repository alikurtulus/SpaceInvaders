"use strict"
console.log("Connected")
const spaceShip = document.getElementById('space-ship')
const healthBar = document.getElementById('health-bar')
const gameBoard = document.getElementById('game')
const wound = document.getElementById('wound')
const scoreDisplay = document.getElementById('score')
const player = new SpaceShip(670, 680, 100, spaceShip,gameBoard)
let enemy
let enemies = []
let enemyWidth = 64
let enemyHeight = 64
let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false}
let score = 0
let enemiesNumbers = 16
let selectedEnemyIndex

const createEnemies = () => {

   let xPos = 150
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
        leftEnemyContainer.textContent="..................."
        rightEnemyContainer = document.createElement('div')
        rightEnemyContainer.textContent="..................."
        leftEnemyContainer.style.cssText="width:150px;"
        rightEnemyContainer.style.cssText="width:9px;"
       
        for( let i = 0; i< enemiesNumbers; i++){
            const enemyDiv = document.createElement('div')
            enemyDiv.id=i+"enemy"
            let enemy = new Enemy(xPos, yPos, health, enemyDiv, gameBoard)
            enemies.push(enemy)
            enemyDiv.style.cssText=`width:64px;height:64px;background-image:url('/images/enemy.png');background-size:cover;`+"left:"+xPos+"px;position:absolute;top:"+yPos+"px;"
            enemyContainer.style.cssText="display:flex;width:100%;"
            enemyContainer.classList.add('enemy-container')
            middleEnemyContainer.style.cssText="display:flex;"
            middleEnemyContainer.appendChild(enemyDiv)
            xPos += enemyWidth
        }
        enemyContainer.appendChild(leftEnemyContainer)
        enemyContainer.appendChild(middleEnemyContainer)
        enemyContainer.appendChild(rightEnemyContainer)
        xPos = 150
        yPos += enemyHeight
        gameBoard.appendChild(enemyContainer)
       
   }
  
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
const createEnemyFire = () => {
    selectedEnemyIndex = Math.floor(Math.random() * enemies.length)
    console.log(enemies[selectedEnemyIndex].xPos, enemies[selectedEnemyIndex].yPos)
    enemies[selectedEnemyIndex].createBullet(enemies[selectedEnemyIndex].xPos, enemies[selectedEnemyIndex].yPos)
    const bulletMovesTimer = setInterval(() => {
        enemies[selectedEnemyIndex].fireBullet()
    },1000)
   
}
const enemyBulletTimer =  setInterval(()=>{
    createEnemyFire()
},2000)
const enemyInterval = setInterval(()=>{
    enemiesMovement()
    
},1000)
const checkBulletSucceed = () => {
    let spaceShipsBullets =  player.fireBullet()
        spaceShipsBullets.map((bullet,bulletIndex) => {
            enemies.map((en,index) => {
                if( (en.xPos < bullet.x && bullet.x < en.xPos + enemyWidth) 
                    && (bullet.y + 10 <=  en.yPos + enemyHeight && bullet.y > en.yPos)){
                    if(en.health > 0){
                        en.wounded()
                        player.clearBullet(bullet,bulletIndex)
                    }
                    else{
                        console.log(enemies.length)
                        en.clearEnemy()
                        en.clearBullet(index)
                        enemies.splice(index,1)
                        player.clearBullet(bullet, bulletIndex)
                        console.log(enemies.length)
                        enemiesNumbers -= 1
                        score += 20
                    }
                    score += 10
                    scoreDisplay.innerText = score
                }
               
            })
        })
}

document.body.addEventListener('keydown', (e) => {
   
    e = e || window.event;
   if (e.keyCode in keysPressed){
          
       keysPressed[e.keyCode] = true;

        if( keysPressed[38] && keysPressed[37]){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesUpLeft()
        }
        else if( keysPressed[38] && keysPressed[39] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesUpRight()
        }
        else if( keysPressed[40] && keysPressed[37] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesDownLeft()
        }
        else if( keysPressed[40] && keysPressed[39] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesDownRight()
        }
        else if( keysPressed[38] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesUp()
        }
        else if( keysPressed[40] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesDown()
        }
        else if( keysPressed[37] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
            } 
            player.movesLeft()
        }
        else if( keysPressed[39] ){
            if( keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                   checkBulletSucceed()
                },800)
            } 
            player.movesRight()
        }
        else if (keysPressed[32] ){
                player.createBullet()
                setInterval(() => {
                    checkBulletSucceed()
                },800)
        }
   }
});
document.body.addEventListener('keyup', (e) => {
     keysPressed[e.keyCode] = false;
 });
healthBar.style.cssText="background-color:#00FF00;width:140px;height:30px;border-radius:8px;"



