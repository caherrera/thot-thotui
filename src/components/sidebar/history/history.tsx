import * as React from 'react';
import IHistory from './ihistory'
import { connect } from 'react-redux';
import HistoryElement from '../historyelement/historyelement';
import History from '../../../classes/history';

// Import the styles and assets
import './history.scss';

// Define the initial state permited by typescript way
const initialState = { 
    tab: 0 
};
type State = typeof initialState;

/**
 * This Component control the history list present in the sidebar. 
 * This component have two tabs accord if the user select the local history or global history.
 * The Default tab is the Local History
 */
class HistoryComponent extends React.Component<IHistory, State> {
    constructor(props: any) {
        super(props);
        // The control of tab is handler by the state tab.
        // 0: Local History
        // 1: Global History
        this.state = {
            tab: 0
        };
    }
    /**
     * This method is used to iterate the filter list and apply the filter
     * In this method the result is rendered accord to tab state value
     * The container its the same. Only change the data
     */
    public createHistoryList() {
        if (this.state.tab === 0) {
            // If the global history no have records print this
            if (this.props.local.length === 0) {
                return (
                    <div className="no-results">There no have local history</div>
                )
            }
            // otherwise not prints the elements
            return this.props.local.map((value: any, key: number) => {
                return (
                    <HistoryElement 
                        key={ key } 
                        element={ value }
                    />
                );
            });
        } else {
            // If the global history no have records print this
            if (this.props.histories.length === 0) {
                return (
                    <div className="no-results">There no have gloabl history</div>
                )
            }
            // otherwise not prints the elements
            return this.props.histories.map((value: any, key: number) => {
                if (this.filter(value)) {
                    return (
                        <HistoryElement 
                            key={ key } 
                            element={ value }
                        />
                    );
                } else {
                    return;
                }
            });
        }
    }

    /**
     *  This method filter the history list, from the filter store value. The filter value must be in the anyone of two compation
     *  string to return true.
     * @param value The history object you want filter.
     */
    public filter(value: History) {
        if(this.props.filter === '' || !this.props.filter) {
            return true;
        }
        if (value.seed.indexOf(this.props.filter) !== -1 || value.comparator.indexOf(this.props.filter) !== -1) {
            return true;
        }
        return false;
    }

    /**
     * This method change the tab if history. You can select Local (tab=0) or Global (tab=1)
     * @param tab The number of tab you want select.
     */
    public changeTab(tab: number) {
        this.setState({
            tab
        });
    }

    // Specify the default render method
    public render() {
        return (
            <div className="history">
                <div className="history-tab">
                    <div className="local-history" onClick={ this.changeTab.bind(this, 0) }>Local History</div>
                    <div className="global-history" onClick={ this.changeTab.bind(this, 1) }>Global History</div>
                </div>
                <div className="history-registers">
                    { this.createHistoryList() }
                </div>
            </div>
        );
    }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
        filter: state.comparationHistory.filter,
        histories: state.comparationHistory.list,
        local: state.comparationHistory.local
    }
}

export default connect(mapStateToProps)(HistoryComponent);