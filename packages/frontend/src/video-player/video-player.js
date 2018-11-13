import 'aframe'
import client from '../apollo/client'
import registerComponent from '../utils/registerComponent';
import { isEqual } from 'lodash'
import { autorun } from 'mobx';
import { videoState } from '../state/video';
// import { store$ } from '../state/state';

const videoPlayer = {
  schema: {
  },

  init: function () {
    autorun(() => {
      this.update()
    })
  },

  update: function () {
    const video = Object.assign({}, videoState)
    if (video.status === 'off') {
      this.el.setAttribute('visible', false)
      if (video.videoId) {
        const videoEl = this.el.sceneEl.querySelector(video.videoId)
        videoEl.stop()
      }
    }
    if (video.status === 'on') {
      const videoEl = this.el.sceneEl.querySelector(video.videoId)
      this.el.setAttribute('visible', true)
      this.el.setAttribute('material', `src:${video.videoId};`)
      videoEl.play()
    }
  }
}

export default registerComponent('video-player', videoPlayer)