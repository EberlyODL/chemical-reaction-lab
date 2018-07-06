import 'aframe'
import 'three'
import 'aframe-extras'
import 'aframe-html-shader'
import 'aframe-mouse-cursor-component'
import 'tslib'
// import 'aframe-html-shader'
// import 'aframe-animation-timeline-component'
import 'aframe-look-at-component'
// import { client } from './state/graphql'
import 'aframe-gui'
import './shaders/FresnelShader'
// import './state/byhand'
import { store, addSelectedItem } from './store'
import './selectable-component'
import './camera'
import './hud/hud-button-component'
import './hud/hud-selected-items'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import './bottle/bottle-component.ts'
import { Positions } from './camera/variables';
import switchCameraPosition from './camera/switchCameraPosition';

document.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('loaded', (e) => {
    // start in the stockroom
    switchCameraPosition(Positions.stockroom)
    // add items to the selected items
    store.dispatch(addSelectedItem('3MHCl'))
  })
})
