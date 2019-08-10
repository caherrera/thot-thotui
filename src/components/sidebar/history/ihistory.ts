import IStore from '../../../interfaces/istore';

/**
 * Interaface made to provide to component the knownlege about the redux actions and internal states
 */
export default interface IHistory extends IStore {
    local: any;
    tab: number;
    filter: string;
}