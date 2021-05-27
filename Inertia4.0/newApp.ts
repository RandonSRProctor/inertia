import { VirtualPool } from './PoolModel.js'
import { Action } from './Action.js'
import { VirtualSquare } from './VirtualSquare.js'

document.addEventListener('DOMContentLoaded', () => {


    
    



    let speedOfTime = 1000
    let presentTime = 0
    let stopTime = false
    let domPoolArray: any[]  = Array.from(document.querySelectorAll('.poolContainer div'))
    let timeInterval = setInterval(moveTimeForward, speedOfTime)
    let isDark = false


    assignEventListenerToTimeToggleButton()

    let virtualPool: VirtualPool = new VirtualPool(domPoolArray)

    console.log(virtualPool)

    assignEventListenersToSquares()





    

    function moveTimeForward() {
        console.log(virtualPool.state)
        const arrayOfAllActions = getAllActionsFromVirtualPoolState(virtualPool)

        virtualPool.applyActions(arrayOfAllActions)

        updateDOMSquaresArray(virtualPool)

        if (stopTime === true) clearInterval(timeInterval)
        presentTime++
        console.log(`It is ${presentTime}`)
    }

    



// Pure Functions!

function getAllActionsFromVirtualPoolState(providedVirtualPool: VirtualPool) {
    let arrayOfAllActions: Action[] = []

    for(let i = 0 ; i < providedVirtualPool.state.length ; i++) {
        const arrayOfActionsToBeAdded = determineEffectOfWork(providedVirtualPool.state[i])
        arrayOfAllActions = [...arrayOfAllActions, ...arrayOfActionsToBeAdded]
    }

    return arrayOfAllActions
}

function determineEffectOfWork (virtualSquare: VirtualSquare) {

    // Needs logic for leftmost and rightmost edgecases

    let arrayOfResultingActions: Action[] = []

        arrayOfResultingActions.push({
                ...virtualSquare,
                type: 'DEDUCT',
            })

    //Check for edgecases
    if (virtualSquare.index !== 0 && virtualSquare.index !== virtualPool.state.length - 1) {
        
        //push force to left
        arrayOfResultingActions.push({
            index: virtualSquare.index - 1,
            type: 'INCREMENT',
            forceMovingLeft: virtualSquare.forceMovingLeft, //Might cause NaN or other math error!
            forceMovingRight: 0
        })

        //push force to right
        arrayOfResultingActions.push({
            index: virtualSquare.index + 1,
            type: 'INCREMENT',
            forceMovingRight: virtualSquare.forceMovingRight, //Might case NaN or other math error!
            forceMovingLeft: 0
        })
    }

    return arrayOfResultingActions
}




// DOM Manipulation

function assignEventListenersToSquares() {
    for (let i = 0 ; i < domPoolArray.length ; i++) {
        domPoolArray[i].addEventListener('click', () => {
            console.log(virtualPool.state)
            virtualPool.state[i].forceMovingLeft = 255
            virtualPool.state[i].forceMovingRight = 255
        })
    }
}

function updateDOMSquaresArray(virtualPoolProvided: VirtualPool) {
    for (let i = 0 ; i < virtualPoolProvided.state.length ; i++) {

        const virtualSquare = virtualPoolProvided.state[i]
        const domSquare = domPoolArray[i]
        
        // if (virtualSquare.color === 'blue') {
        //     domSquare.style.backgroundColor = 'blue'
        // }
        
        domSquare.style.borderLeft = `solid 5px rgb(${Math.abs(virtualSquare.forceMovingLeft - 255)},${Math.abs(virtualSquare.forceMovingLeft - 255)},255)`
        domSquare.style.borderRight = `solid 5px rgb(${Math.abs(virtualSquare.forceMovingRight - 255)},${Math.abs(virtualSquare.forceMovingRight - 255)},255)`
    }
}



function assignEventListenerToTimeToggleButton() {



        let timeToggleButton: HTMLButtonElement | null = document.querySelector('.timeToggle')

    
        timeToggleButton?.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLButtonElement
            if (stopTime === false) {
                stopTime = true
                if (timeToggleButton) 
                    {timeToggleButton.innerHTML = 'Unfreeze Time'}
                if (target) {
                    target.style.backgroundColor = 'lightskyblue'
                }
                console.log('You have stopped time.  Are you a wizard?')
            } else {
                stopTime = false
                timeInterval = setInterval(moveTimeForward, speedOfTime)
                if (timeToggleButton) {
                    timeToggleButton.innerHTML = 'Freeze Time'
                }
                if (target) {
                    target.style.backgroundColor = 'white'
                }
                console.log('Time has started again!')
            }
        })

    


    
}


})