import 'aframe'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux';
declare const AFRAME: any
declare const THREE: any

const register = () => {
  AFRAME.registerComponent('video-player', {
    schema: {
    },

    init: function () {
      this._matrix = [
        // { id: 3, combination: ['CuOH2', 'bunsen_burner'] },
        // { id: 7, combination: ['magnesiumstrips', 'bunsen_burner'] },
        // { id: 9, combination: ['3MHCl', '3MNaOH'], video: '#reagentvid-3' },
        { id: 17, combination: ['03MAgNO3', '01MNaBr'], video: '#reagentvid-17'}
      ]
      // check the store and subscribe to any changes
      this.__storeChanged()
      this.subscribe = store.subscribe(() => {
        this.__storeChanged()
      })
    },

    playVideo: function (video:string) {
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

    destroyVideo: function(video) {
      // Destroy the template
      this.el.innerHTML = ''
      // Dim the lights
      this.el.sceneEl.querySelector('#light-lab').setAttribute('visible', true)
      // find the video source and click play
      this.el.sceneEl.querySelector(video).pause()
    },

    __storeChanged: function () {
      const state = store.getState()
      console.log(state)
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
      if (activeCombination) {
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

  });
}

export default register()