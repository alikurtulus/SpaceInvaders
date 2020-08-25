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
let enemiesNumbers = 16
let temporaryEnemies = []
let deletedEnemiesIndex = []
let allEnemies = []
let injuredNumbers = 0
let woundPercent = 0
let soundContent
let soundImgIcon
let isSoundOff = false
const modalWinner = new Modal('Congratulations', 'Winner', '#3FB379', modalContainer, score, player.health, player.missileNumbers, 'Try Again!',"winner-card-btn","winner-card")
const modalLooser = new Modal('Game Over', 'Looser', '#9D1627', modalContainer, score, player.health, player.missileNumbers, 'Try Again!','looser-card-btn','looser-card')
const modalPause = new Modal('Space Invaders', 'Killer', '#3FB379', modalContainer, score, player.health, player.missileNumbers, 'Continue', 'pause-card-btn', 'pause-card')
let instructionSliderIndex = 0
healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"

const createSlider = (mainModal) => {
    sliderButtonsContainer = document.createElement('div')
    sliderButtonsContainer.style.display = "flex"
    sliderButtonsContainer.style.justifyContent = "center"
    sliderButtonsContainer.style.alignItems = "center"
    leftBtn = document.createElement('div')
    rightBtn = document.createElement('div')
    leftBtn.className = "slider-btn"
    leftBtn.style.backgroundImage ="url('/assets/images/previous.png')"
    leftBtn.style.backgroundSize = "cover"
    rightBtn.className = "slider-btn"
    rightBtn.style.backgroundImage = "url('/assets/images/next.png')"
    rightBtn.style.backgroundSize = "cover"
    sliderButtonsContainer.appendChild(leftBtn)
    sliderButtonsContainer.appendChild(rightBtn)

  
    mainModal.appendChild(sliderButtonsContainer)

}


const createMainModal = () => {
    const mainContainer = document.createElement('div')
    mainContainer.style.padding = "10px"
    const header = document.createElement('div')
    header.style.width = "100%"
    header.style.padding = "1em"
    header.style.cssText="width:100%;padding:1em;color:white;position:relative;top:0;text-align:center;margin-bottom:1em;left:0;"
    const title = document.createElement('h2')
    title.innerText = "Space Invaders"
    header.style.backgroundColor = "#0f4c75"
    header.appendChild(title)
    mainContainer.appendChild(header)

    const instructionContainer = document.createElement('div')
    const instructionHeader = document.createElement('div')
    
    instructionHeader.style.textAlign = "center"
    instructionHeader.style.color = "red"
    instructionHeader.style.margin = "0.8em auto"
    const instructionTitle = document.createElement('h2')
    instructionTitle.innerText = "Instructions"
    instructionHeader.appendChild(instructionTitle)
    instructionContainer.appendChild(instructionHeader)
    const instructionContent = document.createElement('p')
    instructionContent.style.textAlign = "justify"
    instructionContent.style.margin = "1em auto"
    instructionContent.style.height = "150px"
    instructionContent.innerText = instructions[instructionSliderIndex]
    instructionContainer.appendChild(instructionContent)
    mainContainer.appendChild(instructionContainer)
    createSlider(instructionContainer)
    const controlsContainer = document.createElement('div')
    const headerControls  = document.createElement('div')
    const controlsContentContainer = document.createElement('div')
    headerControls.style.color = "red"
    headerControls.style.width = "100%"
    headerControls.style.textAlign = "center"
    const titleControls = document.createElement('h2')
    titleControls.innerText = "Controls"
    headerControls.appendChild(titleControls)
    controlsContainer.appendChild(headerControls)
    
    controlsContentContainer.style.display = "flex"
    const spaceBarContainer = document.createElement('div')
    const titleSpaceBarContainer = document.createElement('h3')
    const spaceBarImg = document.createElement('img')
    titleSpaceBarContainer.style.textAlign ="center"
    titleSpaceBarContainer.innerText = "Hit"
    titleSpaceBarContainer.style.color = "red"
    spaceBarImg.setAttribute('src','/assets/images/spacebar.png')
    spaceBarImg.style.width = "148px"
    spaceBarImg.style.height = "120px"
    spaceBarImg.style.position = "relative"
    spaceBarImg.style.top = "1.6em"
    spaceBarContainer.appendChild(titleSpaceBarContainer)
    spaceBarContainer.appendChild(spaceBarImg)
    controlsContentContainer.appendChild(spaceBarContainer)

    const arrowKeysContainer = document.createElement('div')
    const titleArrowKeyContainer = document.createElement('h3')
    const arrowKeyImg = document.createElement('img')
    titleArrowKeyContainer.innerText = "Move"
    titleArrowKeyContainer.style.textAlign ="center"
    titleArrowKeyContainer.style.color = "red"
    arrowKeyImg.setAttribute('src','/assets/images/arrow-keys.png')
    arrowKeyImg.style.width = "128px"
    arrowKeyImg.style.height = "128px"
    arrowKeysContainer.appendChild(titleArrowKeyContainer)
    arrowKeysContainer.appendChild(arrowKeyImg)
    controlsContentContainer.appendChild(arrowKeysContainer)
    controlsContainer.appendChild(controlsContentContainer)
    mainContainer.appendChild(controlsContainer)

    
    btnStart.innerText = "Start!"
    btnStart.style.width = "60px"
    btnStart.style.height = "30px"
    btnStart.style.backgroundColor = "#0f4c75"
    btnStart.style.color = "white"
    btnStart.style.margin = "1em auto"

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
const createSoundContainer = () => {
    soundImgIcon = document.createElement('img')
    soundContent = document.createElement('div')
    soundImgIcon.setAttribute('src','/assets/images/sound-on.png')
    soundImgIcon.className="icon"
    soundContent.innerText="Sound on"
    soundContent.style.position = "relative"
    soundContent.style.top = "15px"
    soundContent.style.right = "18px"
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
                let enemy = new Enemy(xPos, yPos, health, enemyDiv, gameBoard)
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
    const createEnemiesArr = () => {
        for(let i = 0; i < 30; i++){
            allEnemies.push(i)
        }
    }
    createEnemiesArr()
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
       
        allEnemies = allEnemies.filter( x => !deletedEnemiesIndex.includes(x))
        return allEnemies[Math.floor(Math.random() * allEnemies.length)]
    }
    
    const createEnemyFire = () => {
      
        let selectedEnemyIndex = chooseAvailableEnemy()
        temporaryEnemies[selectedEnemyIndex].createBullet(temporaryEnemies[selectedEnemyIndex].xPos, temporaryEnemies[selectedEnemyIndex].yPos)
        
        const enemyBulletMovementTimer = setInterval(() => {
            temporaryEnemies[selectedEnemyIndex].fireBullet()
            if(temporaryEnemies[selectedEnemyIndex]){
                enemies.map(en => en.bulletPos.map((b,index) => {
                    console.log(b.x, b.y, player.xPos, player.yPos)
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
    const checkBulletSucceed = () => {
        let spaceShipsBullets =  player.fireBullet()
            spaceShipsBullets.map((bullet,bulletIndex) => {
                enemies.map((en,index) => {
                    if( (en.xPos <= bullet.x && bullet.x <= en.xPos + enemyWidth) 
                        && (bullet.y + 10 <=  en.yPos + enemyHeight && bullet.y >= en.yPos)){
                        if(!isSoundOff){
                        playerMissileExplosionSound.play()
                        }
                        if(en.health > 0){
                            en.wounded()
                            player.clearBullet(bullet,bulletIndex)
                        }
                        else{
                            en.clearEnemy()
                            en.clearBullet(index)
                            enemiesNumbers -= 1
                            enemies.splice(index,1)
                            player.clearBullet(bullet, bulletIndex)
                            deletedEnemiesIndex.push(index)
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
    document.body.addEventListener('keyup', (e) => {
         keysPressed[e.keyCode] = false;
     });
   
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

