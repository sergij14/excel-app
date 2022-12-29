import {CHANGE_STYLE, CHANGE_VALUE, DELETE_VALUE} from './types';

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
      return {
        ...state,
        currentValue: action.payload.value,
        dataState: prevState,
      };

    case CHANGE_STYLE:
      prevState = state['dataStyle'] || {};
      prevState[action.payload.id] = prevState[action.payload.id] || {};
      prevState[action.payload.id][action.payload.key] =
        action.payload.style[action.payload.key];
      return {
        ...state,
        dataStyle: prevState,
      };

    default:
      return state;
  }
}
