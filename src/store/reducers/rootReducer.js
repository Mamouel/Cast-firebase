import authReducer from './authReducer';
import storyReducer from './storyReducer';
import searchReducer from './searchReducer';
import commentReducer from './commentReducer';



import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  story: storyReducer,
  search: searchReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  comments: commentReducer
})

export default rootReducer;