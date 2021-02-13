document.addEventListener('DOMContentLoaded', () => {

    let rateOfTime = 500
    let presentTime = 0
    let stopTime = false

    let squares = Array.from(document.querySelectorAll('.container div'))

    squares.forEach( square => square.isDone = false)

    let timeInterval = setInterval(moveTimeForward, rateOfTime)


 

    function moveTimeForward() {

        
        console.log(`Present time is now: ${presentTime}`)

        for (let i = 0 ; i < squares.length ; i++) {

            //BELOW IS A TOOL FOR DEBUGGING lastUpdated VALUES
            //console.log(`Index ${i} has a lastUpdated value of: ${squares[i].lastUpdated}`)
           
            const currentSquare = squares[i]
            const squareToTheLeft = squares[i-1]
            const squareToTheRight = squares[i+1]


            
            if (currentSquare.classList.contains('outMomentum') && currentSquare.isDone ===false) {

                //EDGE CASE LEFTMOST INDEX 
                if (i === 0 && squares[i].isDone === false) {
                    pushRight(squareToTheRight)
                    settleSquare(currentSquare)
                }
                //EDGE CASE RIGHTMOST INDEX
                else if (i === squares.length - 1 ) {
                    pushLeft(squareToTheLeft)
                    settleSquare(currentSquare)
                }
                //STANDARD OUT MOMENTUM
                else {
                    pushLeft(squareToTheLeft)
                    pushRight(squareToTheRight)
                    settleSquare(currentSquare)
                }
                
            }

            //LEFT MOMENTUM
            else if (squares[i].classList.contains('leftMomentum') && 
                     i != 0 &&
                     squares[i].isDone ===false) {

                pushLeft(squareToTheLeft)
                settleSquare(currentSquare)
            }

            //RIGHT MOMENTUM
            else if (currentSquare.classList.contains('rightMomentum') &&
                    currentSquare.lastUpdated != presentTime &&
                     i != squares.length - 1 &&
                     currentSquare.isDone === false) {

                pushRight(squareToTheRight)
                settleSquare(currentSquare)


            }
        }

        if (stopTime === true) {
            clearInterval(timeInterval)
        }

        

            console.log('Time moves ever forward...')
            presentTime++
            console.log(`Present time is now ${presentTime}`)
        
        

        
    }

    



    for (let i = 0 ; i < squares.length ; i++) 
    {
        squares[i].addEventListener('click', (event) => 
                                        {
                                            const square = event.target
                                            pushOut(square)
                                        }
                                    )

    }

    let timeToggleButton = document.querySelector('.timeToggle')

    timeToggleButton.addEventListener('click', () => {
        if (stopTime === false) {
            stopTime = true
            console.log('You have stopped time.  Are you a wizard?')
        } else {
            stopTime = false
            timeInterval = setInterval(moveTimeForward, rateOfTime)
            console.log('Time has started again!')
        }
    })

    function pushRight(squareToBePushed) {
        squareToBePushed.classList.remove('leftMomentum')
        squareToBePushed.classList.remove('outMomentum')
        squareToBePushed.classList.add('rightMomentum')
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
    }
    
    function pushLeft(squareToBePushed) {
        squareToBePushed.classList.remove('rightMomentum')
        squareToBePushed.classList.remove('outMomentum')
        squareToBePushed.classList.add('leftMomentum')
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false
    }

    function pushOut(squareToBePushed) {
        squareToBePushed.classList.remove('leftMomentum')
        squareToBePushed.classList.remove('rightMomentum')
        squareToBePushed.classList.add('outMomentum')
        squareToBePushed.hasOutMomentum = true
        squareToBePushed.lastUpdated = presentTime
        squareToBePushed.isDone = false

    }

    function settleSquare(squareToBeSettled) {
        squareToBeSettled.lastUpdated = presentTime
        squareToBeSettled.isDone = true
    }

}) //THE BOTTOM OF THE BUCKET




/*

Up next:

When a button is clicked it should receive "out momentum", which means that any square adjacent to it will be changed
in the next interval.  When the button is changed, it will receive "left momentum" or "right momentum" relative to the direction
which it was changed.

This should continue the process all the way to the end.

I should set goals for this first version

Also: MAKE A README.MD!!!!

PROCESS EATERS TO BE AWARE OF:

Each time you click a box it receives a timestamp as a class.  More clicks mean more stamps.  Once a moment has passed the box
does not need the number any more.  Might need some garbage collection?

*/