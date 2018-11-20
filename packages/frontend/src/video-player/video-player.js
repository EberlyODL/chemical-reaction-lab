import 'aframe'
import registerComponent from '../utils/registerComponent';
import { observe, autorun } from 'mobx';
import { store } from '../state/state';

const videoPlayer = {
  schema: {
  },

  init: function () {
    observe(store.video, change => this.updateVideoPlayer(store.video))
  },

  updateVideoPlayer: function (video) {
    if (video.status === 'off') {
      this.el.setAttribute('visible', false)
      if (video.video) {
        const videoEl = this.el.sceneEl.querySelector(video.video)
        videoEl.stop()
      }
    }
    if (video.status === 'on') {
      const videoEl = this.el.sceneEl.querySelector(video.video)
      this.el.setAttribute('visible', true)
      this.el.setAttribute('material', `src:${video.video};`)
      videoEl.play()
    }
  }
}

export default registerComponent('video-player', videoPlayer)