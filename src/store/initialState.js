import {storage} from '../core/createStore';

const defaultState = {
  currentValue: '',
  dataState: {},
};

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
