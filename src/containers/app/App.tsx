import * as React from 'react';
import BodyComponent from '../../components/body/body';
import SidebarComponent from '../../components/sidebar/sidebar';
import IStore from '../../interfaces/istore';
import { connect } from 'react-redux';
import { showHistory } from '../../actions/showhistory';
import { bindActionCreators } from 'redux';
import { showMenuMobile } from '../../actions/mobileactions';

// Import the styles and assets
import './App.scss';
import logo from '../../assets/thot.svg';

/**
 * This Component it's the principal member of the Thot. 
 * From this components all other components are render.
 */
class App extends React.Component<IStore, {}> {
    constructor(props: any) {
        super(props)
    }

    // Call the historic comparation data before the dom load
    public componentWillMount() {
        this.props.showHistory();
    }

    // Specify the default render method
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={ logo } className="App-logo" alt="logo" />
                    <div className="header-title">Thot String Comparator</div>
                    <div className="header-mobile-menu">
                        <button className="history-button" onClick={ this.props.showMenuMobile }>
                            <i className="fas fa-history" />
                        </button>
                    </div>
                </header>
                <div className="App-container">
                    <SidebarComponent/>
                    <BodyComponent />
                </div>
            </div>
        );
    }
}

// Configure React-redux store functions
function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
        showHistory,
        showMenuMobile
    }, dispatch);
}

function mapStateToProps(state: any) {
    return {
        histories: state.comparationHistory.list
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
