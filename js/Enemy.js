class Enemy{
    constructor(xPos, yPos,health,selectedEnemy, gameBoard){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedEnemy = selectedEnemy
        this.health = health
        this.bulletPos = []
        this.gameBoard = gameBoard
    }
     // When Spaceship moves left
     movesLeft(){
        if(this.xPos > 5 ){

            this.xPos -= 5
            this.selectedEnemy.style.left = this.xPos + "px" 
        }else{
            this.xPos = 5
            this.selectedEnemy.style.left = this.xPos + "px" 
        }
    }
    // When Spaceship moves right
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
        console.log(xPos, yPos)
        bullet.style.cssText="width:32px;height:32px;background-image:url('/images/enemy-bullet.png');background-size:cover;left:"+xPos+"px;top:"+yPos+"px;position:absolute;"
        const enemyBullet = new Bullet(xPos, yPos, bullet )
        this.bulletPos.push(enemyBullet)
        this.selectedEnemy.appendChild(bullet)

    }
    fireBullet(){
        this.bulletPos.map(bul => {
            bul.moveDown()
            
        })

    }
}