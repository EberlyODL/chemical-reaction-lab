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
import { filter } from '../../node_modules/@types/async';

const defaultState = { counter: 10, selectedItems: [] };

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')
export const addSelectedItem = createAction('ADD_SELECTED_ITEM')
export const removeSelectedItem = createAction('REMOVE_SELECTED_ITEM')

const reducer = handleActions(
  {
    [increment]: (state:any) => ({ ...state, counter: state.counter + 1 }),
    [addSelectedItem]: (state:any, action:any) => {
      const _newItems = [...state.selectedItems.filter((i:any) => i !== action.payload), action.payload]
      return ({ ...state, selectedItems: _newItems }) 
    },
    [removeSelectedItem]: (state:any, action:any) => {
      const _new = state.selectedItems.filter((i:any) => i !== action.payload)
      return ({ ...state, selectedItems: _new }) 
    },
  },
  defaultState
);

export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;