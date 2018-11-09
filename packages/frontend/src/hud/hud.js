import * as d3 from 'd3'
import { selectedObjects } from '../apollo/selectedObjects'

AFRAME.registerComponent('hud', {
  schema: {
    dampen: { 'number': 3 }
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    this.vec3 = new THREE.Vector3()
    this._camera = this.el.sceneEl.querySelector('#camera');
    this._initialPosition = this.el.object3D.position
  },

  update: function () {
  },

  tick: function () {
  },

  /**
   * @todo: needs work
   */
  updatePosition: function () {
    if (this._camera) {
      // get position of camera
      const yRotationScale = d3.scaleLinear().domain([-1,1]).range([-90, 90])
      const cameraDirection = this._camera.object3D.getWorldDirection()
      // const cameraDirectionY = (yRotationScale(cameraDirection.y) * Math.sin(.003)) - this._initialPosition.y
      const cameraDirectionY = this._initialPosition.y - yRotationScale(cameraDirection.y) * Math.sin(.1)
      const newPosition =  Object.assign({}, this._initialPosition, { y: cameraDirectionY })
      this.el.setAttribute('position', newPosition)
    }
  },

})