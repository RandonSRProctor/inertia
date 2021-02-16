document.addEventListener('DOMContentLoaded', () => {

    let speedOfTime = 25
    let presentTime = 0
    let stopTime = false
    let squares = Array.from(document.querySelectorAll('.poolContainer div'))
    let timeInterval = setInterval(moveTimeForward, speedOfTime)

    initializeSquares()
    assignAllEventListeners()

    function moveTimeForward() {

        announceBeginningOfCycle()
        
        for (let index = 0 ; index < squares.length ; index++) {

            const currentSquare = squares[index]
            const squareToTheLeft = squares[index-1]
            const squareToTheRight = squares[index+1]

            const leftEdgeCase = 0
            const rightEdgeCase = squares.length - 1

            
            if (currentSquare.momentum === 'outward' && 
                currentSquare.isDone   ===  false) {

                if (index === leftEdgeCase && currentSquare.isDone === false) {
                    pushRight(squareToTheRight)
                    settleSquare(currentSquare)
                }
                else if (index === rightEdgeCase && currentSquare.isDone === false ) {
                    pushLeft(squareToTheLeft)
                    settleSquare(currentSquare)
                }
                else {
                    pushLeft(squareToTheLeft)
                    pushRight(squareToTheRight)
                    settleSquare(currentSquare)
                }
            }

            else if (currentSquare.momentum === 'left' &&
                     currentSquare.isDone === false) {

                if (index != leftEdgeCase) {
                    pushLeft(squareToTheLeft)
                }
                    settleSquare(currentSquare)
            }

            else if (currentSquare.momentum === 'right' &&
                     currentSquare.lastUpdated != presentTime &&
                     currentSquare.isDone === false) {
                
                if (index != rightEdgeCase) {
                    pushRight(squareToTheRight)
                }
                    settleSquare(currentSquare)
            }
        }

        if (stopTime === true) clearInterval(timeInterval)
        
        incrementTime()
        
    }



    //-----App is above this line-----//




    //-----Only Functions Below This Line-----//



    function initializeSquares() {
        squares.forEach( square => {
            settleSquare(square)
        })
    }

    function assignAllEventListeners() {
        assignEventListenersToSquares()
        assignEventListenerToTimeToggleButton()
        assignEventListenerToSpeedButton()
        assignEventListenerToResetButton()
    }

    function assignEventListenersToSquares() {
        for (let i = 0 ; i < squares.length ; i++) {
            squares[i].addEventListener('click', (event) => {
                const square = event.target
                pushOut(square)
            })
        }
    }

    function assignEventListenerToTimeToggleButton() {

        let timeToggleButton = document.querySelector('.timeToggle')

        timeToggleButton.addEventListener('click', (event) => {
            if (stopTime === false) {
                stopTime = true
                timeToggleButton.innerHTML = 'Unfreeze Time'
                event.target.style.backgroundColor = 'lightskyblue'
                console.log('You have stopped time.  Are you a wizard?')
            } else {
                stopTime = false
                timeInterval = setInterval(moveTimeForward, speedOfTime)
                timeToggleButton.innerHTML = 'Freeze Time'
                event.target.style.backgroundColor = 'white'
                console.log('Time has started again!')
            }
        })
    }

    function assignEventListenerToSpeedButton() {

        let speedOfTimeButton = document.querySelector('.speedOfTimeToggle')

        speedOfTimeButton.addEventListener('click', (event) => {
            clearInterval(timeInterval)
            if (speedOfTime === 25) {
                speedOfTime = 75
                speedOfTimeButton.innerHTML = 'Speed Up Time'
                event.target.style.backgroundColor = 'lightskyblue'
            } else if (speedOfTime === 75) {
                speedOfTime = 25
                speedOfTimeButton.innerHTML = 'Slow Time'
                event.target.style.backgroundColor = 'white'
            }
            timeInterval = setInterval(moveTimeForward, speedOfTime)
        })
    }

    function assignEventListenerToResetButton() {
        
        let resetButton = document.querySelector('.resetButton')

        resetButton.addEventListener('click', () => {
            squares.forEach( square => resetSquare(square))
        })
    }

    function pushRight(squareToBePushed) {
        removeMomentumClasses(squareToBePushed)
        squareToBePushed.classList.remove('noEnergySquare')
        squareToBePushed.classList.add('hasEnergySquare')
        squareToBePushed.classList.add('rightMomentum')
        squareToBePushed.momentum = 'right'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
    }
    
    function pushLeft(squareToBePushed) {
        removeMomentumClasses(squareToBePushed)
        squareToBePushed.classList.remove('noEnergySquare')
        squareToBePushed.classList.add('hasEnergySquare')
        squareToBePushed.classList.add('leftMomentum')
        squareToBePushed.momentum = 'left'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
    }

    function pushOut(squareToBePushed) {
        removeMomentumClasses(squareToBePushed)
        squareToBePushed.classList.remove('noEnergySquare')
        squareToBePushed.classList.add('outwardMomentum')
        squareToBePushed.momentum = 'outward'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.classList.add('hasEnergySquare')
        squareToBePushed.isDone = false

    }

    function settleSquare(squareToBeSettled) {
        squareToBeSettled.lastUpdated = presentTime
        squareToBeSettled.isDone = true
        squareToBeSettled.classList.remove('hasEnergySquare')
        squareToBeSettled.classList.add('noEnergySquare')
        squareToBeSettled.momentum = 'none'
    }

    function resetSquare(squareToBeReset) {
        removeMomentumClasses(squareToBeReset)
        settleSquare(squareToBeReset)
    }

    function removeMomentumClasses(squareWithMomentumClass) {
        squareWithMomentumClass.classList.remove('leftMomentum')
        squareWithMomentumClass.classList.remove('rightMomentum')
        squareWithMomentumClass.classList.remove('outwardMomentum')
    }

    function incrementTime() {
        console.log('The current moment now ends.  Time continues on...')
        presentTime++
        console.log(`Present time is changed to: ${presentTime}`)
    }

    function announceBeginningOfCycle() {
        console.log(`Present time is now: ${presentTime}`)
    }

}) //THE BOTTOM OF THE BUCKET




/*

Up next:

-Make favicon
-Add Readme.MD

Versions:
1.0 : MVP Simply create a system in which a touch creates a 1-dimensional ripple effect
2.0 : Add Decay for ripples so that they fade away and become "calm" after a certain time has passed
3.0 : Add Rebounding from outside of pool
4.0 : Add collision dynamics so that two ripples can pass through each other rather than one defeating
5.0 : Create y-axis with all abilities of x-axis
6.0 : Fill in diagonal space in between x and y axis in diamond formation
*/