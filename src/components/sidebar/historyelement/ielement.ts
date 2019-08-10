import History from '../../../classes/history';
import IStore from '../../../interfaces/istore';

/**
 * Interaface made to provide to component the knownlege about the redux actions and internal states
 */
export default interface IElement extends IStore{
    element: History;
    selectComparation: any;
}