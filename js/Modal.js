class Modal{
    constructor(title, result, color, mainTarget, score, health, bombNumbers, btnContext){
        this.title = title
        this.result = result
        this.color = color
        this.mainTarget = mainTarget
        this.score = score
        this.health = health
        this.bombNumbers = bombNumbers
        this.btnContext = btnContext
        
    }
    createModal(){
        const mainContainer = document.createElement('div')

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
        healthScore.innerText = "Health: " + this.health
        healthItem.appendChild(healthScore)
        listContainer.appendChild(healthItem)

        const scoreItem = document.createElement('li')
        const scoreIcon  = document.createElement('img')
        scoreIcon.setAttribute('src','/assets/images/explosion.png')
        scoreIcon.className = "icon"
        const scoreDisplay = document.createElement('p')
        scoreDisplay.innerText = "Score: " + this.score
        scoreItem.appendChild(scoreIcon)
        scoreItem.appendChild(scoreDisplay)
        listContainer.appendChild(scoreItem)

        const missileItem = document.createElement('li')
        const missileIcon  = document.createElement('img')
        const missileScore = document.createElement('p')
        const modalBtn= document.createElement('button')
        missileIcon.setAttribute('src','/assets/images/explosion.png')
        missileIcon.className = "icon"
        missileScore.innerText = "Bombs: " + this.bombNumbers
        modalBtn.style.margin = "auto"
        modalBtn.innerText = this.btnContext
        missileItem.appendChild(missileIcon)
        missileItem.appendChild(scoreDisplay)
        listContainer.appendChild(missileItem)
        contentContainer.appendChild(listContainer)
        contentContainer.appendChild(modalBtn)
        
    }

}