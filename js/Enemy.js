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
    wounded(index,isSuperBomb){
        console.log(this.selectedEnemy.className)
        let woundPer 
        if(isSuperBomb){
            woundPer -= 100 
        }
        else{
            woundPer = 50
        }
        if(this.selectedEnemy.className === 'normal'){
            this.health -= woundPer
            this.selectedEnemy.style.backgroundImage = "url('/assets/images/wound-enemy.png')"
        }
        else{
            this.health -= woundPer - 30
            this.opacity -= 0.1
            this.selectedEnemy.style.opacity = this.opacity
        }
     
    }
    clearEnemy(){
        if(this.className === 'normal'){
            this.selectedEnemy.style.display = "none"
        }
        else{
            this.opacity = 1
            this.selectedEnemy.style.opacity = this.opacity
            if(this.className === "shield"){
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/shield.png')"
                this.selectedEnemy.style.width = "32px"
                this.selectedEnemy.style.height = "32px"
                
            }
            else if(this.className === "health"){
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/health.png')"
                this.selectedEnemy.style.width = "32px"
                this.selectedEnemy.style.height = "32px"
               
            }
            else if(this.className === "super-bomb"){
                this.selectedEnemy.style.width = "32px"
                this.selectedEnemy.style.height = "32px"
                this.selectedEnemy.style.backgroundImage = "url('/assets/images/super-bomb.png')"
               
            }
            else if(this.className === "ten-plus"){
                this.selectedEnemy.style.background = "none"
                this.selectedEnemy.style.width = "32px"
                this.selectedEnemy.style.height = "32px"
                this.selectedEnemy.style.color = "#ffa931"
                this.selectedEnemy.innerText = "+10"
                this.selectedEnemy.style.backgroundRepeat = "no-repeat"
                this.selectedEnemy.style.fontSize = "1.4em"
              
            }
            setInterval( () => {
                
                this.yPos += 10
                this.selectedEnemy.style.top = this.yPos + "px"
            }, 1000);
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