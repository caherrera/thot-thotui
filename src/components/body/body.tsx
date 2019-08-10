import * as React from 'react';
import ResultComponent from './result/result';
import SearchComponent from './search/search';
import DedicationComponent from './dedication/dedication';
import IStore from '../../interfaces/istore';
import { connect } from 'react-redux';

// Import the styles and assets
import './body.scss';

// Define the initial state permited by typescript way
const initialState = { 
    mobile: false 
};
type State = typeof initialState;

/**
 * The body component is the part of app where search and result component shows the string comparator and the results.
 * Is localted right to sidebar.
 */
class BodyComponent extends React.Component<State, IStore> {
    // Specify the default render method
    public render() {
        // Assign classname accord if mobile or not
        let className = 'body';
        if (this.props.mobile) {
            className += " mobile-show";
        }
        // return the render with the html responsive mobile criteria
        return (
            <div className={ className }>
                <SearchComponent />
                <ResultComponent />
                <DedicationComponent />
            </div>
        );
    }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
        histories: state.comparationHistory.list,
        mobile: state.comparationHistory.mobile
    }
}

export default connect(mapStateToProps)(BodyComponent);