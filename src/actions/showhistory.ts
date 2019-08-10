import Histories from '../services/histories';

// Declare the type actions constants
export const SHOW_HISTORY = "SHOW_HISTORY";
export const ADD_HISTORY = "ADD_HISTORY";

/**
 * This redux action execute a REST call to get the global history of comparations
 */
export const showHistory = () => {
    return (dispatch: any, getState: any) => {
        // Make a REST call
        Histories.getHistory().subscribe(data => {
            // Dispatch the result to update the history
            dispatch({
                payload: data,
                type: SHOW_HISTORY
            });
        })
    }
};