// Declare the type actions constants
export const SHOW_MOBILE_BUTTON = "SHOW_MOBILE_BUTTON";

/**
 * This redux action do show the history in the mobile response
 */
export const showMenuMobile = () => {
    // Make a REST call
    return (dispatch: any, getState: any) => {
        // Dispath the filter to apply to store
        dispatch({
            type: SHOW_MOBILE_BUTTON
        });
    }
};