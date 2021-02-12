document.addEventListener('DOMContentLoaded', () => {

let squares = Array.from(document.querySelectorAll('.container div'))



for (let i = 0 ; i < squares.length ; i++) {
    squares[i].addEventListener('click', () => {


        let counter = 0

        setInterval( () => {
        
            if (squares[i].style.backgroundColor != 'aquamarine') {
                squares[i].style.backgroundColor = 'aquamarine'
            } else {
                squares[i-1].style.backgroundColor = 'aquamarine'
                squares[i+1].style.backgroundColor = 'aquamarine'
            }
            
        
        }, 500)




        
    
    }

    )}

})

/*

Up next:

When a buttun is clicked it should recieve "out momentum", which means that any square adjacent to it will be changed
in the next interval.  When the button is changed, it will recieve "left momentum" or "right momentum" relative to the direction
which it was changed.

This should continue the process all the way to the end.

Also: MAKE A README.MD!!!!

*/