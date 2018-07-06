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

const defaultState = { counter: 10, selectedItems: [] };

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')
export const addSelectedItem = createAction('ADD_SELECTED_ITEM')

const reducer = handleActions(
  {
    INCREMENT: (state:any, action:any) => ({
      counter: state.counter + action.payload
    }),
​
    DECREMENT: (state:any, action:any) => ({
      counter: state.counter - action.payload
    }),

    ADD_SELECTED_ITEM: (state:any, action:any) => ({
      selectedItems: [...state.selectedItems, action.payload]
    }),
  },
  defaultState
);

export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;