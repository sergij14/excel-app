import {storage} from '../core/createStore';

const defaultState = {
  currentValue: '',
  dataState: {},
  dataStyle: {},
};

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
