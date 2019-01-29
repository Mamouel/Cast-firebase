import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import promise from "redux-promise";
import { logger } from "redux-logger";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';


import rootReducer from './store/reducers/rootReducer';
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(...[thunk.withExtraArgument({ getFirebase, getFirestore }), promise, logger]),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true })
  )
);

//Render DOM when firebase auth ready
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
})