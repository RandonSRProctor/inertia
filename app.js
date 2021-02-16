document.addEventListener('DOMContentLoaded', () => {

    let speedOfTime = 50
    let presentTime = 0
    let stopTime = false
    let squares = Array.from(document.querySelectorAll('.poolContainer div'))
    let timeInterval = setInterval(moveTimeForward, speedOfTime)

    initializeSquares()
    assignEventListenersToSquares()
    assignEventListenerToTimeToggleButton()
    assignEventListenerToSpeedButton()
    assignEventListenerToResetButton()

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


    //-----Only Functions Below This Line-----//



    function initializeSquares() {
        squares.forEach( square => {
            settleSquare(square)
        })
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

        timeToggleButton.addEventListener('click', () => {
            if (stopTime === false) {
                stopTime = true
                timeToggleButton.innerHTML = 'Unfreeze Time'
                console.log('You have stopped time.  Are you a wizard?')
            } else {
                stopTime = false
                timeInterval = setInterval(moveTimeForward, speedOfTime)
                timeToggleButton.innerHTML = 'Freeze Time'
                console.log('Time has started again!')
            }
        })
    }

    function assignEventListenerToSpeedButton() {

        let speedOfTimeButton = document.querySelector('.speedOfTimeToggle')

        speedOfTimeButton.addEventListener('click', () => {
            if (speedOfTime === 50) {
                speedOfTime = 500
                clearInterval(timeInterval)
                timeInterval = setInterval(moveTimeForward, speedOfTime)
                speedOfTimeButton.innerHTML = 'Speed Up Time'
            } else if (speedOfTime === 500) {
                speedOfTime = 50
                clearInterval(timeInterval)
                timeInterval = setInterval(moveTimeForward, speedOfTime)
                speedOfTimeButton.innerHTML = 'Slow Time'
            }
        })
    }

    function assignEventListenerToResetButton() {
        
        let resetButton = document.querySelector('.resetButton')

        resetButton.addEventListener('click', () => {
            squares.forEach( square => resetSquare(square))
        })
    }

    function pushRight(squareToBePushed) {
        squareToBePushed.classList.remove('leftMomentum')
        squareToBePushed.classList.remove('outwardMomentum')
        squareToBePushed.classList.remove('noEnergy')
        squareToBePushed.classList.add('rightMomentum')
        squareToBePushed.momentum = 'right'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.classList.add('hasEnergy')
        squareToBePushed.isDone = false
    }
    
    function pushLeft(squareToBePushed) {
        squareToBePushed.classList.remove('rightMomentum')
        squareToBePushed.classList.remove('outwardMomentum')
        squareToBePushed.classList.remove('noEnergy')
        squareToBePushed.classList.add('leftMomentum')
        squareToBePushed.momentum = 'left'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.classList.add('hasEnergy')
        squareToBePushed.isDone = false
    }

    function pushOut(squareToBePushed) {
        squareToBePushed.classList.remove('leftMomentum')
        squareToBePushed.classList.remove('rightMomentum')
        squareToBePushed.classList.remove('noEnergy')
        squareToBePushed.classList.add('outwardMomentum')
        squareToBePushed.momentum = 'outward'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.classList.add('hasEnergy')
        squareToBePushed.isDone = false

    }

    function settleSquare(squareToBeSettled) {
        squareToBeSettled.lastUpdated = presentTime
        squareToBeSettled.isDone = true
        squareToBeSettled.classList.remove('hasEnergy')
        squareToBeSettled.classList.add('noEnergy')
        squareToBeSettled.momentum = 'none'
    }

    function resetSquare(squareToBeReset) {
        squareToBeReset.classList.remove('leftMomentum')
        squareToBeReset.classList.remove('rightMomentum')
        squareToBeReset.classList.remove('outwardMomentum')
        settleSquare(squareToBeReset)
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