import 'aframe'
import registerComponent from '../utils/registerComponent';
import { store } from '../state/redux';
declare const AFRAME: any

const labLight:any = {
  init: function () {
    // check the store and subscribe to any changes
    this.__storeChanged()
    this.subscribe = store.subscribe(() => {
      this.__storeChanged()
    })
  },

  __storeChanged: function () {
    const state = store.getState()
    console.log(state)
  }
}

export default registerComponent('lab-light', labLight)