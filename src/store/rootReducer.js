import {CHANGE_TEXT} from './types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case CHANGE_TEXT:
      prevState = state['dataState'] || {};
      prevState[action.payload.id] = action.payload.value;
      return {
        ...state,
        currentValue: action.payload.value,
        dataState: prevState,
      };

    default:
      return state;
  }
}
