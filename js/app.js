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
const giftsArr = []
let leftUpTimer = null
let rightUpTimer = null
let leftDownTimer = null
let rightDownTimer = null
let upTimer = null
let downTimer = null
let leftTimer = null
let rightTimer = null
const collectedGifts = []
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
let giftsContainer = document.querySelector('#gifts-container')
healthPer.style.cssText="background-color:#00FF00;width:100%;"
let gameBoard = document.getElementById('game')
gameBoard.appendChild(spaceShip)
let woundPer = document.getElementById('wound')
let scoreDisplay = document.getElementById('score')
let player = new SpaceShip(650, 680, 100, spaceShip,gameBoard, 200)
let healthContainer = document.createElement('div')
healthContainer.className ="gift-stats"
healthContainer.id = "health-gifts"
let shieldContainer = document.createElement('div')
shieldContainer.className = "gift-stats"
shieldContainer.id  = "shield-gifts"
let tenPlusContainer = document.createElement('div')
tenPlusContainer.className = "gift-stats"
tenPlusContainer.id = "ten-plus-gifts"
let superBombContainer = document.createElement('div')
superBombContainer.className = "gift-stats"
superBombContainer.id = "super-bomb-gifts"
let bombNumbersDisplay = document.getElementById('bomb-numbers')
healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
let playerMissileSound = new Audio('/assets/sounds/player-missile.mp3')
let enemyMissileExplosionSound = new Audio('/assets/sounds/enemy-missile-explosion.mp3')
let playerMissileExplosionSound = new Audio('/assets/sounds/player-missile-explosion.mp3')
let collectItemSound = new Audio('/assets/sounds/collect-item.mp3')
let isPaused = false
let enemies = []
let enemyWidth = 64
let enemyHeight = 64
let keysPressed = {32:false, 37:false, 38:false, 39:false, 40:false, 27:false}
let score = 0
let enemiesNumbers = 45
let injuredNumbers = 0
let woundPercent = 0
let soundContent = null
let soundImgIcon = null
let isSoundOff = false
let modalBtn =  null
let isShield = false
let isSuperBomb = false

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
       let giftsName = ["health","shield","ten-plus","super-bomb"]
       let xPos = 140
       let yPos = 50
       let health = 100
       let enemyContainer
       let middleEnemyContainer
       for(let j = 0; j < 3; j++){
    
            enemyContainer = document.createElement('div')
            
            middleEnemyContainer = document.createElement('div')
            for( let i = 0; i< 15; i++){
                let myEnemy 
                let randomSuperAlien = Math.floor(Math.random() * 10)
                const enemyDiv = document.createElement('div')
                enemyDiv.id = i+"enemy"    
              
                if(randomSuperAlien > 2){
                    myEnemy = new Enemy(xPos, yPos, health, enemyDiv, gameBoard, i, 'normal')
                    enemyDiv.style.cssText=`width:64px;height:64px;background-image:url('/assets/images/enemy.png');background-size:cover;`+"left:"+xPos+"px;position:absolute;top:"+yPos+"px;"
                    enemyDiv.className = "normal"
                    enemies.push({enemy:myEnemy, isAlive:"alive"})
                   
                }
                else{
                    let randomGift = Math.floor(Math.random() * giftsName.length)
                    enemyDiv.style.cssText=`width:64px;height:64px;background-image:url('/assets/images/ufo.png');background-size:cover;`+"left:"+xPos+"px;position:absolute;top:"+yPos+"px;"
                    let extraHealth = health + 50
                    enemyDiv.className = giftsName[randomGift]
                    myEnemy = new Enemy(xPos, yPos, extraHealth, enemyDiv, gameBoard, i, giftsName[randomGift])
                    enemies.push({enemy:myEnemy, isAlive:"alive"})
                    
                }
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
            enemies.map(en =>  { 
                if(en.isAlive === "alive"){
                    en.enemy.movesLeft()
                }}
            )
        }
        else if(randomMovement === 1){
            enemies.map(en => {
                if(en.isAlive === "alive"){
                    en.enemy.movesRight()}
                }
            )
        }
        else{
            enemies.map(en => {
                if(en.isAlive === "alive"){
                    en.enemy.movesDown()
                }
            } )
        }
      
    }
   
    const createEnemyFire = () => { 
        let aliveEnemies 
        aliveEnemies = enemies.filter(en => en.isAlive === "alive")
        if(aliveEnemies.length > 0) {
            if(!isPaused){
                let selectedEnemyIndex = Math.floor(Math.random() * aliveEnemies.length)
                aliveEnemies[selectedEnemyIndex].enemy.createBullet(aliveEnemies[selectedEnemyIndex].enemy.xPos, aliveEnemies[selectedEnemyIndex].enemy.yPos)
                enemyBulletMovementTimer = setInterval(() => {
                    if(!isPaused){
                        aliveEnemies[selectedEnemyIndex].enemy.fireBullet()
                        aliveEnemies.map(en => en.enemy.bulletPos.map((b,index) => {
                                if( (player.xPos <= b.x) && (b.x < player.xPos + player.playerWidth)
                                    && (b.y >= player.yPos) && (b.y< player.yPos + player.playerHeight) && isShield === false ){
            
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
                                        en.enemy.clearBullet(index)
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
                                            player = null
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
       
    },900)
    
    // When Spaceship hits the alien 
    const checkBulletSucceed = () => {
        let spaceShipsBullets
        if(!isPaused){
            spaceShipsBullets =  player.fireBullet()
            spaceShipsBullets.map((bullet,bulletIndex) => {
                enemies.map((en,index) => {
                    if( (en.enemy.xPos - 4 <= bullet.x && bullet.x <= en.enemy.xPos + enemyWidth) 
                        && (bullet.y + 10 <=  en.enemy.yPos + enemyHeight && bullet.y >= en.enemy.yPos) && en.isAlive === "alive"){
                    
                        if(!isSoundOff){
                        playerMissileExplosionSound.play()
                        }
                        if(en.enemy.health > 0){
                            score += 10
                            en.enemy.wounded(index,isSuperBomb)
                        }
                        else{
                            if(en.enemy.className !== "normal"){
                               en.isAlive = "gift"
                               giftsArr.push(en.enemy)
                            }
                            else{
                                en.isAlive = "death"
                            }
                            en.enemy.clearEnemy()
                            en.enemy.clearBullet(index)
                            enemiesNumbers -= 1
                            score += 20
                            winner()
                        }
                        scoreDisplay.innerText = score
                        player.clearBullet(bullet, bulletIndex)
                    }
                   
                })
            })
        }
            
    }
    const winner = () => {
        if(enemies.every(en => en.isAlive !== "alive") &&  player.health > 0){
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
            player = null
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
                    player.createBullet(isSuperBomb)
                    if(!isSoundOff){
                    playerMissileSound.play()
                    }
                    player.missileNumbers -= 2
                    bombNumbersDisplay.innerText = player.missileNumbers
                    timer = setInterval(() => {
                        checkBulletSucceed()
                    },500)
                }
            }
            else if(player.missileNumbers < 1 && enemiesNumbers > 0){
                soundContainer.innerHTML = ""
                player.health = 100
                gameOver()
            }
        } 
    }
    const getFrequencyGifts = (arr,value) => {
        return arr.filter((v) => v === value).length
    }
    const getGifts = () => {
        if(giftsArr.length  > 0){
            giftsArr.map( (en,index) => {
                if((player.yPos  <= en.yPos + 32 ) && (en.xPos >= player.xPos && player.xPos + player.playerWidth >= en.xPos + 32)){
                
                    if(en.className === "health"){
                        healthContainer.innerHTML = ""
                        collectItemSound.play()
                        en.selectedEnemy.style.display = "none"
                        player.health += 20
                        collectedGifts.push('health')
                        healthPer.style.cssText="background-color:#00FF00;width:"+ player.health  + "%;"
                        giftsArr.splice(index,1)
                        let totalHealth = getFrequencyGifts(collectedGifts,'health')
                        const healthDiv = document.createElement('div')
                        const healthImgIcon = document.createElement('img')
                        healthImgIcon.className = "icon"
                        healthImgIcon.setAttribute('src','../assets/images/health.png')
                        healthDiv.appendChild(healthImgIcon)
                        const healthStats = document.createElement('span')
                        healthStats.className = "stats-content"
                        healthStats.innerText = "X" + totalHealth
                        healthDiv.appendChild(healthStats)
                        healthContainer.appendChild(healthDiv)
                        giftsContainer.appendChild(healthContainer)
                
                    }
                    else if(en.className === "shield"){
                        let shieldTime = 6
                        isShield = true
                        shieldContainer.innerHTML = ""
                        collectItemSound.play()
                        en.selectedEnemy.style.display = "none"
                        giftsArr.splice(index,1)
                        collectedGifts.push('shield')
                        let totalShield = getFrequencyGifts(collectedGifts,'shield')
                        const shieldDiv = document.createElement('div')
                        const shieldImgIcon = document.createElement('img')
                        const shieldTimerDiv = document.createElement('span')
                        shieldImgIcon.className = "icon"
                        shieldImgIcon.setAttribute('src','../assets/images/shield.png')
                        shieldDiv.appendChild(shieldImgIcon)
                        const shieldStats = document.createElement('span')
                        shieldStats.className = "stats-content"
                        shieldStats.innerText = "X" + totalShield
                        shieldDiv.appendChild(shieldStats)
                        shieldContainer.appendChild(shieldDiv)
                        shieldDiv.appendChild(shieldTimerDiv)
                        spaceShip.style.backgroundColor = "#84a9ac"
                        const shieldTimerId =  setInterval(()=>{
                            shieldTime -= 1
                            shieldTimerDiv.innerText = " " + shieldTime
                            spaceShip.style.backgroundColor = "#84a9ac"
                            spaceShip.style.opacity = 0.7

                        },1000)
                        setTimeout(() => {
                          clearInterval(shieldTimerId)
                          isShield = false
                          shieldTimerDiv.innerHTML = ""
                          spaceShip.style.backgroundColor = "transparent "
                          spaceShip.style.opacity = 1
                        },6000)
                       
                        giftsContainer.appendChild(shieldContainer)

                    }
                    else if(en.className === "ten-plus"){
                        tenPlusContainer.innerHTML = ""
                        collectItemSound.play()
                        player.missileNumbers += 10
                        bombNumbersDisplay.innerText = player.missileNumbers
                        en.selectedEnemy.style.display = "none"
                        giftsArr.splice(index,1)
                        collectedGifts.push('ten-plus')
                        
                        let totalTenPlus = getFrequencyGifts(collectedGifts,'ten-plus')
                        const tenPlusDiv= document.createElement('div')
                        const tenPlusImgIcon = document.createElement('img')
                        tenPlusImgIcon.className = "icon"
                        tenPlusImgIcon.setAttribute('src','../assets/images/ten-plus.png')
                        tenPlusDiv.appendChild(tenPlusImgIcon)
                        const tenPlusStats = document.createElement('span')
                        tenPlusStats.className = "stats-content"
                        tenPlusStats.innerText = "X" + totalTenPlus
                        tenPlusDiv.appendChild(tenPlusStats)
                        tenPlusContainer.appendChild(tenPlusDiv)
                        giftsContainer.appendChild(tenPlusContainer)
                        
                    }
                    else if(en.className === "super-bomb"){
                        let superBombTime = 6
                        isSuperBomb = true
                        superBombContainer.innerHTML = ""
                        collectItemSound.play()
                        en.selectedEnemy.style.display = "none"
                        giftsArr.splice(index,1)
                        collectedGifts.push('super-bomb')
                        let totalSuperBomb = getFrequencyGifts(collectedGifts,'super-bomb')
                        const superBombDiv= document.createElement('div')
                        const superBombImgIcon = document.createElement('img')
                        const superBombTimeDisplay = document.createElement('span')
                        superBombImgIcon.className = "icon"
                        superBombImgIcon.setAttribute('src','../assets/images/super-bomb.png')
                        superBombDiv.appendChild(superBombImgIcon)
                        const superbombStats = document.createElement('span')
                        superbombStats.className = "stats-content"
                        superbombStats.innerText = "X" + totalSuperBomb
                        superBombDiv.appendChild(superbombStats)
                        superBombContainer.appendChild(superBombDiv)
                        superBombDiv.appendChild(superBombTimeDisplay)
                        giftsContainer.appendChild(superBombContainer)
                        

                        const superBombTimerId =  setInterval(()=>{
                            superBombTime -= 1
                            superBombTimeDisplay.innerText = " " + superBombTime
                           
                        },1000)
                        setTimeout(() => {
                          clearInterval(superBombTimerId)
                          isSuperBomb = false
                          superBombTimeDisplay.innerHTML = ""
                        },6000)
                        
                    }
                }
            })
        }
        
    }
    const giftsTimer = setInterval(() => {
        getGifts()
    }, 200);
    const isSpaceShipTouchedAliens = () => {
        enemies.map(en => {
             if( (player.yPos  <= en.enemy.yPos + enemyHeight  ) 
             && (en.enemy.xPos <= player.xPos && player.xPos <= en.enemy.xPos + enemyWidth) && isShield === false ){
                if(en.isAlive === "alive"){
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
                    player.movesUpLeft()
                    isSpaceShipTouchedAliens()
                }
            }
            //When user press the right arrow key and up arrow key 
            else if( keysPressed[38] && keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightUpTimer)
                    player.movesUpRight()
                    isSpaceShipTouchedAliens()
                }
            }
            //When user press the left arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[37] ){
                if(!isPaused){
                    checkHitPossibilities(leftDownTimer)
                    player.movesDownLeft()
                    isSpaceShipTouchedAliens()
                } 
            }
            //When user press the right arrow key and down arrow key 
            else if( keysPressed[40] && keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightDownTimer)
                    player.movesDownRight()
                    isSpaceShipTouchedAliens()
                }
            }
            //When user press up arrow key 
            else if( keysPressed[38] ){
                if(!isPaused){
                    checkHitPossibilities(upTimer)
                    player.movesUp()
                    isSpaceShipTouchedAliens()
                }
            }
            //When user press down arrow key 
            else if( keysPressed[40] ){
                if(!isPaused){
                    checkHitPossibilities(downTimer)
                    player.movesDown()
                    isSpaceShipTouchedAliens()
                   
                    
                }
            }
            //When user press left  arrow key 
            else if( keysPressed[37] ){
                if(!isPaused){
                    checkHitPossibilities(leftTimer)
                    player.movesLeft()
                    isSpaceShipTouchedAliens()
                    
                    
                }
            }
            //When user press right arrow key 
            else if( keysPressed[39] ){
                if(!isPaused){
                    checkHitPossibilities(rightTimer)
                    player.movesRight()
                    isSpaceShipTouchedAliens()
                  
                    
                }
            }
           //When user press  the space-bar key
            else if (keysPressed[32] ){
                if(!isPaused){
                    checkHitPossibilities(spaceBarTimer)
                    isSpaceShipTouchedAliens()
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
