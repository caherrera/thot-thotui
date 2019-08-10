import * as React from 'react';
import { connect } from 'react-redux';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Comparation from '../../../classes/comparation';
import IResult from './iresult';

// Import the styles and assets
import './result.scss';


/**
 * The Result Component is the screen where the app can render the graphs of algorithm compaator result
 * Its located bottom to the search component, into the Body Component.
 */
class ResultComponent extends React.Component<IResult> {
    /**
     * This method render the results when the store receive a Comparation value.
     * This method build the the response based on result content.
     */
    public renderResult() {
        return (
            <div className="result-body">
                <div className="result-body-text">
                    <div className="result-title">
                        <span>The result of camparation</span>
                        <span><b>{ this.props.result.seed }</b></span>
                        <span>and</span>
                        <span><b>{ this.props.result.comparator }</b></span>
                    </div>
                </div>
                <div className="result-group-stadistics">
                    { this.renderResults(this.props.result) }
                </div>
                { this.renderIsCached(this.props.result.cached) }
            </div>
        )
    }

    /**
     * This method render if the result is a cache result (Saved in thot database) or if a call to Siwa API.
     * @param cached The cache status of Comparation Object.
     */
    public renderIsCached(cached: boolean) {
        if (cached) {
            return (
                <div className="result-cached">
                    <b>*Note:</b><br />
                    <p>The result of analisis come from thot cached results, and not come from string comparator service. 
                    If you want force the request to remote comparator service, please click in the forced comparation button.</p>
                </div>
            )
        } else {
            return (
                <div className="result-cached">
                    <b>*Note:</b><br /> 
                    The result of this analisis come from the remote server and it's the most recent analisis.
                </div>
            )
        }
    }

    /**
     * This method render the initial state of Result component while the store not receive a Comparation value.
     */
    public renderWaitResult() {
        return (
            <div className="result-body">
                <span className="no-match">Do a comparation or select a comparation from history.</span>
            </div>
        );
    }

    /**
     * This method prepare the result component to render into the component. Transform the object in array to generate the graphs.
     * @param result Represent the comparation result object you want render into the component 
     */
    public renderResults(result: Comparation) {
        const resultados:any[] = [];
        if (typeof result.lineal !== "undefined") { 
            resultados.push({
                description: `The lineal Algorithm is an recursive algorithm, that iterate all char in strings in secuencial order 
                to get the distance.`,
                name: 'Lineal',
                similarity: result.lineal.toFixed(2)
            });
        }

        if (typeof result.ncslineal !== "undefined") {
            resultados.push({
                description: `The No Case Sensitive lineal Algorithm is an recursive algorithm, that iterate all char in strings 
                in secuencial order to get the distance. The only diference with the traditional lineal algoritm is that the char's 
                is not affected by case sensitive.`,
                name: 'NCS Lineal',
                similarity: result.ncslineal.toFixed(2)
            });
        }

        if (typeof result.levenshtein !== "undefined") {
            resultados.push({
                description: `The Levenshtein distance between two words is the minimum number of single-character edits (insertions, 
                deletions or substitutions) required to change one word into the other.`,
                name: 'Levenshtein Distance',
                similarity: result.levenshtein.toFixed(2)
            });
        }

        if (typeof result.wlevenshtein !== "undefined") {
            resultados.push({
                description: `An implementation of Levenshtein that allows to define different weights for different character substitutions.
                This algorithm is usually used for optical character recognition (OCR) applications. For OCR, the cost of substituting P and 
                R is lower then the cost of substituting P and M for example because because from and OCR point of view P is similar to R.`,
                name: 'Weight Levenshtein',
                similarity: result.wlevenshtein.toFixed(2)
            });
        }

        if (typeof result.damerau !== "undefined") {
            resultados.push({
                description: `Similar to Levenshtein, Damerau-Levenshtein distance with transposition (also sometimes calls unrestricted 
                Damerau-Levenshtein distance) is the minimum number of operations needed to transform one string into the other, where an 
                operation is defined as an insertion, deletion, or substitution of a single character, or a transposition of two adjacent 
                characters.`,
                name: 'Damerau Distance',
                similarity: result.damerau.toFixed(2)
            });
        }

        if (typeof result.winkler !== "undefined") {
            resultados.push({
                description: `Jaro-Winkler is a string edit distance that was developed in the area of record linkage (duplicate detection) 
                (Winkler, 1990). The Jaro–Winkler distance metric is designed and best suited for short strings such as person names, and to 
                detect typos.`,
                name: 'Winkler Divergence',
                similarity: result.winkler.toFixed(2)
            });
        }

        if (typeof result.ngram !== "undefined") {
            resultados.push({
                description: `Normalized N-Gram distance as defined by Kondrak, "N-Gram Similarity and Distance", String Processing and 
                Information Retrieval, Lecture Notes in Computer Science Volume 3772, 2005, pp 115-126.`,
                name: 'N-gram Distance',
                similarity: result.ngram.toFixed(2)
            });
        }

        if (typeof result.cosine !== "undefined") {
            resultados.push({
                description: `The similarity between the two strings is the cosine of the angle between these two vectors representation, 
                and is computed as V1 . V2 / (|V1| * |V2|)`,
                name: 'Cosine Similarity',
                similarity: result.cosine.toFixed(2)
            });
        }

        if (typeof result.jaccard !== "undefined") {
            resultados.push({
                description: `Like Q-Gram distance, the input strings are first converted into sets of n-grams (sequences of n characters, 
                also called k-shingles), but this time the cardinality of each n-gram is not taken into account. Each input string is simply 
                a set of n-grams. The Jaccard index is then computed as |V1 inter V2| / |V1 union V2|.`,
                name: 'Jaccard Similarity',
                similarity: result.jaccard.toFixed(2)
            });
        }

        return resultados.map((value,key) => {
            return (
                <div className="results-stadistics" key={ key }>
                    <div className="results-stadistics-title">{ value.name }</div>
                    <div className="results-stadistics-about">
                        <OverlayTrigger placement="top" overlay={ this.getTooltip(value.description) }>
                            <i className="fas fa-question-circle"/>
                        </OverlayTrigger>
                    </div>
                    <div className="results-stadistics-bar"><ProgressBar now={ parseFloat(value.similarity) } label={`${value.similarity}%`} /></div>
                </div>
            )
        });
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
    
    // Specify the default render method
    public render() {
        // Only render result if the object exists
        if (this.props.result) {
            return this.renderResult();
        } else {
            return this.renderWaitResult();
        }
    }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
        result: state.comparation.result
    }
}

export default connect(mapStateToProps)(ResultComponent);