class Modal{
    constructor(title, result, color, mainTarget, score, health, bombNumbers, btnContext, btnId, modalId){
        this.title = title
        this.result = result
        this.color = color
        this.mainTarget = mainTarget
        this.score = score
        this.health = health
        this.bombNumbers = bombNumbers
        this.btnContext = btnContext
        this.btnId = btnId
        this.modalId = modalId
        
        
    }
    createModal(){
        const mainContainer = document.createElement('div')
        mainContainer.id = this.modalId
        const titleContainer = document.createElement('div')
        titleContainer.style.cssText = "text-align:center;padding;10px;background-color:" + this.color + ";color:white;font-size:1.7em;"
        const modalTitle = document.createElement('h2')
        modalTitle.innerText =  this.title
        modalTitle.className = "modal-title"
        titleContainer.appendChild(modalTitle)
        mainContainer.appendChild(titleContainer)

        const contentContainer = document.createElement('div')
        contentContainer.className = "modal-content-container"
        contentContainer.style.padding = "10px"
        const resultContent = document.createElement('p')
        resultContent.innerText = "You are a " + this.result + "."
        resultContent.style.cssText = "text-align:center;font-size:1.5em;"
        contentContainer.appendChild(resultContent)

        const listContainer = document.createElement('div')
        listContainer.style.cssText = "width:100%;display:flex;flex-direction:column;font-size:1.2em;"
        const healthItem = document.createElement('div')
        healthItem.style.cssText = "display:flex;justify-content:flex-start;;align-items:center;padding:1em;text-align:left;"
        const healthIcon  = document.createElement('img')
        healthIcon.setAttribute('src','/assets/images/heartbeat.png')
        healthIcon.style.cssText = "width:43px;height:43px;margin:0.8em;"
        healthItem.appendChild(healthIcon)
        const healthScore = document.createElement('p')
        healthScore.innerText = "Health: " + 5 + " X " + this.health 
        healthItem.appendChild(healthScore)
        listContainer.appendChild(healthItem)

        const scoreItem = document.createElement('div')
        scoreItem.style.cssText = "display:flex;justify-content:flex-start;;align-items:center;padding:1em;position:relative;right:0.8vw;text-align:left;"
        const scoreIcon  = document.createElement('img')
        scoreIcon.setAttribute('src','/assets/images/explosion.png')
        scoreIcon.style.cssText = "width:41px;height:41px;margin:0.8em;"
        const scoreDisplay = document.createElement('p')
        scoreDisplay.innerText = "Score: " + 5 + " X "  + this.score 
        scoreItem.appendChild(scoreIcon)
        scoreItem.appendChild(scoreDisplay)
        listContainer.appendChild(scoreItem)

        const missileItem = document.createElement('div')
        missileItem.style.cssText = "display:flex;justify-content:flex-start;align-items:center;padding:1em;position:relative;right:0.6vw;text-align:left;"
        const missileIcon  = document.createElement('img')
        missileIcon.style.cssText = "width:43px;height:43px;margin:0.8em;"
        const missileScore = document.createElement('p')
        const modalBtn= document.createElement('button')
        const modalTotalScore = document.createElement('div')

        missileIcon.setAttribute('src','/assets/images/bullet.png') 
        missileScore.innerText = "Bombs: " + 5 + " X "+  this.bombNumbers
        missileItem.appendChild(missileIcon)
        missileItem.appendChild(missileScore)
        let totalScore = this.score * 5 + this.health * 5 + this.bombNumbers * 5
        modalTotalScore.style.cssText = "text-align:center;font-size:1.3em;border-bottom:2px solid red;border-top:2px solid red;"
        modalTotalScore.innerText = "Total Score: " +totalScore
        modalBtn.style.cssText = "margin:1.4em auto;width:120px;height:40px;color:white;text-align:center;position:relative;left:8.3vw;cursor:pointer;"
        modalBtn.style.backgroundColor = this.color
        modalBtn.innerText = this.btnContext
        modalBtn.id = this.btnId
        modalBtn.className = "modal-btn"
        
        listContainer.appendChild(missileItem)
        contentContainer.appendChild(listContainer)
        contentContainer.appendChild(modalTotalScore)
        contentContainer.appendChild(modalBtn)
        mainContainer.appendChild(contentContainer)
        this.mainTarget.appendChild(mainContainer)
        this.mainTarget.display = "block"

       return  modalBtn
        
    }
    closeModal(){
        this.mainTarget.innerHTML = ""
        this.mainTarget.display = "none"
    
    }
    
    

}