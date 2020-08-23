class Bullet {
    constructor(x, y, targetElement){
        this.x = x
        this.y = y
        this.targetElement = targetElement

    }
    moveUp(){
      this.y -= 10
      this.targetElement.style.top = this.y + "px"

    }
    moveDown(){
        this.targetElement.style.left = this.x + "px"
        this.y += 10
        this.targetElement.style.top = this.y + "px"
    }
}