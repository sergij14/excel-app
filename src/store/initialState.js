import {storage} from '../core/utils';

export const defaultState = {
  currentValue: '',
  dataState: {},
  dataStyle: {},
  title: 'New Table',
};

export const getInitialState = (state) => state? state : defaultState;

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
