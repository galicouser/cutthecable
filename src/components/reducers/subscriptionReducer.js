// reducers/subscriptionReducer.js
import { FETCH_SUBSCRIPTION_PLANS_SUCCESS, SELECT_SUBSCRIPTION_PLAN, SET_SUBSCRIPTION_LENGTH, SET_NUMBER_DEVICES } from '../actions/types';

const initialState = {
  plans: [], // Array to store subscription plans
  selectedPlan: null, // Currently selected subscription plan
  subscriptionLength: '',
  numberDevices: 1,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload
      };
    case SELECT_SUBSCRIPTION_PLAN:
      return {
        ...state,
        selectedPlan: action.payload
      };
    case SET_SUBSCRIPTION_LENGTH:
      return {
        ...state,
        subscriptionLength: action.payload
      };
    case SET_NUMBER_DEVICES:
      return {
        ...state,
        numberDevices: action.payload
      };
    default:
      return state;
  }
};

export default subscriptionReducer;

