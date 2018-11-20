import './hud-reagents'
import './hud-button-initiate'
import './hud-arrow'
import { videoState } from '../state/video';
import { observe } from 'mobx';
import { bringUpHudOnLookDown, panOnLeftRight } from './hud-movements';
import registerComponent from '../utils/registerComponent';
import { store } from '../state/state';

const hud = {
  schema: {
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: async function () {
    this.vec3 = new THREE.Vector3()
    this._camera = this.el.sceneEl.querySelector('#camera');
    this._initialPosition = Object.assign({}, this.el.object3D.position)
    this._initialRotation = Object.assign({}, this.el.object3D.rotation)

    observe(store.hud.lights, (change) => {
      this.toggleLight(change.name, newValue)
    })
    observe(store.video, 'status', (change) => {
      this.videoStatusChanged(change)
    })
    observe(store.hud, (change) => {
      this.hudStateChanged(change)
    })

    this.el.addEventListener('hud-button-initiate-clicked', this.hudInitiateButtonClicked.bind(this))
  },

  remove: function () {
    this.el.removeEventListener('click', this.hudClicked.bind(this))
    this.el.removeAttribute('hud-button-initiate-clicked', this.hudInitiateButtonClicked.bind(this))
  },

  update: function () {
  },

  tick: function () {
    this.updatePosition()
  },

  /**
   * Toggles the light animations on the hud on and off.
   * @param {string} light 
   */
  toggleLight: function (light, action) {
    const el = this.el.getElementById(`hub-lights-${light}`)
  },

  /**
   * @todo: needs work
   */
  updatePosition: function () {
    if (this._camera && store.hud.active) {
      const cameraDirection = this._camera.object3D.getWorldDirection()
      const el = this.el
      const initialPosition = this._initialPosition
      panOnLeftRight({ cameraDirection, el })
    }
  },

  hudInitiateButtonClicked: function (e) {
    this.el.removeAttribute('animation-mixer')
    this.el.setAttribute('animation-mixer', 'loop:once;')
  },

  videoStatusChanged: function ({newValue, oldValue}) {
    if (newValue === 'on') {
      this.el.setAttribute('position', Object.assign({}, this.el.object3D.position, { y: 0, z: -0.16 }))
    }
    if (newValue === 'off') {
      this.el.setAttribute('position', Object.assign({}, this._initialPosition))
    }
  },

  hudStateChanged: function ({newValue, oldValue, name}) {
    if (name === 'active') {
      if (newValue === true) {
        AFRAME.utils.entity.setComponentProperty(this.el, 'animation__position', {
          property: 'position',
          to: '0 -0.1 -0.1'
        });
        AFRAME.utils.entity.setComponentProperty(this.el, 'animation__rotation', {
          property: 'rotation',
          to: '0 -90 -10'
        });
      }
      if (newValue === false) {
        AFRAME.utils.entity.setComponentProperty(this.el, 'animation__position', {
          property: 'position',
          to: this._initialPosition
        });
        AFRAME.utils.entity.setComponentProperty(this.el, 'animation__rotation', {
          property: 'rotation',
          to: '0 -90 0'
        });

      }
    }
  }
}

export default registerComponent('hud', hud)