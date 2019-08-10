import * as classnames from 'classnames';
import * as React from 'react';
import IElement from './ielement';
import { bindActionCreators } from 'redux';
import { selectComparation } from '../../../actions/selectcomparation';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

// Import the styles and assets
import './historyelement.scss';

/**
 * This Component HistoryElement is an element of historial present in the sidebar.
 * The element render and can call a historical result. 
 */
class HistoryElementComponent extends React.Component<IElement> {

    public constructor(props: any) {
        super(props);
    }
    /**
     * This method can decide the class used for the label of history item
     * @param algorithm The algorithm criteria of the history
     */
    public getClass(algorithm: string) {
        return {
            'all': algorithm === 'all',
            'cosine': algorithm === 'cosine',
            'criteria': true,
            'damerau': algorithm === 'damerau',
            'jaccard': algorithm === 'jaccard',
            'levenshtein': algorithm === 'levenshtein',
            'lineal': algorithm === 'lineal',
            'ncslineal': algorithm === 'ncslineal',
            'ngram': algorithm === 'ngram',
            'winkler': algorithm === 'winkler',
            'wlevenshtein': algorithm === 'wlevenshtein',
        };
    }

    // Specify the default render method
    public render() {
        // If the string lentgh > 12 is trunk to 12 + ...
        return (
            <div className="element"  onClick={ this.props.selectComparation.bind(this, this.props.element) } >
                <div className={ classnames(this.getClass(this.props.element.algorithm)) }>{ this.props.element.algorithm }</div>
                <OverlayTrigger placement="top" overlay={ this.getTooltip(this.props.element.seed) }>
                    <div className="string">
                        <div className="string-title">Seed</div>
                        <div className="string-content">{ (this.props.element.seed.length > 12) ? 
                            this.props.element.seed.substring(0, 12) + '...' : this.props.element.seed }</div>
                    </div>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={ this.getTooltip(this.props.element.comparator) }>
                    <div className="string no-border-left">
                        <div className="string-title">Comparator</div>
                        <div className="string-content">{ (this.props.element.comparator.length > 12) ? 
                            this.props.element.comparator.substring(0, 12) + '...' : this.props.element.comparator }</div>
                    </div>
                </OverlayTrigger>
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
}

// Configure React-redux store functions
function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
        selectComparation
    }, dispatch);
}

function mapStateToProps(state: any) {
    return {
        histories: state.comparationHistory.list
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(HistoryElementComponent);