"use strict"
console.log("Connected")
let sliderButtonsContainer
let leftBtn
let rightBtn
let btnStart = document.createElement('button')
const spaceShip = document.getElementById('space-ship')
const healthPer = document.getElementById('health')
const gameBoard = document.getElementById('game')
const woundPer = document.getElementById('wound')
const scoreDisplay = document.getElementById('score')
const bombNumbersDisplay = document.getElementById('bomb-numbers')
const backDropModal = document.querySelector('.backdrop')
const modalContainer = document.querySelector('.modal')
const playerMissileSound = new Audio('/assets/sounds/player-missile.mp3')
const enemyMissileExplosionSound = new Audio('/assets/sounds/enemy-missile-explosion.mp3')
const playerMissileExplosionSound = new Audio('/assets/sounds/player-missile-explosion.mp3')
const soundContainer = document.getElementById('sound-container')
const player = new SpaceShip(670, 680, 100, spaceShip,gameBoard)
let enemy
let enemies = []
let enemyWidth = 64
let enemyHeight = 64
let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false}
let score = 0
let enemiesNumbers = 15
let temporaryEnemies = []
let injuredNumbers = 0
let woundPercent = 0
let soundContent
let soundImgIcon
let isSoundOff = false
const modalWinner = new Modal('Congratulations', 'Winner', '#3FB379', modalContainer, 
      score, player.health, player.missileNumbers, 'Try Again!',"winner-card-btn","winner-card")
const modalLooser = new Modal('Game Over', 'Looser', '#9D1627', modalContainer, 
      score, player.health, player.missileNumbers, 'Try Again!','looser-card-btn','looser-card')
const modalPause = new Modal('Space Invaders', 'Killer', '#3FB379', modalContainer,
      score, player.health, player.missileNumbers, 'Continue', 'pause-card-btn', 'pause-card')
let instructionSliderIndex = 0
healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"

// Slider for changing the content of instructions.
const createSlider = (mainModal) => {
    sliderButtonsContainer = document.createElement('div')
    sliderButtonsContainer.style.cssText = "display:flex;justify-content:center;align-items:center;"
    leftBtn = document.createElement('div')
    rightBtn = document.createElement('div')
    leftBtn.className = "slider-btn"
    leftBtn.style.cssText = "background-image:url('/assets/images/previous.png'); background-image:cover; background-size:cover;width: 32px; height: 32px;cursor:pointer;"
    rightBtn.style.cssText ="background-image:url('/assets/images/next.png'); background-image:cover; background-size:cover; width: 32px; height: 32px;cursor:pointer;"
    sliderButtonsContainer.appendChild(leftBtn)
    sliderButtonsContainer.appendChild(rightBtn)
    mainModal.appendChild(sliderButtonsContainer)

}
// When The page load this modal will appear.
const createMainModal = () => {
    const mainContainer = document.createElement('div')
    mainContainer.style.padding = "10px"
    const header = document.createElement('div')
    header.style.cssText="width:100%;padding:1em;color:white;position:relative;top:0;text-align:center;margin-bottom:1em;left:0;background-color:#0f4c75;"
    const title = document.createElement('h2')
    title.innerText = "Space Invaders"
    header.appendChild(title)
    mainContainer.appendChild(header)

    const instructionContainer = document.createElement('div')
    const instructionHeader = document.createElement('div')
    instructionHeader.style.cssText = "text-align:center;color:red;margin:0.8em auto;"
    const instructionTitle = document.createElement('h2')
    instructionTitle.innerText = "Instructions"
    instructionHeader.appendChild(instructionTitle)
    instructionContainer.appendChild(instructionHeader)
    const instructionContent = document.createElement('p')
    instructionContent.style.cssText = "text-align:justify;margin:1em auto;height:150px;"
    instructionContent.innerText = instructions[instructionSliderIndex]
    instructionContainer.appendChild(instructionContent)
    mainContainer.appendChild(instructionContainer)
    createSlider(instructionContainer)

    const controlsContainer = document.createElement('div')
    const headerControls  = document.createElement('div')
    const controlsContentContainer = document.createElement('div')
    controlsContainer.style.marginTop = "2.2em"
    headerControls.style.cssText ="color:red;width:100%;text-align:center;margin:1em;"
    const titleControls = document.createElement('h2')
    titleControls.innerText = "Controls"
    headerControls.appendChild(titleControls)
    controlsContainer.appendChild(headerControls)
    controlsContentContainer.style.cssText = "display:flex;"
    const spaceBarContainer = document.createElement('div')
    const titleSpaceBarContainer = document.createElement('h3')

    const spaceBarImg = document.createElement('img')
    titleSpaceBarContainer.style.cssText = "text-align:center;color:red;"
    titleSpaceBarContainer.innerText = "Hit"
    spaceBarImg.setAttribute('src','/assets/images/spacebar.png')
    spaceBarImg.style.cssText = "width:148px;height:120px;position:relative;top:1.6em;"
    spaceBarContainer.appendChild(titleSpaceBarContainer)
    spaceBarContainer.appendChild(spaceBarImg)
    controlsContentContainer.appendChild(spaceBarContainer)

    const arrowKeysContainer = document.createElement('div')
    const titleArrowKeyContainer = document.createElement('h3')
    const arrowKeyImg = document.createElement('img')
    titleArrowKeyContainer.innerText = "Move"
    titleArrowKeyContainer.style.cssText = "text-align:center;color:red;"
    arrowKeyImg.setAttribute('src','/assets/images/arrow-keys.png')
    arrowKeyImg.style.cssText = "width:128px;height:128px;"
    arrowKeysContainer.appendChild(titleArrowKeyContainer)
    arrowKeysContainer.appendChild(arrowKeyImg)
    controlsContentContainer.appendChild(arrowKeysContainer)
    controlsContainer.appendChild(controlsContentContainer)
    mainContainer.appendChild(controlsContainer)

    btnStart.innerText = "Start!"
    btnStart.style.cssText ="width:80px;height:40px;background-color:#0f4c75;color:white;margin:1em;position:relative;left:9vw;font-size:1.2em;cursor:pointer;"
   
    mainContainer.appendChild(btnStart)
    modalContainer.appendChild(mainContainer)
    modalContainer.style.display = "block"
    backDropModal.style.display = "block"
    
    rightBtn.addEventListener('click', () => {
      
        if(instructions.length - 1  >instructionSliderIndex){
            instructionSliderIndex += 1
        }
        else{
            instructionSliderIndex = 0 
        }
       
        instructionContent.innerText = instructions[instructionSliderIndex]
    })
    leftBtn.addEventListener('click', () => {

        if(instructionSliderIndex > 0){
            instructionSliderIndex -= 1
        }
        else{
            instructionSliderIndex = instructions.length -1
        }
        instructionContent.innerText = instructions[instructionSliderIndex]
    })
   
}
createMainModal()
btnStart.addEventListener('click', (e) => {
    modalContainer.style.display = "none"
    backDropModal.style.display = "none"
    init()
   
})
// Controls sound on - off
const createSoundContainer = () => {
    soundImgIcon = document.createElement('img')
    soundContent = document.createElement('div')
    soundImgIcon.setAttribute('src','/assets/images/sound-on.png')
    soundImgIcon.className="icon"
    soundContent.innerText="Sound on"
    soundContent.style.cssText = "position:relative;top:15px;right:18px;"
    soundContainer.appendChild(soundImgIcon)
    soundContainer.appendChild(soundContent)
}
createSoundContainer()
const init = () => {
   
    const createEnemies = () => {
    
       let xPos = 140
       let yPos = 50
       let health = 100
       let enemyContainer
       let middleEnemyContainer
       for(let j = 0; j < 2; j++){
    
            enemyContainer = document.createElement('div')
            
            middleEnemyContainer = document.createElement('div')
            for( let i = 0; i< enemiesNumbers; i++){
                const enemyDiv = document.createElement('div')
                enemyDiv.id = i+"enemy"
                let enemy = new Enemy(xPos, yPos, health, enemyDiv, gameBoard, i)
                enemies.push(enemy)
                temporaryEnemies.push(enemy)
                enemyDiv.style.cssText=`width:64px;height:64px;background-image:url('/assets/images/enemy.png');background-size:cover;`+"left:"+xPos+"px;position:absolute;top:"+yPos+"px;"
                enemyContainer.style.cssText="display:flex;width:100%;"
                enemyContainer.classList.add('enemy-container')
                middleEnemyContainer.style.cssText="display:flex;"
                middleEnemyContainer.appendChild(enemyDiv)
                xPos += enemyWidth
            }
            
            enemyContainer.appendChild(middleEnemyContainer)
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

    const chooseAvailableEnemy = () => {
        let allEnemies = []
        for(let i = 0; i < enemies.length; i++){
            allEnemies.push(enemies[i].eId)
        }
        console.log(allEnemies)
        return allEnemies[Math.floor(Math.random() * allEnemies.length)]
    }
    
    const createEnemyFire = () => {
      
        let selectedEnemyIndex = chooseAvailableEnemy()
        temporaryEnemies[selectedEnemyIndex].createBullet(temporaryEnemies[selectedEnemyIndex].xPos, temporaryEnemies[selectedEnemyIndex].yPos)
        
        const enemyBulletMovementTimer = setInterval(() => {
            temporaryEnemies[selectedEnemyIndex].fireBullet()
            if(temporaryEnemies[selectedEnemyIndex]){
                temporaryEnemies.map(en => en.bulletPos.map((b,index) => {
                    if( (player.xPos <= b.x) && (b.x < player.xPos + player.playerWidth)
                        && (b.y >= player.yPos) && (b.y< player.yPos + player.playerHeight) ){
                        if(!isSoundOff){
                            enemyMissileExplosionSound.play()
                        }
                        player.health -= 20
                        injuredNumbers += 1
                        woundPercent += injuredNumbers * 20
                        woundPer.style.width  = woundPercent + "%"
                        woundPer.style.backgroundColor = "red"
                        healthPer.style.width = player.health + "%"
                        en.clearBullet(index)
                        b.targetElement.style.backgroundImage ="url('/assets/images/bomb.png')"
                        setTimeout(() => {
                            b.targetElement.style.display = "none"
                        },1000)
                      
                    }
                }))
               
            }
           
        },800)
       
    }
    const enemyBulletTimer =  setInterval(()=>{
        
        createEnemyFire()
        if(!isSoundOff){
            //playerMissileSound.play()
        }
    },2000)
    const enemyInterval = setInterval(()=>{
        enemiesMovement()
    },1000)
    
    // When Spaceship hits the alien 
    const checkBulletSucceed = () => {
        let spaceShipsBullets =  player.fireBullet()
            spaceShipsBullets.map((bullet,bulletIndex) => {
                enemies.map((en,index) => {
                    if( (en.xPos + 5 <= bullet.x && bullet.x <= en.xPos + enemyWidth) 
                        && (bullet.y + 10 <=  en.yPos + enemyHeight && bullet.y >= en.yPos)){
                        if(!isSoundOff){
                        playerMissileExplosionSound.play()
                        }
                        if(en.health > 0){
                            en.wounded(index)
                            player.clearBullet(bullet,bulletIndex)
                        }
                        else{
                            en.clearEnemy()
                            en.clearBullet(index)
                            enemiesNumbers -= 1
                            enemies.splice(index,1)
                            player.clearBullet(bullet, bulletIndex)
                           
                            score += 20
                        }
                        score += 10
                        scoreDisplay.innerText = score
                    }
                   
                })
            })
    }
    
    // Check all keys's value from the user
    document.body.addEventListener('keydown', (e) => {
       
        e = e || window.event;
       if (e.keyCode in keysPressed){
              
           keysPressed[e.keyCode] = true;
            
           //When user press the left arrow key and up arrow key 
            if( keysPressed[38] && keysPressed[37]){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                           playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesUpLeft()
            }
            //When user press the right arrow key and up arrow key 
            else if( keysPressed[38] && keysPressed[39] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesUpRight()
            }
            //When user press the left arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[37] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesDownLeft()
            }
            //When user press the right arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[39] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesDownRight()
            }
            //When user press up arrow key 
            else if( keysPressed[38] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesUp()
            }
            //When user press down arrow key 
            else if( keysPressed[40] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesDown()
            }
            //When user press left  arrow key 
            else if( keysPressed[37] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
                } 
                player.movesLeft()
            }
            //When user press right arrow key 
            else if( keysPressed[39] ){
                if( keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                       checkBulletSucceed()
                    },800)
                } 
                player.movesRight()
            }
           //When user press  the space-bar key
            else if (keysPressed[32] ){
                    if(player.missileNumbers > 0){
                        player.createBullet()
                        if(!isSoundOff){
                            playerMissileSound.play()
                        }
                        player.missileNumbers -= 2
                        bombNumbersDisplay.innerText = player.missileNumbers
                    }
                    setInterval(() => {
                        checkBulletSucceed()
                    },800)
            }
       }
    });
    // Clean all used keys from the keysPressed
    document.body.addEventListener('keyup', (e) => {
         keysPressed[e.keyCode] = false;
     });
    // When we turn sound on or off 
    soundImgIcon.addEventListener('click', () => {
        isSoundOff = !isSoundOff
    
        if(isSoundOff){
            soundImgIcon.setAttribute('src', '/assets/images/sound-off.png')
            soundContent.innerText = "Sound off"
    
        }else{
            soundImgIcon.setAttribute('src', '/assets/images/sound-on.png')
            soundContent.innerText = "Sound on"
        }
    })
    
}

