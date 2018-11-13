import '../apollo/selectedObjects'
import client from '../apollo/client'
import { login } from '../apollo/user'
import { GET_SELECTED_OBJECTS, findVideo } from '../apollo/selectedObjects';
import { videoState } from '../state/video';
import { autorun, observe } from 'mobx';
import { observable } from 'rxjs';
import { bringUpHudOnLookDown, panOnLeftRight } from './hud-movements';
import registerComponent from '../utils/registerComponent';

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
    this._video = null

    const userId = await login()
    client.watchQuery({
      query: GET_SELECTED_OBJECTS,
      variables: {
        id: userId
      }
    }).subscribe(({ data: { user: { selectedObjects } } }) => {
      this._selectedObjects = selectedObjects
    })

    observe(videoState, 'status', (change) => {
      this.videoStatusChanged(change)
    })

    this.el.addEventListener('click', this.hudClicked.bind(this))
  },

  remove: function () {
    this.el.removeEventListener('click', this.hudClicked)
  },

  update: function () {
  },

  tick: function () {
    this.updatePosition()
  },

  /**
   * @todo: needs work
   */
  updatePosition: function () {
    if (this._camera) {
      const cameraDirection = this._camera.object3D.getWorldDirection()
      const el = this.el
      const initialPosition = this._initialPosition
      if (videoState.status === 'off') {
        bringUpHudOnLookDown({ cameraDirection, el, initialPosition })
      }
      if (videoState.status === 'on') {
        panOnLeftRight({ cameraDirection, el })
      }
    }
  },

  hudClicked: function (e) {
    const video = findVideo(this._selectedObjects)
    const _videoStatus = videoState.status
    if (_videoStatus === 'off') {
      videoState.videoId = video.video
      videoState.status = 'on'
    }
    if (_videoStatus === 'on') {
      videoState.status = 'off'
    }
    // // convert path NodeList to array
    // var parents = [].slice.call(e.path);
    // // see if they clicked mixReagentsButton
    // const mixReagentsbutton = parents.find(i => i.id === 'mixReagentsButton')
    // if (mixReagentsbutton && this._video) {
    //   playVideo(this._video)
    // }
  },

  videoStatusChanged: function ({newValue, oldValue}) {
    console.log(this._initialPosition)
    if (newValue === 'on') {
      this.el.setAttribute('position', Object.assign({}, this.el.object3D.position, { y: 0, z: -0.16 }))
    }
    if (newValue === 'off') {
      this.el.setAttribute('position', Object.assign({}, this._initialPosition))
    }
  }

}

export default registerComponent('hud', hud)