import { FETCH_ALL_USERS } from '../actions/types';

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
