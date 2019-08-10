import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { doComparation, doForceComparation, getCriterias} from '../../../actions/docomparations';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ISearch from './isearch';

// Import the styles and assets
import './search.scss';

// Define the initial state permited by typescript way
const initialState = { 
    comparator: '',
    force: false , 
    seed: '',
};
type State = typeof initialState;
/**
 * The Search component is the component used to handler all comparation querys.
 * It's located into the Body Component in the top
 */
class SearchComponent extends React.Component<ISearch, State> {
    constructor(props: any) {
        super(props);
        // Initialize the state of state vars
        this.state = {
            comparator: '',
            force: false,
            seed: ''
        };
        // Bind the methods to the component context
        this.forceUpdate = this.forceUpdate.bind(this);
        this.onComparation = this.onComparation.bind(this);
    }

    // Call the criterias to generate the options criteria
    public componentWillMount() {
        this.props.getCriterias();
    }

    /**
     * This method do the comparation with the criterias and options selected in the UI
     * @param event Receive the event of click button compare
     */
    public onComparation(event: any) {
        event.preventDefault();
        const seed = event.target.seed.value;
        const comparator = event.target.comparator.value;
        const criteria = event.target.criteria.value;
        if(this.state.force) {
            this.props.doForceComparation(seed, comparator, criteria);
        } else {
            this.props.doComparation(seed, comparator, criteria);
        }
    }

    /**
     * Change the state of force state of component to handle a force comparation or unforce comparation
     * @param event Receive the event of click button force
     */
    public forceUpdate(event: any) {
        event.preventDefault();
        this.setState({
            force: ! this.state.force
        })
    }
    
    /**
     * This method render the force button option. 
     */
    public renderForceButton() {
        const tooltip = (this.state.force) ? "Click me use the results in cache and only request server is a new comparation" 
            : "Click me to force all request to the remote server";
        return (
            <div className="force-option">
                <OverlayTrigger placement="top" overlay={ this.getTooltip(tooltip) }>
                    <button 
                        className={ classnames({
                            'force-option-button': this.state.force,
                            'unforce-option-button': !this.state.force
                        }) }
                        onClick={ this.forceUpdate }
                    > { (this.state.force) ? 'Unforced comparation' : 'Forced Comparation' }</button>
                </OverlayTrigger>
            </div>
        );
    }
    /**
     * This method render the criteria selector and the compare action button
     */
    public renderOptionsButtons() {
        return (
            <div className="action-option">
                <div className="action-option-select">
                    <span><i className="fas fa-angle-down" /></span>
                    <select name="criteria" className="action-option-algorithm">
                        { this.renderCriteriaOptions() }
                    </select>
                </div>
                <input className="action-option-compare" type="submit" value="Compare!" />
            </div>
        );
    }

    /**
     * An auxiliar method used to put in tooltip all text of srings comparation
     * @param text The text you want show in the tooltip
     */
    public getTooltip(text: string) {
        return (
            <Tooltip id="tooltip">
                { text }
            </Tooltip>
        )
    }

    /**
     * Set the content of textfield to a avoid the freeze value of Textfield seed
     * @param options Its and option object and used like trick to can use the bind in the call of event.
     * @param event Represent an onChange event Object
     */
    public handleChangeSeed(options: any, event: any) {
        this.setState({
            seed: event.target.value
        });
    }

    /**
     * Set the content of textfield to a avoid the freeze value of Textfield comparator
     * @param options Its and option object and used like trick to can use the bind in the call of event.
     * @param event Represent an onChange event Object
     */
    public handleChangeComparator(options: any, event: any) {
        this.setState({
            comparator: event.target.value
        });
    }

    /**
     * This method update the value of two Textfield when the user select a history Element
     * @param newProps Are the new props where the component receive a update state from store
     */
    public componentWillReceiveProps(newProps: any) {
        if (newProps.result) {
            this.setState({
                comparator: newProps.result.comparator,
                seed: newProps.result.seed
            });
        }
    }

    // Specify the default render method
    public render() {
        return (
            <div className="search">
                <div className="search-briefing">
                    <div className="search-briefing-title">Compare strings tool.</div>
                    <div className="search-briefing-description">This tool can be compare the percent of similarity between two strings with 
                    eight differents algorithm criterias.</div>
                </div>
                <form className="search-form" onSubmit={ this.onComparation } >
                    <div className="search-form-inputs">
                        <div className="form-inputs-group">
                            <div className="form-inputs-label"><i className="fas fa-pen-nib"/></div>
                            <input type="text" name="seed" placeholder="String One" value={ this.state.seed }
                            onChange={ this.handleChangeSeed.bind(this, {}) }/>
                        </div>
                        <div className="form-inputs-group">
                            <div className="form-inputs-label"><i className="fas fa-pen-nib" /></div>
                            <input type="text" name="comparator" placeholder="String Two" value={ this.state.comparator }
                            onChange={ this.handleChangeComparator.bind(this, {}) }/>
                        </div>
                    </div>
                    <div className="search-form-options">
                        { this.renderForceButton() }
                        { this.renderOptionsButtons() }
                    </div>
                </form>
            </div>
        );
    }

    private renderCriteriaOptions() {
        return this.props.criterias.sort().map((value: any, key: number) => {
            return (
                <option value={ value } key={ key }>{  value.charAt(0).toUpperCase() + value.slice(1) }</option>
            )
        });
    }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
        criterias: state.comparation.criterias,
        result: state.comparation.result
    }
}

function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
        doComparation, doForceComparation, getCriterias
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchComponent);