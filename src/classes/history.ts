/**
 * The Class History it's a entity class used to save and load information about historical comparations results.
 */
export default class History {
    // Define the attributes of class
    public seed: string;
    public comparator: string;
    public algorithm: string;
    public comparationId: number;

    /**
     * This construtor take optional a History JSONObject and parse to History Object.
     * @param history A History JSONObject
     */
    constructor(history: any = null) {
        if (history) {
            this.seed = history.seed;
            this.comparator = history.comparator;
            this.algorithm = history.algorithm;
            this.comparationId = (history.comparationId) ? history.comparationId : history.comparation_id;
        }
    }
}
