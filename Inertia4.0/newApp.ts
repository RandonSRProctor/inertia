import { VirtualPool } from './PoolModel.js'
import { Action } from './Action.js'
import { VirtualSquare } from './VirtualSquare.js'

document.addEventListener('DOMContentLoaded', () => {


    
    



    let speedOfTime = 55
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

    // Currently all collisions are perfectly elastic
    // I am aware that this section needs to be dramatically optimized, but I needed to get it funcitonal first!

    let arrayOfResultingActions: Action[] = []

    // Force Transfer Values
    const forceTransfered = .85
    const forceRecoiled = .15

    // Remove previous state of force

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
            forceMovingLeft: Math.floor(virtualSquare.forceMovingLeft * forceTransfered),
            forceMovingRight: 0
        })

        //recoil from force push to left
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: 0,
            forceMovingRight: Math.floor(virtualSquare.forceMovingLeft * forceRecoiled)
        })

        //push force to right
        arrayOfResultingActions.push({
            index: virtualSquare.index + 1,
            type: 'INCREMENT',
            forceMovingLeft: 0,
            forceMovingRight: Math.floor(virtualSquare.forceMovingRight * forceTransfered)
        })

        //recoil from force push to right
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: Math.floor(virtualSquare.forceMovingRight * forceRecoiled),
            forceMovingRight: 0
        })
    }

    // Edge Cases
    // In current version it is assumed that all water Squares/Molecules have equal elasticity
    // Edge Cases are treating the first and last div like their boundaries have different elasticites
    // In much much much later interations I will let each square/molecule have a predetermined elasticity
    // and part of the application of work will require an elasticity check of the molecule that work is being acted on
    // (If I ever get that far I will probably have degree in physics :-P)
    
    
    
    if (virtualSquare.index === 0) {

        //recoil from force push to left (Stronger due to stability of wall)
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: 0,
            forceMovingRight: Math.floor(virtualSquare.forceMovingLeft * forceTransfered)
        })

        //push force to right
        arrayOfResultingActions.push({
            index: virtualSquare.index + 1,
            type: 'INCREMENT',
            forceMovingLeft: 0,
            forceMovingRight: Math.floor(virtualSquare.forceMovingRight * forceTransfered)
        })

        //recoil from force push to right
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: Math.floor(virtualSquare.forceMovingRight * forceRecoiled),
            forceMovingRight: 0
        })
    }


    if (virtualSquare.index === virtualPool.state.length - 1) {

        //recoil from force push to right (Stronger due to stability of wall)
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: Math.floor(virtualSquare.forceMovingRight * forceTransfered),
            forceMovingRight: 0
        })

        //push force to left
        arrayOfResultingActions.push({
            index: virtualSquare.index - 1,
            type: 'INCREMENT',
            forceMovingLeft: Math.floor(virtualSquare.forceMovingLeft * forceTransfered),
            forceMovingRight: 0
        })

        //recoil from force push to left
        arrayOfResultingActions.push({
            index: virtualSquare.index,
            type: 'INCREMENT',
            forceMovingLeft: 0,
            forceMovingRight: Math.floor(virtualSquare.forceMovingLeft * forceRecoiled)
        })

    }



    return arrayOfResultingActions
}




// DOM Manipulation

function assignEventListenersToSquares() {
    for (let i = 0 ; i < domPoolArray.length ; i++) {
        domPoolArray[i].addEventListener(
            'click', ({target}: {target: HTMLDivElement}) => {
                console.log(virtualPool.state)
                
                virtualPool.state[i].forceMovingRight = 255
                if ( i > 1 ) virtualPool.state[i-1].forceMovingRight = 128
                if ( i > 2 ) virtualPool.state[i-2].forceMovingRight = 64

                virtualPool.state[i].forceMovingLeft = 255
                if ( i < domPoolArray.length - 2 ) virtualPool.state[i+1].forceMovingLeft = 128
                if ( i < domPoolArray.length - 3 ) virtualPool.state[i+2].forceMovingLeft = 64
                
                if (target) {
                    target.style.backgroundColor = 'rgb(0,0,255)'
                }
            }
        )
    }
}

function updateDOMSquaresArray(virtualPoolProvided: VirtualPool) {
    for (let i = 0 ; i < virtualPoolProvided.state.length ; i++) {

        const virtualSquare = virtualPoolProvided.state[i]
        const domSquare = domPoolArray[i]
        
        // DO NOT ERASE.  THIS IS IF I WANT TO PURSUE BORDERS AGAIN

        // if (Math.abs(virtualSquare.forceMovingLeft - 255) < 200) {
        //     domSquare.style.borderLeft = `solid 1px rgb(${Math.abs(virtualSquare.forceMovingLeft - 255) - 50},${Math.abs(virtualSquare.forceMovingLeft - 255) - 50},255)`
        // } else {
        //     domSquare.style.borderLeft = 'none'
        // }
        
        // if (Math.abs(virtualSquare.forceMovingRight - 255) < 200) {
        //     domSquare.style.borderRight = `solid 1px rgb(${Math.abs(virtualSquare.forceMovingRight - 255) - 50},${Math.abs(virtualSquare.forceMovingRight - 255) - 50},255)`
        // } else {
        //     domSquare.style.borderRight = 'none'
        // }
        
    
        const highestForce = Math.max(virtualSquare.forceMovingLeft, virtualSquare.forceMovingRight)
        domSquare.style.backgroundColor = `rgb(${Math.abs(highestForce - 255)},${Math.abs(highestForce - 255)},255)`
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


// TO DO:

// - Add a toggle to increase the "tail".  Each increase will "fatten" the initial touch 

// - UX: Test the event trigger being on the down click

// - Clean the damn code up, homie 

// - Add an "infinite" button that will 

// - Add a "confetti" mode 

// - Have force trigger a div movement to simulate 3D

// - Add a resolution toggle (Will need to populate html divs with JS to do that)

// - Add a Speed toggle