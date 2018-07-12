import 'aframe'
import 'aframe-extras'
import 'aframe-look-at-component'
// import 'aframe-gui'
import 'aframe-physics-system'
import 'aframe-event-set-component'
import 'aframe-physics-extras'
import 'aframe-motion-capture-components'
import 'aframe-log-component'
import 'aframe-template-component'
import 'aframe-video-controls'
import 'three'
import 'tslib'
// import 'aframe-html-shader'
// import 'aframe-animation-timeline-component'
// import { client } from './state/graphql'
// import './shaders/FresnelShader'
// import './state/byhand'
// import { store, addSelectedItem } from './store'
// import { selectedItemsObservable, addSelectedItem } from './state/microstates'
import './selectable-component'
import './camera'
import './hud/hud-button-component'
import './hud/hud-selected-items'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import './bottle/bottle-component.ts'
import './follow/follow-component'
import './touching/touching-component'
import './video-player/video-player-component'

document.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('loaded', (e) => {

  })
})
