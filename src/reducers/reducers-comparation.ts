import { DO_COMPARATION } from '../actions/docomparations';
import { SELECT_COMPARATION } from '../actions/selectcomparation';
import { SHOW_CRITERIAS } from '../actions/docomparations';

/* Set the initial state of reducer.
    This reducer controlle:
    - The result of comparation
*/
const initialState = {
    criterias: [],
    result: null
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
    switch (action.type) {
        case DO_COMPARATION:
            return Object.assign({}, state, { result: action.payload });
        case SELECT_COMPARATION:
            return Object.assign({}, state, { result: action.payload });
        case SHOW_CRITERIAS:
            return Object.assign({}, state, { criterias: action.payload });
        default:
            return state;
    } 
}
