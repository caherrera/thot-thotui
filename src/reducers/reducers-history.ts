import { SHOW_HISTORY, ADD_HISTORY } from '../actions/showhistory';
import { DO_HISTORY_FILTER } from '../actions/filterhistory';
import { SHOW_MOBILE_BUTTON } from '../actions/mobileactions';

/* Set the initial state of reducer.
    This reducer controlle:
    - The list of history comparations
    - The local list of comparation (Comparation realized in the sesion)
    - Filter used in comparations
    - Mobile check for mobile history menu
*/
const initialState = {
    filter: null,
    list: [],
    local: [],
    mobile: false
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
    switch (action.type) {
        case SHOW_HISTORY:
            return Object.assign({}, state, { list: action.payload.reverse() });
        case ADD_HISTORY:
            return Object.assign({}, state, { 
                list: [action.payload].concat(state.list),
                local: [action.payload].concat(state.local)
            });
        case DO_HISTORY_FILTER:
            return Object.assign({}, state, { 
                filter: action.payload,
                list: state.list,
                local: state.local
            });
        case SHOW_MOBILE_BUTTON:
            return Object.assign({}, state, { 
                mobile: !state.mobile
            });
        default:
            return state;
    }
}
