import './hud-reagents'
import '../apollo/selectedObjects'
import client from '../apollo/client'
import { login } from '../apollo/user'
import { GET_SELECTED_OBJECTS, findVideo } from '../apollo/selectedObjects';
import registerComponent from '../utils/registerComponent';
import { store } from '../state/state';
import { observe } from 'mobx';

const hudReagents = {
  schema: {
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: async function () {
    this.vec3 = new THREE.Vector3()
    this._camera = this.el.sceneEl.querySelector('#camera');
    this._initialPosition = Object.assign({}, this.el.object3D.position)
    this._video = null

    // observe changes to selected objects
    observe(store.selectedObjects, this.selectedObjectsUpdated.bind(this))
  },

  update: function () {
  },

  selectedObjectsUpdated: function (e) {
    this.updateText(store.selectedObjects)
  },

  updateText: function (selectedObjects) {
    const text = selectedObjects
      // add an enter
      .join(`

      `)
    this.el.setAttribute('value', text)
  }
}

export default registerComponent('hud-reagents', hudReagents)