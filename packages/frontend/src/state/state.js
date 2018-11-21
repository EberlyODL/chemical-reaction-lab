import { observable, reaction, autorun, trace, observe } from 'mobx';
import { videoMatrix } from './constants'
import { isEqual } from 'lodash'

export const store = observable({
  video: {
    status: false,
    selector: null,
    id: null
  },
  hud: {
    lights: {
      redLight: false,
      greenLight: false
    },
    active: false
  },
  selectedObjects: [],
  get activeVideoCombination() {
    return videoMatrix.find(v => isEqual(v.combination, this.selectedObjects))
  }
});

/**
 * on change of selected Objects calculate the hud lights
 */
observe(store.selectedObjects, change => {
  const combo = store.activeVideoCombination
  if (combo) {
    store.hud.lights.redLight = false
    store.hud.lights.greenLight = true
  }
  else {
    store.hud.lights.redLight = true
    store.hud.lights.greenLight = false
  }
}, true)

autorun(() => {
  console.log(store.hud.active)
  trace()
})