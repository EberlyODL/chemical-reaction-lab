import * as d3 from 'd3'
import '../apollo/selectedObjects'
import client from '../apollo/client'
import { login } from '../apollo/user'
import { GET_SELECTED_OBJECTS, findVideo } from '../apollo/selectedObjects';

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
      const positionScale = d3.scaleLinear().domain([0.4, 0.8]).range([-2, -0.5])
      const cameraDirection = this._camera.object3D.getWorldDirection()
      // hook up y
      if (cameraDirection.y > 0.4 && cameraDirection.y < 0.8) {
        const cameraDirectionY = positionScale(cameraDirection.y)
        let newPosition = Object.assign({}, this._initialPosition, { y: cameraDirectionY })
        this.el.setAttribute('position', newPosition)
      }
    }
  },

  renderHub: function () {
    this.renderSelectedObjects()
    this.renderReagentsMixtureButtonTemplate()
  },

  renderSelectedObjects() {
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

  renderReagentsMixtureButtonTemplate() {
    const video = findVideo(this._selectedObjects)
    const button = this.el.querySelector('#mixReagentsButton')
    if (video) {
      button.querySelector('.message').setAttribute('visible', false)
      button.querySelector('.box').setAttribute('material', 'color: green')
    }
    else {
      button.querySelector('.message').setAttribute('visible', true)
      button.querySelector('.box').setAttribute('material', 'color: gray')
    }
  }

})