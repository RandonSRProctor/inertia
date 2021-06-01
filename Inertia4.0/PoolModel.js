import { VirtualSquare } from './VirtualSquare.js';
class VirtualPool {
    constructor(domSquaresArray) {
        this.state = [];
        for (let i = 0; i < domSquaresArray.length; i++) {
            this.state.push(new VirtualSquare(i));
        }
    }
    applyActions(providedArrayOfAllActions) {
        let newState = [...this.state];
        for (let action of providedArrayOfAllActions) {
            switch (action.type) {
                case 'DEDUCT':
                    newState[action.index].forceMovingLeft -= action.forceMovingLeft;
                    newState[action.index].forceMovingRight -= action.forceMovingRight;
                    break;
                case 'INCREMENT':
                    if (action.forceMovingLeft) {
                        newState[action.index].forceMovingLeft += action.forceMovingLeft;
                    }
                    if (action.forceMovingRight) {
                        newState[action.index].forceMovingRight += action.forceMovingRight;
                    }
                    break;
            }
        }
        this.state = [...newState];
    }
}
export { VirtualPool };
