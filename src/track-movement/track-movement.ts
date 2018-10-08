import 'aframe'
import registerComponent from '../utils/registerComponent';
import { store, updatePosition } from '../state/redux';
declare const AFRAME: any
declare const THREE: any

const trackMovement: any = {

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    // check the store and subscribe to any changes
    this.__storeChanged()
    this.subscribe = store.subscribe(() => {
      this.__storeChanged()
    })

    // initially set up the current position
    this.currentPosition = null

    // get the current position
    setInterval(() => {
      this.updatePosition()
    }, 3000);
  },

  __storeChanged: function () {
    const state = store.getState()

    // look for a default position if we dont' have one
    if (typeof state.position !== 'undefined' && !this.currentPosition) {
      this.currentPosition = state.position
    }
  },

  updatePosition: function () {
    // get current position
    const _currentPosition = this.el.object3D.position
    // diff the objects to check if the user moved
    const diff = Object.is(_currentPosition, this.currentPosition)
    // if there is a difference then store it
    if (diff) {
      this.storePosition(_currentPosition)
    }
    // store the position for diffing
    this.currentPosition = Object.assign({}, _currentPosition);
  },

  storePosition: function (position: any) {
    console.log('position', position);
    updatePosition(position)
  }
}

export default registerComponent('track-movement', trackMovement)