import { Action } from './Action.js'
import { VirtualSquare } from './VirtualSquare.js'

class VirtualPool {
    state: VirtualSquare[] = []
    constructor(domSquaresArray: any[]) {
        for (let i = 0 ; i < domSquaresArray.length ; i++) {
            this.state.push(new VirtualSquare(i))
        }
    }
    applyActions(providedArrayOfAllActions: Action[]) {
        let newState: VirtualSquare[] = [...this.state]
        for ( let action of providedArrayOfAllActions) {
            switch (action.type) {
                case 'DEDUCT':
                    newState[action.index].forceMovingLeft -= action.forceMovingLeft
                    newState[action.index].forceMovingRight -= action.forceMovingRight
                    
                case 'INCREMENT':
                    if(action.forceMovingLeft) { newState[action.index].forceMovingLeft += action.forceMovingLeft }
                    if(action.forceMovingRight) { newState[action.index].forceMovingRight += action.forceMovingRight }
                    
            }
        }
        this.state = [...newState]
    }
}

export { VirtualPool }