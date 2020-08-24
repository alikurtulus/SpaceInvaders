class Enemy{
    constructor(xPos, yPos, health, selectedEnemy, gameBoard){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedEnemy = selectedEnemy
        this.health = health
        this.bulletPos = []
        this.gameBoard = gameBoard
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
        bullet.style.cssText="width:32px;height:32px;background-image:url('/images/enemy-bullet.png');background-size:cover;left:"+ xBullet +"px;top:"+ yBullet +"px;position:absolute;"
        const enemyBullet = new Bullet(xBullet, yBullet, bullet )
        this.bulletPos.push(enemyBullet)
        this.gameBoard.appendChild(bullet)

    }
    fireBullet(){
        this.bulletPos.map(bul => {
            bul.moveDown()
            
        })

    }
    wounded(){
        this.health -= 50
        this.selectedEnemy.style.backgroundImage = "url('/images/wound-enemy.png')"
    }
    clearEnemy(){
        this.selectedEnemy.style.display = "none"

    }
    clearBullet(index){
       this.bulletPos.splice(index, 1)
       
    }
}