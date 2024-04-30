import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // If you're using thunk middleware
import rootReducer from './reducers'; // Import your root reducer

// Create the Redux store with middleware applied
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
