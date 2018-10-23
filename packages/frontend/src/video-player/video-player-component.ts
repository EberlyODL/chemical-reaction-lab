import 'aframe'
import { store, getVideoSrc, VideoPlayerStatus, findActiveCombination } from '../state/redux';
import client from '../apollo/client'
import gql from 'graphql-tag'
import registerComponent from '../utils/registerComponent';
declare const AFRAME: any
declare const THREE: any

const GET_VIDEOS = gql`
  query {
    videos {
      id
      name
    }
  }
`;

const GET_USER = gql`
  query {
    user @client {
      id
    }
  }
`

// const UPDATE_NETWORK_STATUS = gql`
//   mutation updateNetworkStatus($isConnected: Boolean) {
//     updateNetworkStatus(isConnected: $isConnected) @client
//   }
// `;

const videoPlayer:any = {
  schema: {
  },

  init: function () {
    this._isPlaying = false
    // check the store and subscribe to any changes
    client.watchQuery({ query: GET_USER })
    .subscribe(( {data: {user: { id }}}) => {

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