import { combineReducers } from 'redux';
import subscriptionReducer from './subscriptionReducer'; // Import your subscription reducer

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  subscription: subscriptionReducer,
  // Add more reducers as needed
});

export default rootReducer;
