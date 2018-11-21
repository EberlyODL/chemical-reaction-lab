import registerComponent from '../utils/registerComponent';
import { store } from '../state/state';
import { observe, set } from 'mobx';

const hudArrow = {
  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    this.el.setAttribute('geometry', 'height:2; depth:13.71')
    this.el.setAttribute('material', 'color:pink; side:both; opacity:0')
    this.el.setAttribute('scale', '0.4 0.4 0.4')
    this.el.addEventListener('click', this.clickHandler.bind(this))

    this.hudChanged(store.hud.active)
    observe(store.hud, (change) => {
      if (change.name === 'active') {
        this.hudChanged(change.newValue)
      }
    })
  },

  remove: function () {
    this.el.removeEventListener('click', this.clickHandler.bind(this))
  },

  hudChanged: function (status) {
    if (status === true) {
      switch (this.el.id) {
        case 'hud-activate-arrow':
          this.el.setAttribute('visible', false)
          break;
        case 'hud-deactivate-arrow':
          this.el.setAttribute('visible', true)
          break;
        default:
          break;
      }
    }
    if (status === false) {
      switch (this.el.id) {
        case 'hud-activate-arrow':
          this.el.setAttribute('visible', true)
          break;
        case 'hud-deactivate-arrow':
          this.el.setAttribute('visible', false)
          break;
        default:
          break;
      }
    }
  },

  clickHandler: function (e) {
    switch (this.el.id) {
      case 'hud-activate-arrow':
        store.hud.active = true
        break;
      case 'hud-deactivate-arrow':
        store.hud.active = false
        break;
      default:
        break;
    }
  }
}

export default registerComponent('hud-arrow', hudArrow)