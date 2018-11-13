import * as d3 from 'd3'
import '../apollo/selectedObjects'
import client from '../apollo/client'
import { login } from '../apollo/user'
import { GET_SELECTED_OBJECTS, findVideo } from '../apollo/selectedObjects';
import { playVideo, stopVideo } from '../state/video'
import { store$ } from '../state/state';

AFRAME.registerComponent('hud', {
  schema: {
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: async function () {
    this.vec3 = new THREE.Vector3()
    this._camera = this.el.sceneEl.querySelector('#camera');
    this._initialPosition = this.el.object3D.position
    this._video = null

    const userId = await login()
    client.watchQuery({
      query: GET_SELECTED_OBJECTS,
      variables: {
        id: userId
      }
    }).subscribe(({ data: { user: { selectedObjects } } }) => {
      // get slected Objects
      this._selectedObjects = selectedObjects
      this.renderHub()
    })

    store$.subscribe(state => {
      this._state = state
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
      // calculate a domain range to get xDomain.
      const cameraDirection = this._camera.object3D.getWorldDirection()
      const positionScale = d3.scaleLinear().domain([0.4, 0.8]).range([-1.174, -0.3])
      // hook up y
      if (
        cameraDirection.y > 0.4 && cameraDirection.y < 0.8
      ) {
        const cameraDirectionY = positionScale(cameraDirection.y)
        let newPosition = Object.assign({}, this._initialPosition, { y: cameraDirectionY })
        this.el.setAttribute('position', newPosition)
      }
    }
  },

  renderHub: function () {
    // this.renderSelectedObjects()
    // this.renderReagentsMixtureButtonTemplate()
  },

  renderSelectedObjects: function () {
    const container = document.createElement('a-entity')
    // set the reagents text
    this._selectedObjects.forEach((object, index) => {
      const node = document.createElement('a-text')
      node.setAttribute('value', object.name)
      node.setAttribute('position', `0 ${index * -.3} 0`)
      container.appendChild(node)
    });
    const template = this.el.querySelector('.reagentsTemplate')
    template.innerHTML = ''
    template.appendChild(container)
  },

  renderReagentsMixtureButtonTemplate: function () {
    this._video = findVideo(this._selectedObjects)
    const button = this.el.querySelector('#mixReagentsButton')
    if (this._video) {
      button.querySelector('.message').setAttribute('visible', false)
      button.querySelector('.box').setAttribute('material', 'color: green')
    }
    else {
      button.querySelector('.message').setAttribute('visible', true)
      button.querySelector('.box').setAttribute('material', 'color: gray')
    }
  },

  hudClicked: function (e) {
    const state = this._state
    const video = findVideo(this._selectedObjects)
    if (this._state.video.status === 'off') {
      playVideo(state, video)
    }
    if (state.video.status === 'on') {
      stopVideo(state)
    }
    // // convert path NodeList to array
    // var parents = [].slice.call(e.path);
    // // see if they clicked mixReagentsButton
    // const mixReagentsbutton = parents.find(i => i.id === 'mixReagentsButton')
    // if (mixReagentsbutton && this._video) {
    //   playVideo(this._video)
    // }
  }

})