import 'aframe'
import 'three'
import 'aframe-extras'
// import 'aframe-html-shader'
// import 'aframe-animation-timeline-component'
import 'aframe-look-at-component'
// import { client } from './state/graphql'
import 'aframe-gui'
import './shaders/FresnelShader'
import './state/byhand'
import './selectable-component'
import './camera'
import './hud/hud-button-component'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import './bottle/bottle-component.ts'
import { Positions } from './camera/variables';
import switchCameraPosition from './camera/switchCameraPosition';

document.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('loaded', (e) => {
    switchCameraPosition(Positions.stockroom)
  })
})