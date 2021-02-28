document.addEventListener('DOMContentLoaded', () => {

    let speedOfTime = 40
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

                 
            currentSquare.style.backgroundColor = determineColor(currentSquare.colorFade)
            
            if (currentSquare.colorFade > 0) {currentSquare.colorFade--}
           
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
                square.style = 'navy'
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
            if (speedOfTime === 40) {
                speedOfTime = 75
                speedOfTimeButton.innerHTML = 'Speed Up Time'
                event.target.style.backgroundColor = 'lightskyblue'
            } else if (speedOfTime === 75) {
                speedOfTime = 40
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
        squareToBePushed.classList.add('hasRightEnergySquare')
        squareToBePushed.classList.add('rightMomentum')
        if (squareToBePushed.momentum === 'left' || squareToBePushed.momentum === 'outward') 
            {squareToBePushed.momentum = 'outward'}
        else {squareToBePushed.momentum = 'right'}
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
        squareToBePushed.colorFade = 45
    }
    
    function pushLeft(squareToBePushed) {
        removeMomentumClasses(squareToBePushed)
        squareToBePushed.classList.remove('noEnergySquare')
        squareToBePushed.classList.add('hasLeftEnergySquare')
        squareToBePushed.classList.add('leftMomentum')
        if (squareToBePushed.momentum === 'right' || squareToBePushed.momentum === 'outward') 
            {squareToBePushed.momentum = 'outward'}
        else {squareToBePushed.momentum = 'left'}
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
        squareToBePushed.colorFade = 45
    }

    function pushOut(squareToBePushed) {
        removeMomentumClasses(squareToBePushed)
        squareToBePushed.classList.remove('noEnergySquare')
        squareToBePushed.classList.add('outwardMomentum')
        squareToBePushed.momentum = 'outward'
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.classList.add('hasEnergySquare')
        squareToBePushed.isDone = false
        squareToBePushed.colorFade = 45
    }

    function settleSquare(squareToBeSettled) {
        squareToBeSettled.lastUpdated = presentTime
        squareToBeSettled.isDone = true
        squareToBeSettled.classList.remove('hasEnergySquare')
        squareToBeSettled.classList.remove('hasLeftEnergySquare')
        squareToBeSettled.classList.remove('hasRightEnergySquare')
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

    function determineColor(colorFadeNumberGiven) {
        let numberBasedColor
            switch(colorFadeNumberGiven / 3) {
                case 15: {numberBasedColor = '#008080'} break;
                case 14: {numberBasedColor = '#009999'} break;
                case 13: {numberBasedColor = '#00b3b3'} break;
                case 12: {numberBasedColor = '#00cccc'} break;
                case 11: {numberBasedColor = '#00e6e6'} break;
                case 10: {numberBasedColor = '#00ffff'} break;
                case 9:  {numberBasedColor = '#1affff'} break;
                case 8:  {numberBasedColor = '#99ffff'} break;
                case 7:  {numberBasedColor = '#99ffff'} break;
                case 5:  {numberBasedColor = '#b3ffff'} break;
                case 6:  {numberBasedColor = '#b3ffff'} break;
                case 4:  {numberBasedColor = '#ccffff'} break;
                case 3:  {numberBasedColor = '#ccffff'} break;
                case 2:  {numberBasedColor = '#e6ffff'} break;
                case 1:  {numberBasedColor = '#e6ffff'} break;
                case 0:  {numberBasedColor = '#ffffff'} break;
            }
        return numberBasedColor
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