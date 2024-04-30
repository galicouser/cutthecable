import axios from 'axios';

import { FETCH_SUBSCRIPTION_PLANS, SELECT_SUBSCRIPTION_PLAN } from './types';

const axiosAPI = axios.create({
  //baseURL: "https://nocableneeded-auth.onrender.com/",
  // baseURL: "https://1738api.nocableneeded.net/",
  baseURL: "http://localhost:4242",
  // baseURL: "https://1738api.cutthecable.org",
  // baseURL: "https://ctc-test-be.netlify.app"
});

export const fetchSubscriptionPackage = () => async (dispatch) => {
  try {
    const response = await axios.get('/subscriptionPackages/fetchSubscriptionPackage');

    if (response.status !== 200) {
      throw new Error('Failed to fetch subscription packages');
    }

    const { data } = response.data;
    console.log(data)
    dispatch({ type: 'FETCH_SUBSCRIPTION_PLANS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_SUBSCRIPTION_PLANS_FAILURE', payload: error.message })
  }
};

// Action creator to select a subscription plan
export const selectSubscriptionPlan = (plan) => {
  return {
    type: SELECT_SUBSCRIPTION_PLAN,
    payload: plan
  };
};

// subscriptionActions.js

export const setSubscriptionLength = (length) => ({
  type: 'SET_SUBSCRIPTION_LENGTH',
  payload: length,
});

export const setNumberDevices = (devices) => ({
  type: 'SET_NUMBER_DEVICES',
  payload: devices,
});



