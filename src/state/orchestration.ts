import { store, LightStates, findActiveCombination, startVideo, dimLights, VideoPlayerStatus, stopVideo } from './redux'

store.subscribe(() => {
  // const state = store.getState()
  // const activeCombination = findActiveCombination(state)

  // // Check if the Active Combination, if there is we should start the video
  // if (activeCombination && state.videoPlayer.status === VideoPlayerStatus.off && state.videoPlayer.activeVideo === '') {
  //   const videoId = activeCombination.id
  //   store.dispatch(startVideo(videoId))
  // }

  // // if the video was playing and we remove a combination then we should stop the video
  // if (!activeCombination && state.videoPlayer.status === VideoPlayerStatus.on) {
  //   store.dispatch(stopVideo())
  // }

  // // Check if we should dim the lights
  // if (state.videoPlayer.status === VideoPlayerStatus.on && state.lights.status !== LightStates.dimmed) {
  //   store.dispatch(dimLights())
  // }
})