import {CHANGE_STYLE, CHANGE_TABLE_TITLE, CHANGE_VALUE, DELETE_VALUE} from './types';

function changeValue(data) {
  const isDataEmpty = data.value === '';
  return {
    type: isDataEmpty ? DELETE_VALUE : CHANGE_VALUE,
    payload: data,
  };
}

function changeStyle(data) {
  return {
    type: CHANGE_STYLE,
    payload: data,
  };
}


function changeTitle(data) {
  return {
    type: CHANGE_TABLE_TITLE,
    payload: data,
  };
}


export const actions = {
  changeValue,
  changeStyle,
  changeTitle,
};
