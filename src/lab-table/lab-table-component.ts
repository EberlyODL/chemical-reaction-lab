import 'aframe'
import 'aframe-state-component'
declare const AFRAME:any

const register = () => {
  AFRAME.registerComponent('lab-table', {
    init: function () {
      // this.el.appendChgil
    },
    onStateUpdate: function (state:any) {
      console.log(state)
    }
  })
}

export default register()