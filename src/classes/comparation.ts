/**
 * The Class Comparation it's a entity class used to save and load information about comparation results.
 */
export default class Comparation {
    // Define the attributes for the class Comparation
    public id: number;
    public seed: string;
    public comparator: string;
    public algorithm: string;
    public lineal: number;
    public ncslineal: number;
    public levenshtein: number;
    public wlevenshtein: number;
    public damerau: number;
    public winkler: number;
    public ngram: number;
    public cosine: number;
    public jaccard: number;
    public cached: boolean;
    
    /**
     * This construtor take optional a Comparation JSONObject and parse to Comparation Object.
     * @param comparation A Comparation JSONObject
     */
    constructor(comparation: any = null) {
        if (comparation) {
            this.id = comparation.id;
            this.seed = comparation.seed;
            this.comparator = comparation.comparator;
            this.algorithm = comparation.algorithm;
            this.lineal = comparation.lineal;
            this.ncslineal = comparation.ncslineal;
            this.levenshtein = comparation.levenshtein;
            this.wlevenshtein = comparation.wlevenshtein;
            this.damerau = comparation.damerau;
            this.winkler = comparation.winkler;
            this.ngram = comparation.ngram;
            this.cosine = comparation.cosine;
            this.jaccard = comparation.jaccard;
            this.cached = comparation.cached;
        }
    }
}
