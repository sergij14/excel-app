import {CHANGE_TEXT} from './types';

function changeValue(data) {
  return {
    type: CHANGE_TEXT,
    payload: data,
  };
}

export const actions = {
  changeValue,
};
