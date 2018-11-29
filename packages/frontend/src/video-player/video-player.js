import 'aframe'
import registerComponent from '../utils/registerComponent';
import { observe } from 'mobx';
import { store } from '../state/state';

const videoPlayer = {
  schema: {
  },

  init: function () {
    observe(store.video, 'status', (change) => {
      const video = store.video
      this.updateVideoPlayer(video)
    })
  },

  updateVideoPlayer: function (video) {
    const status = video.status
    const selector = video.selector
    if (status === false) {
      this.el.setAttribute('visible', false)
      if (selector) {
        const videoEl = this.el.sceneEl.querySelector(selector)
        videoEl.pause()
        videoEl.currentTime = 0
      }
    }
    if (status === true) {
      const videoEl = this.el.sceneEl.querySelector(selector)
      this.el.setAttribute('visible', true)
      this.el.setAttribute('material', `src:${selector};`)
      videoEl.play()
    }
  }
}

export default registerComponent('video-player', videoPlayer)