import registerComponent from "../utils/registerComponent";
import { store } from "../state/state";
import { observe } from "mobx";

const hudLight = {
  schema: {
    light: { type: 'string' }
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    observe(store.hud.lights, this.data.light, change => {
      this.lightChanged(change.newValue)
    }, true)
  },

  lightChanged: function (status) {
    this.el.setAttribute('visible', status)
  }

}

export default registerComponent('hud-light', hudLight)