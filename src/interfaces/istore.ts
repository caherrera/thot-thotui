import History from '../classes/history';

// This interface provide an initial knowledge to components of object for avoid the not implemented error
export default interface IStore {
    histories: History[];
    showMenuMobile: any;
    showHistory: any;
}
