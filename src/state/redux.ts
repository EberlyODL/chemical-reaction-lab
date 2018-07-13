import { createStore } from 'redux'
import { createAction, handleActions, combineActions } from 'redux-actions';
import { effects } from './reduxEffects'
import { filter } from '../../node_modules/@types/async';

export enum LightStates {
  on = "on",
  off = "off",
  dimmed = "dimmed"
}

export enum VideoPlayerStatus {
  on = "on",
  off = "off"
}

export interface VideoPlayer {
  status?: VideoPlayerStatus,
  activeVideo?: string
}

export interface Lights {
  status?: LightStates
}

export interface State {
  counter?: number,
  selectedItems?: string[]
  videoPlayer?: VideoPlayer
  lights?: Lights
}

// State
export const defaultState:State = {
  counter: 10,
  selectedItems: [],
  videoPlayer: {
    status: VideoPlayerStatus.off,
    activeVideo: ''
  },
  lights: {
    status: LightStates.on
  }
}

interface VideoMatrixItem {
  id?: number,
  combination?: string[],
  video?: string
}

// Constants
export const videoMatrix:VideoMatrixItem[] = [
  { id: 3, combination: ['CuOH2', 'bunsenburner'], video: '#reagentvid-3' },
  { id: 7, combination: ['magnesiumstrips', 'bunsenburner'], video: '#reagentvid-7' },
  { id: 9, combination: ['3MHCl', '1MNa2CO3'], video: '#reagentvid-9' },
  { id: 10, combination: ['', 'copperstrips'], video: '#reagentvid-10' },
  { id: 13, combination: ['013CuSO4', 'magnesiumstrips'], video: '#reagentvid-13' },
  { id: 14, combination: ['01MCaCl2', '01MNa2CO3'], video: '#reagentvid-14' },
  { id: 15, combination: ['3MHCl', '3MNaOH'], video: '#reagentvid-15' },
  { id: 16, combination: ['03MAgNO3', '01MCaCl2'], video: '#reagentvid-16' },
  { id: 17, combination: ['03MAgNO3', '01MNaBr'], video: '#reagentvid-17' },
  { id: 18, combination: ['03MAgNO3', '01MKI'], video: '#reagentvid-18' },
]

// Actions
export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')
export const addSelectedItem = createAction('ADD_SELECTED_ITEM')
export const removeSelectedItem = createAction('REMOVE_SELECTED_ITEM')
export const startVideo = createAction('START_VIDEO')
export const stopVideo = createAction('STOP_VIDEO')
export const dimLights = createAction('DIM_LIGHTS')

// Functions
export const findActiveCombination = (state:any) => {
  const selectedItems = state.selectedItems
  const combination = videoMatrix.find((i:any) => {
    let includes = true;
    i.combination.forEach((e: any) => {
      if (!selectedItems.includes(e)) {
        includes = false
      }
    });
    return includes
  })

  if (combination) {
    return combination
  }
  else {
    return null
  }
}

export const getVideoSrc = (videoId:VideoPlayer['activeVideo']) => {
  const video = videoMatrix.find(i => i.id === videoId)
  if (video) {
    return video.video
  }
  else {
    return null
  }
}

// Reducer
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

// Store
export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;