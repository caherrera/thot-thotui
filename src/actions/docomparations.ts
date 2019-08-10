import Comparations from '../services/comparations';
import { ADD_HISTORY } from './showhistory';
import History from '../classes/history';

// Declare the type actions constants
export const DO_COMPARATION = "DO_COMPARATION";
export const SHOW_CRITERIAS = "SHOW_CRITERIAS";

/**
 * This redux action habndle a comparation between two strings and refresh the store with the results and history data
 * @param seed The string you want compare
 * @param comparator The string you want use like comparator
 * @param algorithm The string represent the criteria algorithm 
 */
export const doComparation = (seed: string, comparator: string, algorithm: string) => {
    return (dispatch: any, getState: any) => {
        // Make a REST call
        Comparations.doComparation(seed, comparator, algorithm).subscribe(data => {
            // Generate two dispatch.
            // - One to update the result
            // - One to update the history of comparations
            dispatch({
                payload: data,
                type: DO_COMPARATION
            });
            dispatch({
                payload: new History({
                    algorithm,
                    comparation_id: data.id,
                    comparator,
                    seed
                }),
                type: ADD_HISTORY
            });
        })
    }
};

/**
 * This redux action habndle a comparation between two strings and refresh the store with the results and history data.
 * The difference with the doComparation if that action ever make a call to remote comparator api and return 200 code. not 203 cached.
 * @param seed The string you want compare
 * @param comparator The string you want use like comparator
 * @param algorithm The string represent the criteria algorithm 
 */
export const doForceComparation = (seed: string, comparator: string, algorithm: string) => {
    return (dispatch: any, getState: any) => {
        // Make a REST call
        Comparations.doForceComparation(seed, comparator, algorithm).subscribe(data => {
             // Generate two dispatch.
            // - One to update the result
            // - One to update the history of comparations
            dispatch({
                payload: data,
                type: DO_COMPARATION
            });
            dispatch({
                payload: new History({
                    algorithm,
                    comparation_id: data.id,
                    comparator,
                    seed
                }),
                type: ADD_HISTORY
            });
        })
    }
};

/**
 * This redux action get all comparation criteria available
 */
export const getCriterias = () => {
    return (dispatch: any, getState: any) => {
        // Make a REST call
        Comparations.getCriterias().subscribe(data => {
            // Generate one dispatch.
            // to update the selectbox of criterias
            dispatch({
                payload: data,
                type: SHOW_CRITERIAS
            });
        })
    }
};