import 'aframe'
import client from '../apollo/client'
import registerComponent from '../utils/registerComponent';
import { isEqual } from 'lodash'
import { store$ } from '../state/state';

const videoPlayer = {
  schema: {
  },

  init: function () {
    this._state = null
    this._subscription = store$.subscribe(({video}) => {
      console.log('video', video);
      if (!isEqual(this._video, video)) {
        // something change
        this._video = video
        this.update()
      }
    })
  },

  update: function () {
    if (this._video.status === 'off') {
      this.el.setAttribute('visible', false)
      if (this._videoId) {
        const videoEl = this.el.sceneEl.querySelector(this._video.videoId)
        videoEl.stop()
      }
    }
    if (this._video.status === 'on') {
      const videoEl = this.el.sceneEl.querySelector(this._video.videoId)
      this.el.setAttribute('visible', true)
      this.el.setAttribute('material', `src:${this._video.videoId};`)
      videoEl.play()
    }
  }
}

export default registerComponent('video-player', videoPlayer)