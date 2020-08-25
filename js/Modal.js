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
        titleContainer.style.textAlign = "center"
        const modalTitle = document.createElement('h2')
        modalTitle.innerText =  this.title
        modalTitle.className = "modal-title"
        titleContainer.style.padding = "5px"
        titleContainer.appendChild(modalTitle)
        mainContainer.appendChild(titleContainer)

        const contentContainer = document.createElement('div')
        contentContainer.className = "modal-content-container"
        contentContainer.style.padding = "5px"
        const resultContent = document.createElement('p')
        resultContent.innerText = "You are a" + this.result + "."
        contentContainer.appendChild(resultContent)

        const listContainer = document.createElement('ul')

        const healthItem = document.createElement('li')
        const healthIcon  = document.createElement('img')
        healthIcon.setAttribute('src','/assets/images/heartbeat.png')
        healthIcon.className = "heart-icon"
        healthItem.appendChild(healthIcon)
        const healthScore = document.createElement('p')
        healthScore.innerText = "Health: " + this.health + "X" + 5
        healthItem.appendChild(healthScore)
        listContainer.appendChild(healthItem)

        const scoreItem = document.createElement('li')
        const scoreIcon  = document.createElement('img')
        scoreIcon.setAttribute('src','/assets/images/explosion.png')
        scoreIcon.className = "icon"
        const scoreDisplay = document.createElement('p')
        scoreDisplay.innerText = "Score: " + this.score + "X" + 5
        scoreItem.appendChild(scoreIcon)
        scoreItem.appendChild(scoreDisplay)
        listContainer.appendChild(scoreItem)

        const missileItem = document.createElement('li')
        const missileIcon  = document.createElement('img')
        const missileScore = document.createElement('p')
        const modalBtn= document.createElement('button')
        const modalTotalScore = document.createElement('div')
        missileIcon.setAttribute('src','/assets/images/explosion.png')
        missileIcon.className = "icon"
        missileScore.innerText = "Bombs: " + this.bombNumbers + "X" + 5
        let totalScore = this.score * 5 + this.health * 5 + this.bombNumbers * 5
        modalTotalScore.innerText = totalScore
        modalTotalScore.style.borderTop = "2px solid red"
        modalTotalScore.style.borderBottom = "2px solid red"
        modalBtn.style.cssText = "margin:auto;width:120px;height:40px;"
        modalBtn.style.backgroundColor = this.color
        modalBtn.innerText = this.btnContext
        modalBtn.id = this.btnId
        missileItem.appendChild(missileIcon)
        missileItem.appendChild(scoreDisplay)
        listContainer.appendChild(missileItem)
        contentContainer.appendChild(listContainer)
        contentContainer.appendChild(modalTotalScore)
        contentContainer.appendChild(modalBtn)
        mainContainer.appendChild(contentContainer)
        
    }

}