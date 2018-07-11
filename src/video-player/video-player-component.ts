import 'aframe'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux';
declare const AFRAME: any
declare const THREE: any

const register = () => {
  AFRAME.registerComponent('video-player', {
    schema: {
    },

    init: function () {
      this.subscribe = store.subscribe(() => {
        const state = store.getState()
        const selectedItems = state.selectedItems
        // find out if the combination is available
      })
    },

  });
}

export default register()