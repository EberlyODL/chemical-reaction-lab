import 'aframe'
import 'aframe-extras'
import 'aframe-look-at-component'
import 'aframe-gui'
import 'aframe-physics-system'
import 'aframe-event-set-component'
import 'aframe-physics-extras'
import 'aframe-motion-capture-components'
import 'aframe-log-component'
import 'aframe-video-controls'
import 'aframe-animation-component'
import 'aframe-gltf-part-component'
import '@odl/aframe-droppable-surface-component'
import '@odl/aframe-raycaster-follower-component'
import 'three'
// import './state/state'
// import './selectable-component'
import './camera/index'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import './bottle/bottle-component'
import './follow/follow-component'
import './touching/touching-component'
import './video-player/video-player'
import './lab-light/lab-light-component'
import './active-item-indicator/active-item-indicator'
import './hud/hud'
import './video-player/video-player'
// import './state/orchestration'
import './track-movement/track-movement'
import { setElementsTrackedPositions, updateTrackedElement, resetTrackedElements } from './apollo/trackedElements'
import { login } from "./apollo/user";
import { $selectedObjects, selectObject, unselectObject, findVideo } from './apollo/selectedObjects';
import { store } from './state/state';
import { videoMatrix } from './state/constants'
import { autorun, observe } from 'mobx';

document.addEventListener('DOMContentLoaded', async () => {
  // get the scene
  const scene = document.querySelector('a-scene')
  // login
  const userId = await login()
  if (userId) {
    // when the app loads, set the default positions
    await setElementsTrackedPositions({ scene })
    // select objects
    $selectedObjects.subscribe(res => res)
  }

  scene.addEventListener('touching-ended', e => {
    const inventoryId = e.target.dataset.inventoryId
    if (inventoryId) {
      store.selectedObjects.remove(inventoryId)
      // unselectObject(inventoryId)
    }
  })

  // listen for bottles touching each other
  scene.addEventListener('touching-initiated', e => {
    const inventoryId = e.target.dataset.inventoryId
    const exists = store.selectedObjects.find(i => i === inventoryId)
    if (!exists) {
      store.selectedObjects.push(inventoryId)
    }
    // selectObject(inventoryId)
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

  scene.addEventListener('hud-button-initiate-clicked', e => {
    // if the video is off then we want to find out if this i
    const status = store.video.status
    if (status === false) {
      if (store.activeVideoCombination) {
        store.video.selector = store.activeVideoCombination.video
        store.video.id = store.activeVideoCombination.id
        store.video.status = true
      }
    }
    if (status === true) {
      store.video.status = false
    }
  })
})

window.CRL_STATE = store