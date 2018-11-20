import registerComponent from '../utils/registerComponent';

const hudButtonInitiate = {
  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    this.el.addEventListener('click', this.clickHandler.bind(this))
  },

  remove: function () {
    this.el.removeEventListener('click', this.clickHandler.bind(this))
  },

  clickHandler: function (e) {
    this.el.emit('hud-button-initiate-clicked', {}, true)
  }
}

export default registerComponent('hud-button-initiate', hudButtonInitiate)