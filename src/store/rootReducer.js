import {CHANGE_VALUE, DELETE_VALUE} from './types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case CHANGE_VALUE:
      prevState = state['dataState'] || {};
      prevState[action.payload.id] = action.payload.value;
      return {
        ...state,
        currentValue: action.payload.value,
        dataState: prevState,
      };

    case DELETE_VALUE:
      prevState = state['dataState'] || {};
      delete prevState[action.payload.id];
      console.log(prevState);
      return {
        ...state,
        currentValue: action.payload.value,
        dataState: prevState,
      };

    default:
      return state;
  }
}
