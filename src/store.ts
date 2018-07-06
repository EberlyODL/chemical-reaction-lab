// import { createAction, handleAction, createStore } from 'redux-actions'
// import { InventoryItem } from '../inventory/variables';

// const defaultState = {
//   selectedItems: [],
// }

// const addSelectedItem = createAction('ADD_SELECTED_ITEM');

// const reducer = handleAction(addSelectedItem, (state:any, action:any) => ({
//     ...state,
//     selectedItems: state.selectedItems.push(action)
//   }),
//   defaultState
// );

// const store = createStore(reducer, defaultState);

import { createStore } from 'redux'
import { createAction, handleActions, combineActions } from 'redux-actions';

const defaultState = { counter: 10 };

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')

const reducer = handleActions({
    [combineActions(increment, decrement)]: (
      state,
      { payload: { amount } }
    ) => {
      return { ...state, counter: state.counter + amount };
    }
  },
  defaultState
);

export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;