import Comparation from "../../../classes/comparation";

/**
 * Interaface made to provide to component the knownlege about the redux actions and internal states
 */
export default interface ISearch {
    criterias: string[];
    doComparation: any;
    doForceComparation: any;
    force: boolean;
    result: Comparation;
    getCriterias: any;
}