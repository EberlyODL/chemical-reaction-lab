import 'aframe'
import registerComponent from '../utils/registerComponent';

const jump = {
  schema: {
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3()

    // click handler
    this.el.addEventListener('click', this.clickHandler.bind(this))
  },

  clickHandler: function (e) {
    const intersection = e.detail.intersection.point
    console.log('intersection', intersection);
    this.move(intersection)
  },

  move: function (direction) {
    const cameraPosition = this.el.sceneEl.camera.el.object3D.position
    const newPosition = Object.assign({}, direction, { y: cameraPosition.y }) 
    this.el.sceneEl.camera.el.setAttribute('position', newPosition)
  }

}

export default registerComponent('jump', jump)