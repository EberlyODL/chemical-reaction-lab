import 'aframe'
import registerComponent from '../utils/registerComponent';
declare const AFRAME: any

const labLight:any = {
  init: function () {
    console.log('asdf')
  }
}

export default registerComponent('lab-light', labLight)