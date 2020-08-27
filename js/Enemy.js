class Enemy{
    constructor(xPos, yPos, health, selectedEnemy, gameBoard, eId, className){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedEnemy = selectedEnemy
        this.health = health
        this.bulletPos = []
        this.gameBoard = gameBoard
        this.eId = eId
        this.className = className
        this.opacity = 1
    }
     // When Enemy moves left
     movesLeft(){
        if(this.xPos > 5 ){
            this.xPos -= 5
            this.selectedEnemy.style.left = this.xPos + "px" 
        }else{
            this.xPos = 5
            this.selectedEnemy.style.left = this.xPos + "px" 
        }
    }
    // When Enemy moves right
    movesRight(){
        if( this.xPos < 1135 ){

            this.xPos += 5
            this.selectedEnemy.style.left = this.xPos + "px" 
        }else{

            this.xPos = 1135
            this.selectedEnemy.style.left = this.xPos + "px"  
        }
    }
     // When Spaceship moves down
     movesDown(){
        if( this.yPos < 720 ){
            this.yPos += 5
            this.selectedEnemy.style.top = this.yPos + "px" 
        }else{
            this.yPos = 720
            this.selectedEnemy.style.top = this.yPos + "px" 
        }
    }
    createBullet(xPos, yPos){
        const bullet = document.createElement('div')
        bullet.classList.add('enemy-bullet')
        let xBullet = xPos + 16
        let yBullet = yPos + 32
        bullet.style.cssText="width:32px;height:32px;background-image:url('/assets/images/enemy-bullet.png');background-size:cover;left:"+ xBullet +"px;top:"+ yBullet +"px;position:absolute;"
        const enemyBullet = new Bullet(xBullet, yBullet, bullet )
        this.bulletPos.push(enemyBullet)
        this.gameBoard.appendChild(bullet)

    }
    fireBullet(){
        this.bulletPos.map(bul => {
            bul.moveDown()
            
        })

    }
    wounded(index){
        console.log(this.selectedEnemy.className)
        if(this.selectedEnemy.className === 'normal'){
            this.health -= 50
            this.selectedEnemy.style.backgroundImage = "url('/assets/images/wound-enemy.png')"
        }
        else{
            this.health -= 30
            this.opacity -= 0.1
            this.selectedEnemy.style.opacity = this.opacity
        }
     
    }
    clearEnemy(){
        "health","shield","ten-plus","super-bomb"
        if(this.selectedEnemy.className === 'normal'){
            this.selectedEnemy.style.display = "none"
        }
        else{
            this.opacity = 1
            this.selectedEnemy.style.opacity = this.opacity
            if(this.selectedEnemy.className === "shield"){
                this.selectedEnemy.style.width = "36px"
                this.selectedEnemy.style.height  ="36px"
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/shield.png')"
            }
            else if(this.selectedEnemy.className === "health"){
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/health.png')"
                this.selectedEnemy.style.width = "36px"
                this.selectedEnemy.style.height  ="36px"
            }
            else if(this.selectedEnemy.className === "super-bomb"){
                this.selectedEnemy.style.width = "36px"
                this.selectedEnemy.style.height  ="36px"
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/super-bomb.png')"
            }
            else if(this.selectedEnemy.className === "ten-plus"){
                this.selectedEnemy.style.background = "none"
                this.selectedEnemy.style.color = "#ffa931"
                this.selectedEnemy.innerText = "+10"
                this.selectedEnemy.style.width = "36px"
                this.selectedEnemy.style.height  ="36px"
                this.selectedEnemy.style.fontSize = "1.4em"
              
            }
            setInterval( () => {
                console.log('ad') 
                this.yPos += 10
                this.selectedEnemy.style.top += this.yPos + "px" 

            }, 800);
        }
      

    }
    clearBullet(index){
       this.bulletPos.splice(index, 1)
       
    }
    stopBullets(){
        this.bulletPos.map(bul => {
            bul.moveNot()
        })
    }
}