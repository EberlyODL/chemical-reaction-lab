import { observable, reaction, autorun, trace } from 'mobx';
import { videoMatrix } from './constants'
import { isEqual } from 'lodash'

export const store = observable({
  video: {
    status: "off",
    video: null
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

autorun(() => {
  console.log(store.hud.active)
  trace()
})