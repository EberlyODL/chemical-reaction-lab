import 'aframe'
declare const AFRAME:any
import { Position, positions } from './variables'
import getCameraPosition from './getCameraPosition'

const registerComponent = () => {
  AFRAME.registerComponent('camera-cycle', {
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
      const scene = document.querySelector('a-scene')
      const camera = document.querySelector('#camera1')
      this.el.addEventListener('click', () => {
        updateCameraPosition(camera, 'stockroom')
      })
    }
  })
}


const updateCameraPosition = function (el: any, position: Position['id']) {
  const p = getCameraPosition(position)
  el.setAttribute('position', p.position)
  el.setAttribute('rotation', p.rotation)
}

export default registerComponent()