import {storage} from '../core/utils';

const defaultState = {
  currentValue: '',
  dataState: {},
  dataStyle: {},
  title: 'New Table',
};

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
