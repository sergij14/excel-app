import {createStore} from '../createStore';

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return {...state, count: state.count+ 1};
  }
  return state;
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  it('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  it('should return object', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  it('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  it('should change state on dispatch', () => {
    store.dispatch({type: 'INCREMENT'});
    expect(store.getState().count).toBe(1);
  });

  it('should NOT change state on dispatch with incorrect action type', () => {
    store.dispatch({type: 'DECREMENT'});
    expect(store.getState().count).toBe(0);
  });

  it('should call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({type: 'INCREMENT'});
    expect(handler).toHaveBeenCalled();
  });

  it('should NOT call subscriber if unsubscribed', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();

    store.dispatch({type: 'INCREMENT'});
    expect(handler).not.toHaveBeenCalled();
  });
});
