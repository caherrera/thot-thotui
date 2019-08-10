import History from '../classes/history';
import { Observable } from 'rxjs';
import axios from 'axios';
import Config from '../config/config';

/**
 * A Static class used to converge all API calls for the histories entities.
 */
export default class Histories {
    /**
     * The service getHistory Obtain the historic information of comparations made by the clients of thot
     * 
     * @return Return an Observabble with the history data of comparations
     */
    public static getHistory(): Observable<History[]> {
        return new Observable<History[]>(observe => {
            // do the REST call
            axios.get(Config.API+"/comparations/history").then(
                response => {
                    // Return the historic data
                    const histories = response.data;
                    observe.next(histories);
                    observe.complete();
                }, error => {
                    console.error("The service api have a problem. The response its not correct. Error: " + error);
                    throw new Error("The service api have a problem. The response its not correct. Error : " + error);
                }
            )
        });
    }
}
