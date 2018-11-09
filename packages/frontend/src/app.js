import 'aframe'
import 'aframe-extras'
import 'aframe-look-at-component'
import 'aframe-gui'
import 'aframe-physics-system'
import 'aframe-event-set-component'
import 'aframe-physics-extras'
import 'aframe-motion-capture-components'
import 'aframe-log-component'
import 'aframe-template-component'
import 'aframe-video-controls'
import 'aframe-animation-component'
import '@odl/aframe-droppable-surface-component'
import '@odl/aframe-raycaster-follower-component'
import 'three'
import './selectable-component'
import './camera/index'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import './bottle/bottle-component'
import './follow/follow-component'
import './touching/touching-component'
import './video-player/video-player-component'
import './lab-light/lab-light-component'
import './active-item-indicator/active-item-indicator'
import './hud/hud'
// import './state/orchestration'
import './track-movement/track-movement'
import { setElementsTrackedPositions, updateTrackedElement, resetTrackedElements } from './apollo/trackedElements'
import client from './apollo/client';
import { login } from "./apollo/user";
import { selectedObjects, selectObject, unselectObject } from './apollo/selectedObjects';
// // import 'aframe-html-shader'
// // import 'aframe-animation-timeline-component'
// // import { client } from './state/graphql'
// // import './shaders/FresnelShader'
// // import './state/byhand'
// // import { store, addSelectedItem } from './store'
// // import { selectedItemsObservable, addSelectedItem } from './state/microstates'
// // import './hud/hud-button-component'
// // import './hud/hud-selected-items'

document.addEventListener('DOMContentLoaded', async () => {
  // get the scene
  const scene = document.querySelector('a-scene')
  // login
  const userId = await login()
  if (userId) {
    // when the app loads, set the default positions
    // await setElementsTrackedPositions({ scene })
    // select objects
    const $selectedObjects = await selectedObjects()
    $selectedObjects.subscribe(res => {
      console.log(res)
    })
  }
  scene.addEventListener('touching-ended', e => {
    const inventoryId = e.target.dataset.inventoryId
    if (inventoryId) {
      unselectObject(inventoryId)
    }
  })
  scene.addEventListener('loaded', (e) => {
    // listen for bottles touching each other
    scene.addEventListener('touching-initiated', e => {
      const inventoryId = e.target.dataset.inventoryId
      selectObject(inventoryId)
    })
    // update track position when an element moves in the scene
    scene.addEventListener('track-movement', e => {
      const properties = e.detail
      const elementId = e.target.id
      updateTrackedElement({ properties, elementId })
    })
    scene.addEventListener('track-movement-reset', e => {
      // resetTrackedElements()
    })
  })
})