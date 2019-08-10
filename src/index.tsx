import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './containers/app/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

// Create the redux store for the app
const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  // And create the App with redux storage
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
