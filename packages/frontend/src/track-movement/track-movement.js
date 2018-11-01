import 'aframe'
import registerComponent from '../utils/registerComponent';

const trackMovement = {
  schema: {
    threshold: { type: 'number', default: 50 }
  },

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
    const threshold = this.data.threshold
    // get current position
    const _currentPosition = Object.assign({}, {
      x: Math.round(threshold*this.el.object3D.position.x) / threshold,
      y: Math.round(threshold*this.el.object3D.position.y) / threshold,
      z: Math.round(threshold*this.el.object3D.position.z) / threshold
    })
    // and if the current position is different from the old position
    const changed =  (JSON.stringify(_currentPosition) !== JSON.stringify(this.currentPosition) && this.currentPosition !== null)
    // store the position for diffing
    this.currentPosition = Object.assign({}, _currentPosition);
    if (changed) {
      // then emit change event
      this.el.emit('track-movement', { position: this.currentPosition, rotation: this.el.getAttribute('rotation') }, true)
    }
  }
}

export default registerComponent('track-movement', trackMovement)