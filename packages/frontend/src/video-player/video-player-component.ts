import 'aframe'
import { store, getVideoSrc, VideoPlayerStatus, findActiveCombination } from '../state/redux';
import registerComponent from '../utils/registerComponent';
declare const AFRAME: any
declare const THREE: any

const videoPlayer:any = {
  schema: {
  },

  init: function () {
    this._isPlaying = false
    // check the store and subscribe to any changes
    this._stateChanged()
    this.subscribe = store.subscribe(() => {
      this._stateChanged()
    })
  },

  _stateChanged: function () {
    const state = store.getState()
    const combination = findActiveCombination(state)

    if (combination && this._isPlaying === false) {
      this.playVideo(combination.video)
    }
    if (!combination && this._isPlaying !== false) {
      this.destroyVideo(this._isPlaying)
    }
  },

  playVideo: function (video: string) {
    // add the plane template
    const node = document.createElement('a-entity')
    node.setAttribute('template', 'src:#videoPlayerTemplate')
    node.setAttribute('data-src', video)
    this.el.appendChild(node)
    // Dim the lights
    // this.el.sceneEl.querySelector('#light-lab').setAttribute('visible', false)
    // find the video source and click play
    this.el.sceneEl.querySelector(video).play()
    this._isPlaying = video
  },

  destroyVideo: function (video:string) {
    // Destroy the template
    this.el.innerHTML = ''
    // Dim the lights
    // this.el.sceneEl.querySelector('#light-lab').setAttribute('visible', true)
    // find the video source and click play
    // this.el.sceneEl.querySelector(video).pause()
    this._isPlaying = false
  },
}

export default registerComponent('video-player', videoPlayer)