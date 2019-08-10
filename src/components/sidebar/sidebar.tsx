import * as React from 'react';
import HistoryComponent from './history/history';
import FilterHistoryComponent from './filter/filter';
import { connect } from 'react-redux';

// Import the styles and assets
import './sidebar.scss';

// Define the initial state permited by typescript way
const initialState = { 
    mobile: false
};
type State = typeof initialState;

/**
 * This component render and make the functionality of sidebar in the Thot app
 */
class SidebarComponent extends React.Component<State> {
    constructor(props: any) {
        super(props);
    }

    // Specify the default render method
    public render() {
        // Assign classname accord if mobile or not
        let className = 'sidebar';
        if (this.props.mobile) {
            className += ' menu-mobile';
        }
        // return the render with the html responsive mobile criteria
        return(
            <div className={className}>
                <FilterHistoryComponent />
                <HistoryComponent/>
            </div>
        );
    }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
        mobile: state.comparationHistory.mobile
    }
}

export default connect(mapStateToProps)(SidebarComponent);
