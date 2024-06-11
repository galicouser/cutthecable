import axios from 'axios';

import { FETCH_ALL_USERS, SELECT_SUBSCRIPTION_PLAN } from './types';

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/auth/get-users');

    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    const { data } = response.data;
    console.log(data)
    dispatch({ type: 'FETCH_ALL_USERS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_SUBSCRIPTION_PLANS_FAILURE', payload: error.message })
  }
};



