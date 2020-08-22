class SpaceShip{
    constructor(xPos, yPos, health, selectedPlayer){
        this.xPos = xPos
        this.yPos = yPos
        this.selectedPlayer = selectedPlayer
        this.health = health
    }
    // When Spaceship moves left
    movesLeft(){
      if( this.xPos > 5){
        this.xPos -= 5
        this.selectedPlayer.style.left = this.xPos + "px" 
      }else{
        this.xPos = 5
        this.selectedPlayer.style.left = this.xPos + "px" 
      }
    }
    // When Spaceship moves right
    movesRight(){
        console.log(this.xPos)
      if( this.xPos < 1285 ){
        this.xPos += 5
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
        this.selectedPlayer.style.top = this.yPos + "px"
      }else{
        this.yPos = 5
        this.selectedPlayer.style.top = this.yPos + "px"
      }
     
    }
    movesUpLeft(){
        if( this.yPos > 5   && this.xPos > 5 ){

            this.yPos -= 5
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
    //When Spaceship fire its gun.
    fireBullet(){

    }
}