class SpaceShip{
    constructor(xPos, yPos, health, selectedPlayer, gameBoard){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedPlayer = selectedPlayer
        this.health = health
        this.gameBoard = gameBoard
        this.bulletPos = []
    }
    // When Spaceship moves left
    movesLeft(){
      if( this.xPos > 5){
        this.xPos -= 5
        this.bulletXPosLeft -= 5
        this.bulletXPosRight -= 5 
        this.selectedPlayer.style.left = this.xPos + "px" 
      }else{
        this.xPos = 5

        this.selectedPlayer.style.left = this.xPos + "px" 
      }
    }
    // When Spaceship moves right
    movesRight(){
        
      if( this.xPos < 1285 ){
        this.xPos += 5
        this.bulletXPosLeft += 5
        this.bulletXPosRight += 5 
        this.selectedPlayer.style.left = this.xPos + "px" 
      }else{
        this.xPos = 1285
        this.selectedPlayer.style.left = this.xPos + "px"  
      }
     
    }
    // When Spaceship moves down
    movesDown(){
       if( this.yPos < 720 ){
        this.yPos += 5
        this.bulletYPos += 5
        this.selectedPlayer.style.top = this.yPos + "px" 
       }else{
        this.yPos = 720
        this.selectedPlayer.style.top = this.yPos + "px" 
       }
      
    }
    // When Spaceship moves up
    movesUp(){
      if( this.yPos > 5 ){
        this.yPos -= 5
        this.bulletYPos -= 5
        this.selectedPlayer.style.top = this.yPos + "px"
      }else{
        this.yPos = 5
        this.selectedPlayer.style.top = this.yPos + "px"
      }
     
    }
    // When Spaceship moves up-left 
    movesUpLeft(){
        if( this.yPos > 5   && this.xPos > 5 ){

            this.yPos -= 5
            this.bulletYPos -= 5
            this.bulletXPosLeft -= 5
            this.bulletXPosRight -= 5 
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos -= 5
            this.selectedPlayer.style.left = this.xPos + "px"
        }
        else if(this.yPos > 5 && this.xPos < 5){

            this.yPos -= 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos = 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if( this.yPos < 5 && this.xPos > 5){
            this.yPos = 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos -= 5
            this.selectedPlayer.style.left = this.xPos + "px"
        }
        else if( this.yPos < 5 && this.xPos < 5 ){
            this.xPos = 5
            this.selectedPlayer.style.left = this.xPos + "px" 
            this.yPos = 5
            this.selectedPlayer.style.top = this.yPos + "px"
        }
    }
    // When Spaceship moves up-right
    movesUpRight(){

        if( this.yPos > 5 && this.xPos < 1285  ){
            this.yPos -= 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos += 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if( this.yPos > 5 && this.xPos > 1285 ){
            this.yPos -= 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos = 1285
            this.selectedPlayer.style.left = this.xPos + "px"  
        }
        else if( this.yPos < 5 && this.xPos < 1285 ){
            this.yPos = 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos += 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if( this.yPos < 5 && this.xPos > 1285 ){
            this.yPos = 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos = 1285
            this.selectedPlayer.style.left = this.xPos + "px"  
          }
    }
    // When Spaceship moves down-left
    movesDownLeft(){
        if( this.yPos < 720 && this.xPos > 5 ){
            this.xPos -= 5
            this.selectedPlayer.style.left = this.xPos + "px" 
            this.yPos += 5
            this.selectedPlayer.style.top = this.yPos + "px" 
        }
        else if(this.yPos < 720 && this.xPos < 5){
            this.yPos += 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos = 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if(this.yPos > 720 && this.xPos > 5){

            this.yPos = 720
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos -= 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if( this.yPos > 720 && this.xPos < 5){
            this.xPos = 5
            this.selectedPlayer.style.left = this.xPos + "px" 
            this.yPos = 720
            this.selectedPlayer.style.top = this.yPos + "px" 
        }
    }
    // When Spaceship moves down-right
    movesDownRight(){
        if( this.yPos < 720 &&  this.xPos < 1285  ){
            this.yPos += 5
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos += 5
            this.selectedPlayer.style.left = this.xPos + "px" 
        }
        else if( this.yPos < 720 &&  this.xPos > 1285 ){
            this.xPos = 1285
            this.selectedPlayer.style.left = this.xPos + "px"
            this.yPos += 5
            this.selectedPlayer.style.top = this.yPos + "px"
            
        }
        else if( this.yPos > 720 &&  this.xPos < 1285 ){
            this.xPos += 5
            this.selectedPlayer.style.left = this.xPos + "px"
            this.yPos = 720
            this.selectedPlayer.style.top = this.yPos + "px"
        }
        else if( this.yPos > 720 && this.xPos > 1285 ){
            this.yPos = 720
            this.selectedPlayer.style.top = this.yPos + "px"
            this.xPos = 1285
            this.selectedPlayer.style.left = this.xPos + "px"  
        }
    }
    createBullet(){
      const  leftMissile = document.createElement('div')
      const  rightMissile = document.createElement('div')
      let leftX = this.xPos + 1
      let rightX = this.xPos + 110
      let yPos = this.yPos + 15
      leftMissile.style.cssText="width:32px;height:32px;background-image:url('/images/bullet.png');background-size:cover;top:"+yPos+"px;left:"+leftX+"px;position:absolute;"
      rightMissile.style.cssText="width:32px;height:32px;background-image:url('/images/bullet.png');background-size:cover;top:"+yPos+"px;left:"+rightX+"px;position:absolute;"
      const leftBullet = new Bullet(leftX, yPos, leftMissile)
      const rightBullet = new Bullet(rightX, yPos, rightMissile)
      this.bulletPos.push(rightBullet)
      this.bulletPos.push(leftBullet)
      this.gameBoard.appendChild(leftMissile)
      this.gameBoard.appendChild(rightMissile)
     
    }
    //When Spaceship fire its gun.
    fireBullet(){
        this.bulletPos.map(bul => {
            
            bul.moveUp()
           
        })
       return this.bulletPos
    }
    clearBullet(bullet, index){
        console.log(bullet)
        console.log(this.bulletPos.length)
        this.bulletPos.splice(index, 1)
        console.log(this.bulletPos.length)
        bullet.targetElement.style.display="none"
        
       
       
    }
}