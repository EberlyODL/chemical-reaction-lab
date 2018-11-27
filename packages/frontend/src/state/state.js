import { observable, reaction, autorun, trace, observe } from 'mobx';
import { videoMatrix } from './constants'

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
    // return videoMatrix.find(v => v.combination, this.selectedObjects)
    return videoMatrix.find(v => {
      const selectedObjects = this.selectedObjects 
      const combination = v.combination
      let combo = true
      // make sure then the selected objects are the same length
      if (selectedObjects.length !== combination.length) return false
      // see if one isn't in the selected object
      selectedObjects.forEach(i => {
        if (!combination.includes(i)) {
          combo = false
        }
      })
      return combo
    })
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