// Declare the type actions constants
export const DO_HISTORY_FILTER = "DO_HISTORY_FILTER";

/**
 * This redux action do a filter in the history of comparations of both. Local and global.
 * @param options An object with options. Its a trick to avoid the TS warning about ilegals bind calls
 * @param event The event object with the onKeyUp event
 */
export const filterHistory = (options: any, event: any) => {
    // Make a REST call
    return (dispatch: any, getState: any) => {
        // Dispath the filter to apply to store
        dispatch({
            payload: event.target.value,
            type: DO_HISTORY_FILTER
        });
    }
};