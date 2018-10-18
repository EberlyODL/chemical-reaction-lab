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
    // initially set up the current position
    this.currentPosition = null

    // get the current position
    setInterval(() => {
      this.updatePosition()
    }, 3000);
  },

  updatePosition: function () {
    // get current position
    const _currentPosition = Object.assign({}, this.el.object3D.position)
    // diff the objects to check if the user moved
    // store the position for diffing
    this.currentPosition = Object.assign({}, _currentPosition);
    this.storePosition(_currentPosition)
  },

  storePosition: function (position: any) {
  }
}

export default registerComponent('track-movement', trackMovement)