import 'aframe'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux';
import registerComponent from '../utils/registerComponent';
declare const AFRAME: any
declare const THREE: any

const videoPlayer:any = {
  schema: {
  },

  init: function () {
    this._isPlaying = false
    this._matrix = [
      { id: 3, combination: ['CuOH2', 'bunsenburner'], video: '#reagentvid-3' },
      { id: 7, combination: ['magnesiumstrips', 'bunsenburner'], video: '#reagentvid-7' },
      { id: 9, combination: ['3MHCl', '1MNa2CO3'], video: '#reagentvid-9' },
      { id: 10, combination: ['', 'copperstrips'], video: '#reagentvid-10' },
      { id: 13, combination: ['013CuSO4', 'magnesiumstrips'], video: '#reagentvid-13' },
      { id: 14, combination: ['01MCaCl2', '01MNa2CO3'], video: '#reagentvid-14' },
      { id: 15, combination: ['3MHCl', '3MNaOH'], video: '#reagentvid-15' },
      { id: 16, combination: ['03MAgNO3', '01MCaCl2'], video: '#reagentvid-16' },
      { id: 17, combination: ['03MAgNO3', '01MNaBr'], video: '#reagentvid-17' },
      { id: 18, combination: ['03MAgNO3', '01MKI'], video: '#reagentvid-18' },
    ]
    // check the store and subscribe to any changes
    this.__storeChanged()
    this.subscribe = store.subscribe(() => {
      this.__storeChanged()
    })
  },

  playVideo: function (video: string) {
    // add the plane template
    const node = document.createElement('a-entity')
    node.setAttribute('template', 'src:#videoPlayerTemplate')
    node.setAttribute('data-src', video)
    this.el.appendChild(node)
    // Dim the lights
    this.el.sceneEl.querySelector('#light-lab').setAttribute('visible', false)
    // find the video source and click play
    this.el.sceneEl.querySelector(video).play()
    this._isPlaying = video
  },

  destroyVideo: function (video) {
    // Destroy the template
    this.el.innerHTML = ''
    // Dim the lights
    this.el.sceneEl.querySelector('#light-lab').setAttribute('visible', true)
    // find the video source and click play
    this.el.sceneEl.querySelector(video).pause()
    this._isPlaying = null
  },

  __storeChanged: function () {
    const state = store.getState()
    const selectedItems: any = state.selectedItems
    const activeCombination = this._matrix.find((i: any) => {
      let includes = true;
      i.combination.forEach((e: any) => {
        if (!selectedItems.includes(e)) {
          includes = false
        }
      });
      return includes
    })
    // If we have an active combination then place in the video back in
    console.log(state)
    console.log(this._isPlaying)
    if (activeCombination && !this._isPlaying) {
      this.playVideo(activeCombination.video)
    }
    else {
      // check if the video was playing and now the user took something off 
      // of the table
      if (this._isPlaying) {
        this.destroyVideo(this._isPlaying)
      }
    }
  }
}

export default registerComponent('video-player', videoPlayer)