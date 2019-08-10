import Comparation from '../classes/comparation';
import { Observable } from 'rxjs';
import axios from 'axios';
import Config from '../config/config';

/**
 * A Static class used to converge all API calls for the comparations entities.
 */
export default class Comparations {
    /**
     * This service doComparation do an comparation in the api and return his result.
     * If the return comes cached the response code is 203, otherwise the return code is 200. Any other code is an error.
     * 
     * @param seed Its the string you want compare 
     * @param comparation Its the string you want used like comparator
     * @param algorithm Its the algorithm used like criteria
     * 
     * @return Return an observable with Comparation Object Promise 
     */
    public static doComparation(seed:string, comparation:string, algorithm: string): Observable<Comparation> {
        return new Observable<Comparation>(observe => {
            // Prepare the query string path
            let query = Config.API + '/strings/' + encodeURIComponent(seed) + '/compare/' + encodeURIComponent(comparation);
            query += (algorithm && algorithm !== "all") ? '?criteria=' + algorithm : '';
            // Do the REST call
            axios.get(query).then(
                response => {
                    // If the code not 200 or 203, throw Error.
                    if (!(response.status === 200 || response.status === 203)) {
                        const error = "The service api have a problem. The response its not correct. Error: " + response.status;
                        // Inform the error and stop execution
                        console.error(error);
                        throw new Error(error);
                    }
                    // Analize the response and return the data
                    response.data.cached = (response.status === 203) ? true : false;
                    observe.next(response.data);
                    observe.complete();
                }, error => {
                    console.error("The service api have a problem. The response its not correct. Error: " + error);
                    throw new Error("The service api have a problem. The response its not correct. Error : " + error);
                }
            )
        });
    }

    /**
     * This service doForceComparation do an comparation in the api and return his result.
     * If the return code its ever 200 because the Api force the call to remote analisis string server. Any other code is an error.
     * 
     * @param seed Its the string you want compare 
     * @param comparation Its the string you want used like comparator
     * @param algorithm Its the algorithm used like criteria
     * 
     * @return Return an observable with Comparation Object Promise 
     */
    public static doForceComparation(seed:string, comparation:string, algorithm: string): Observable<Comparation> {
        return new Observable<Comparation>(observe => {
            // Prepare the query string path
            let query = Config.API + '/strings/' + encodeURIComponent(seed) + '/compare/' + encodeURIComponent(comparation);
            query += '?force=true';
            query += (algorithm && algorithm !== "all") ? '&&criteria=' + algorithm : '';
            // Do the REST call
            axios.get(query).then(
                response => {
                    // If the code not 200, throw Error.
                    if (!(response.status === 200)) {
                        const error = "The service api have a problem. The response its not correct. Error: " + response.status;
                        // Inform the error and stop execution
                        console.error(error);
                        throw new Error(error);
                    }
                    // Return the data with not cache mark
                    response.data.cached = false;
                    observe.next(response.data);
                    observe.complete();
                }, error => {
                    console.error("The service api have a problem. The response its not correct. Error: " + error);
                    throw new Error("The service api have a problem. The response its not correct. Error : " + error);
                }
            )
        });
    }

    /**
     * The service getComparation get an historic comparation by id
     * @param id Id of comparation
     * 
     * @return Return an Observable with the Comparation Object Promise 
     */
    public static getComparation(id: number): Observable<Comparation> {
        return new Observable<Comparation>(observe => {
            const query = Config.API + '/comparations/' + id;
            // Do the REST call
            axios.get(query).then(
                response => {
                    // Return the data with cache mark
                    response.data.cached = true;
                    observe.next(response.data);
                    observe.complete();
                }, error => {
                    console.error("The service api have a problem. The response its not correct. Error: " + error);
                    throw new Error("The service api have a problem. The response its not correct. Error : " + error);
                }
            )
        });
    }
    
    /**
     * The service getCriterias get all posibilities to use in criteria parameter.
     * @return Return an Observable with a String array of criterias.
     */
    public static getCriterias(): Observable<string[]> {
        return new Observable<string[]>(observe => {
            const query = Config.API + '/comparations/criterias';
            // Do the REST call
            axios.get(query).then(
                response => {
                    observe.next(response.data);
                    observe.complete();
                }, error => {
                    console.error("The service api have a problem. The response to get the criterias its not correct. Error: " + error);
                    throw new Error("The service api have a problem. The response to get the criterias its not correct. Error : " + error);
                }
            )
        });
    }
}
