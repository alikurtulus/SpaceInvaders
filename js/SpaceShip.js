class SpaceShip{
    constructor(xPos, yPos, health, selectedPlayer){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedPlayer = selectedPlayer
        this.health = health
    }
    // When Spaceship moves left
    movesLeft(){
      if(this.xPos > 5){
        this.xPos -= 5
        this.selectedPlayer.style.left = this.xPos + "px" 
      }else{
        this.xPos = 5
        this.selectedPlayer.style.left = this.xPos + "px" 
      }
     
    }
    // When Spaceship moves right
    movesRight(){
      if(this.xPos < 970 ){
        this.xPos += 5
        this.selectedPlayer.style.left = this.xPos + "px" 
      }else{
        this.xPos = 970
        this.selectedPlayer.style.left = this.xPos + "px"  
      }
     
    }
    // When Spaceship moves down
    movesDown(){
       if(this.yPos < 720){
        this.yPos += 5
        this.selectedPlayer.style.top = this.yPos + "px" 
       }else{
        this.yPos = 720
        this.selectedPlayer.style.top = this.yPos + "px" 
       }
      
    }
    // When Spaceship moves up
    movesUp(){
      if(this.yPos > 5){
        this.yPos -= 5
        this.selectedPlayer.style.top = this.yPos + "px"
      }else{
        this.yPos = 5
        this.selectedPlayer.style.top = this.yPos + "px"
      }
     
    }
    //When Spaceship fire its gun.
    fireBullet(){

    }
}