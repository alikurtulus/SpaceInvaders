"use strict"
console.log("Connected")
let sliderButtonsContainer
let leftBtn
let rightBtn
const backDropModal = document.querySelector('.backdrop')
const modalContainer = document.querySelector('.modal')
const soundContainer = document.getElementById('sound-container')
let btnStart = document.createElement('button')
let instructionSliderIndex = 0
const escContainer = document.getElementById('esc-key-container')

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
    header.style.cssText="width:100%;padding:1em;color:white;position:relative;top:0;text-align:center;margin-bottom:1em;left:0;background-color:#0f4c75;font-size:1.4em;"
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
    btnStart.style.cssText ="width:80px;height:40px;background-color:#0f4c75;color:white;margin:1em;position:relative;left:8.4vw;font-size:1.2em;cursor:pointer;"
   
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

const init = () => {
let leftUpTimer = null
let rightUpTimer = null
let leftDownTimer = null
let rightDownTimer = null
let upTimer = null
let downTimer = null
let leftTimer = null
let rightTimer = null
let enemyBulletMovementTimer = null
let enemyBulletTimer = null
let enemyInterval = null
let spaceBarTimer = null
let  spaceShip = document.createElement('div')
let  spaceImg = document.createElement('img')
spaceImg.setAttribute('src','/assets/images/spaceship.png')
spaceShip.style.cssText = "width:100px;height: 100px; position: absolute;top:680px;left:44.5%;"
spaceImg.style.cssText = "width:100px;height: 100px;"
spaceShip.appendChild(spaceImg)
spaceShip.id = "space-ship"
let healthPer = document.getElementById('health')
healthPer.style.cssText="background-color:#00FF00;width:100%;"
let gameBoard = document.getElementById('game')
gameBoard.appendChild(spaceShip)
let woundPer = document.getElementById('wound')
let scoreDisplay = document.getElementById('score')
let player = new SpaceShip(650, 680, 100, spaceShip,gameBoard)

let bombNumbersDisplay = document.getElementById('bomb-numbers')
healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
let playerMissileSound = new Audio('/assets/sounds/player-missile.mp3')
let enemyMissileExplosionSound = new Audio('/assets/sounds/enemy-missile-explosion.mp3')
let playerMissileExplosionSound = new Audio('/assets/sounds/player-missile-explosion.mp3')
let isPaused = false
let enemies = []
let enemyWidth = 64
let enemyHeight = 64
let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false, 27:false}
let score = 0
let enemiesNumbers = 15
let temporaryEnemies = []
let injuredNumbers = 0
let woundPercent = 0
let soundContent = null
let soundImgIcon = null
let isSoundOff = false
let modalBtn =  null

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
        if(chooseAvailableEnemy() >= 0) {
            if(!isPaused){
                let selectedEnemyIndex = chooseAvailableEnemy()
                temporaryEnemies[selectedEnemyIndex].createBullet(temporaryEnemies[selectedEnemyIndex].xPos, temporaryEnemies[selectedEnemyIndex].yPos)
                enemyBulletMovementTimer = setInterval(() => {
                    if(!isPaused){
                        temporaryEnemies[selectedEnemyIndex].fireBullet()
                        if(temporaryEnemies[selectedEnemyIndex]){
                            temporaryEnemies.map(en => en.bulletPos.map((b,index) => {
                                if( (player.xPos <= b.x) && (b.x < player.xPos + player.playerWidth)
                                    && (b.y >= player.yPos) && (b.y< player.yPos + player.playerHeight) ){
            
                                    if(!isSoundOff){
                                        enemyMissileExplosionSound.play()
                                    }
                                    if(player.health > 0){
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
                                    }else{
                                        console.log('lost')
                                        modalContainer.innerHTML = ""
                                        const modalLooser = new Modal('Game Over', 'Looser', '#9D1627', modalContainer, 
                                        score, player.health, player.missileNumbers, 'Play Again!','looser-card-btn','looser-card' )
                                        modalBtn = modalLooser.createModal()
                                        modalContainer.style.display = "block"
                                        backDropModal.style.display = "block"
                                        isPaused = true
                                        clearAll()
                                        modalBtn.addEventListener('click' , () => {
                                            modalContainer.style.display = "none"
                                            backDropModal.style.display = "none"
                                            gameBoard.innerHTML = ""
                                            score = 0
                                            isPaused = true
                                            player.health = 100 
                                            player.missileNumbers = 120
                                            injuredNumbers = 0
                                            healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
                                            init()
                                        })
                                    }
                                  
                                }
                            }))
                           
                        }
                    }
             
                   
                },800)
            }
        }
    }
    enemyBulletTimer =  setInterval(()=>{
        if(!isPaused){
            createEnemyFire()
            if(!isSoundOff){
                //playerMissileSound.play()
            }
        }
       
    },2000)
    enemyInterval = setInterval(()=>{
        if(!isPaused){
            isSpaceShipTouchedAliens()
           enemiesMovement()
        }
       
    },1000)
    
    // When Spaceship hits the alien 
    const checkBulletSucceed = () => {
        let spaceShipsBullets
        if(!isPaused){
            spaceShipsBullets =  player.fireBullet()
            spaceShipsBullets.map((bullet,bulletIndex) => {
                enemies.map((en,index) => {
                    if( (en.xPos - 4 <= bullet.x && bullet.x <= en.xPos + enemyWidth) 
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
                            if(enemies.length === 0 &&  player.health > 0){
                                modalContainer.innerHTML = ""
                                const modalWinner = new Modal('Congratulations', 'Winner', '#3FB379', modalContainer, 
                                score, player.health, player.missileNumbers, 'Try Again!',"winner-card-btn","winner-card")
                                modalBtn = modalWinner.createModal()
                                modalContainer.style.display = "block"
                                backDropModal.style.display = "block"
                                soundContainer.innerHTML = ""
                                injuredNumbers = 0
                                clearAll()
                                isPaused = true
                                modalBtn.addEventListener('click' , () => {
                                    modalContainer.style.display = "none"
                                    backDropModal.style.display = "none"
                                    gameBoard.innerHTML = ""
                                    score = 0
                                    isPaused = false
                                    player.health = 100 
                                    player.missileNumbers = 120
                                    spaceShip = null
                                    injuredNumbers = 0
                                    healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
                                    init()
                                })
                            } 
                        }
                        score += 10
                        scoreDisplay.innerText = score
                    }
                   
                })
            })
        }
            
    }
    const gameOver = () => {
        modalContainer.innerHTML = ""
        player.health = 0
        const modalLooser = new Modal('Game Over', 'Looser', '#9D1627', modalContainer, 
        score, player.health, player.missileNumbers, 'Try Again!','looser-card-btn','looser-card')
        modalBtn = modalLooser.createModal()
        modalContainer.style.display = "block"
        backDropModal.style.display = "block"
        healthPer.style.cssText="background-color:#00FF00;width:100%;"
        clearAll()
        isPaused = true
        gameBoard.innerHTML = ""
        soundContainer.innerHTML = ""
        player.health = 0
        modalBtn.addEventListener('click' , () => {
            modalContainer.style.display = "none"
            backDropModal.style.display = "none"
            score = 0
            player.health = 100 
            player.missileNumbers = 120
            isPaused = false
            soundContainer.innerHTML = ""
            healthPer.style.cssText="background-color:#00FF00;width:100%;"
            clearAll()
            init()
        })
    }
    // Check game over and continue possibilities.
    const checkHitPossibilities = (timer) =>{
        if( keysPressed[32] ){
            if(player.missileNumbers >= 2){
                if(!isPaused){
                    player.createBullet()
                    if(!isSoundOff){
                    playerMissileSound.play()
                    }
                    player.missileNumbers -= 2
                    bombNumbersDisplay.innerText = player.missileNumbers
                    timer = setInterval(() => {
                        checkBulletSucceed()
                    },400)
                }
            }
            else if(player.missileNumbers < 1 && enemies.length > 0){
                soundContainer.innerHTML = ""
                player.health = 100
                gameOver()
            }
            
            
        } 
    }
    const isSpaceShipTouchedAliens = () => {
        enemies.map(en => {
             if( (player.yPos  <= en.yPos + enemyHeight - 10 ) && (en.xPos <= player.xPos && player.xPos <= en.xPos + enemyWidth)){
                playerMissileExplosionSound.play()
                playerMissileExplosionSound.play()
                player.health = 0
                spaceShip.style.backgroundImage = "url('/assets/images/explosion.png')"
                woundPercent += 5 * 20
                woundPer.style.width  = woundPercent + "%"
                woundPer.style.backgroundColor = "red"
                healthPer.style.width = player.health + "%"
                injuredNumbers = 0
                clearAll()
                setTimeout(() => {
                    player.health = 100
                    score = 0
                    player.bombNumbersDisplay = 120
                    spaceShip.style.display = "none"
                    soundContainer.innerHTML = ""
                    healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
                    gameOver()
                },1500)
               
             } 
        })
    }

    
    // Check all keys's value from the user
    document.body.addEventListener('keydown', (e) => {
       
        e = e || window.event;
       if (e.keyCode in keysPressed){
              
           keysPressed[e.keyCode] = true;
            
           //When user press the left arrow key and up arrow key 
            if( keysPressed[38] && keysPressed[37]){
                if(!isPaused){
                    checkHitPossibilities(leftUpTimer)
                    isSpaceShipTouchedAliens()
                    player.movesUpLeft()
                }
            }
            //When user press the right arrow key and up arrow key 
            else if( keysPressed[38] && keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightUpTimer)
                    isSpaceShipTouchedAliens()
                    player.movesUpRight()
                }
            }
            //When user press the left arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[37] ){
                if(!isPaused){
                    checkHitPossibilities(leftDownTimer)
                    isSpaceShipTouchedAliens()
                    player.movesDownLeft()
                } 
            }
            //When user press the right arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightDownTimer)
                    isSpaceShipTouchedAliens()
                    player.movesDownRight()
                }
            }
            //When user press up arrow key 
            else if( keysPressed[38] ){
                if(!isPaused){
                    checkHitPossibilities(upTimer)
                    isSpaceShipTouchedAliens()
                    player.movesUp()
                }
            }
            //When user press down arrow key 
            else if( keysPressed[40] ){
                if(!isPaused){
                    checkHitPossibilities(downTimer)
                    isSpaceShipTouchedAliens()
                    player.movesDown()
                }
            }
            //When user press left  arrow key 
            else if( keysPressed[37] ){
                if(!isPaused){
                    checkHitPossibilities(leftTimer)
                    isSpaceShipTouchedAliens()
                    player.movesLeft()
                }
            }
            //When user press right arrow key 
            else if( keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightTimer)
                    isSpaceShipTouchedAliens()
                    player.movesRight()
                }
            }
           //When user press  the space-bar key
            else if (keysPressed[32] ){
                if(!isPaused){
                    checkHitPossibilities(spaceBarTimer)
                }  
            }
            else if( keysPressed[27]){
                modalContainer.innerHTML = ""
                const modalPause = new Modal('Space Invaders', 'Killer', '#006a71', modalContainer, 
                score, player.health, player.missileNumbers, 'Continue!','looser-card-btn','looser-card', backDropModal)
                modalBtn = modalPause.createModal()
                modalContainer.style.display = "block"
                backDropModal.style.display = "block"
                clearAll()
                isPaused = true
                soundContainer.innerHTML = ""
                modalBtn.addEventListener('click' , () => {
                    modalContainer.style.display = "none"
                    backDropModal.style.display = "none"
                    isPaused = false
                })
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
    const clearAll = () => {
        clearInterval(enemyInterval)
        clearInterval(enemyBulletTimer)
        clearInterval(leftUpTimer)
        clearInterval(rightUpTimer)
        clearInterval(leftDownTimer)
        clearInterval(rightDownTimer)
        clearInterval(upTimer)
        clearInterval(downTimer)
        clearInterval(leftTimer)
        clearInterval(rightTimer)
        clearInterval(enemyBulletMovementTimer)
    }
    
    
}
