import {CHANGE_VALUE, DELETE_VALUE} from './types';

function changeValue(data) {
  const isDataEmpty = data.value === '';
  return {
    type: isDataEmpty ? DELETE_VALUE : CHANGE_VALUE,
    payload: data,
  };
}

export const actions = {
  changeValue,
};
