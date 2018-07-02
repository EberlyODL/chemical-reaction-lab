import 'aframe'
import 'aframe-state-component'
declare const AFRAME:any

const register = () => {
  AFRAME.registerComponent('lab-table', {
    init: function () {
      console.log('onStateUpdate')
    },
    onStateUpdate: function (state:any) {
      console.log(state)
    }
  })
}

export default register()