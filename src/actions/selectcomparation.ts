import History from '../classes/history';
import Comparations from '../services/comparations';
import { SHOW_MOBILE_BUTTON } from './mobileactions';

// Declare the type actions constants
export const SELECT_COMPARATION = "HISTORY_SELECTED";

/**
 * This redux action select a result store in database from the id in the history of comparations
 * @param history The History Object you want to view the comparation.
 */
export const selectComparation = (history: History) => {
    // Ensure the history object has been inicialized
    history = new History(history);
    return (dispatch: any, getState: any) => {
        // Make a REST call
        Comparations.getComparation(history.comparationId).subscribe(data => {
            // Because the store data in database contain all criterias of comparation we need filter them
            // If the algorithm criteria if 'all' push the object without changes
            if (history.algorithm === 'all') {
                // Dispacth the result to update the screen
                dispatch({
                    payload: data,
                    type: SELECT_COMPARATION
                });
            } else {
                // Otherwise we must create and object with the specific criteria of the history element
                const result = {
                    comparator: data.comparator,
                    id: data.id,
                    seed: data.seed
                };
                result[history.algorithm] = data[history.algorithm];
                // Dispacth the result to update the screen
                dispatch({
                    payload: result,
                    type: SELECT_COMPARATION
                });
            }
            // Dispacth to hidden history if mobile responsive version 
            dispatch({
                type: SHOW_MOBILE_BUTTON
            });
        })
    }
};