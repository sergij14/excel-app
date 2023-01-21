import {CHANGE_STYLE, CHANGE_TABLE_TITLE, CHANGE_VALUE, DELETE_VALUE} from './types';

export function rootReducer(state, action) {
  let prevState;
  const data = action.payload;

  switch (action.type) {
    case CHANGE_VALUE:
      prevState = state['dataState'] || {};
      prevState[data.id] = data.value;
      return {
        ...state,
        currentValue: data.value,
        dataState: prevState,
      };

    case DELETE_VALUE:
      prevState = state['dataState'] || {};
      delete prevState[data.id];
      return {
        ...state,
        currentValue: data.value,
        dataState: prevState,
      };

    case CHANGE_STYLE:
      prevState = state['dataStyle'] || {};
      prevState[data.id] = prevState[data.id] || {};
      prevState[data.id][data.key] =
        data.style[data.key];
      return {
        ...state,
        currentValue: state['dataState'][data.id] || '',
        dataStyle: prevState,
      };

    case CHANGE_TABLE_TITLE:
      return {...state, title: data};

    default:
      return state;
  }
}
