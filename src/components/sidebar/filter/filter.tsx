import * as React from 'react';
import IFilter from './ifilter'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterHistory } from '../../../actions/filterhistory';

// Import the styles and assets
import './filter.scss';

/**
 * This component controls and render the filter located in the sidebar
 * The filter is used to filter the historical data of comparations
 */
class FilterHistoryComponent extends React.Component<IFilter> {
    constructor(props: any) {
        super(props);
        // Fix the bind loss context
        this.filter = this.filter.bind(this);
    }

    /**
     * This method call the filterHistory action to pass the filter criteria to History component
     * @param event An onKeyPress event object of textfield used like filter.
     */
    public filter(event: any) {
        this.props.filterHistory.bind(this, event.target.value);
    }

    // Specify the default render method
    public render() {
        return(
            <div className="filter">
                <input 
                    type="text" 
                    className="filter-input" 
                    name="filter" 
                    onKeyUp={ this.props.filterHistory.bind(this, {}) } 
                    placeholder="Filter by"
                />
            </div>
        );
    }
}

// Configure React-redux store functions
function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
        filterHistory
    }, dispatch);
}

function mapStateToProps(state: any) {
    return {
        histories: state.comparationHistory.list
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FilterHistoryComponent);
