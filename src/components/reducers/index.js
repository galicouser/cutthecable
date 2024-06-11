import { combineReducers } from 'redux';
import subscriptionReducer from './subscriptionReducer'; // Import your subscription reducer
import userReducer from './userReducer'; // Import your subscription reducer

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  subscription: subscriptionReducer,
  user: userReducer
  // Add more reducers as needed
});

export default rootReducer;
