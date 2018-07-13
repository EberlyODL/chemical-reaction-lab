import 'aframe'
import registerComponent from '../utils/registerComponent';
import { store, LightStates, findActiveCombination } from '../state/redux';
declare const AFRAME: any

const labLight:any = {
  init: function () {
    this._status = 'on'
    // check the store and subscribe to any changes
    this.__storeChanged()
    this.subscribe = store.subscribe(() => {
      this.__storeChanged()
    })
  },

  __storeChanged: function () {
    const state = store.getState()

    // Check if there is a good combination
    const activeCombination = findActiveCombination(state) ? findActiveCombination(state) : false

    // dim the lights
    if (activeCombination && this._status !== 'dimmed') {
      this.dimLights()
    }

    // turn the lights on
    if (!activeCombination && this._status !== 'on') {
      this.turnLightsOn()
    }
  },

  turnLightsOn: function () {
    AFRAME.utils.entity.setComponentProperty(this.el, 'template', { src: '#dimLightsUpTemplate'})
    this._status = 'on'
  },

  dimLights: function () {
    AFRAME.utils.entity.setComponentProperty(this.el, 'template', { src: '#dimLightsDownTemplate'})
    this._status = 'dimmed'
  }
}

export default registerComponent('lab-light', labLight)