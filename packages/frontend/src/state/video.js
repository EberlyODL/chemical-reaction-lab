import { observable, autorun } from 'mobx'

export const videoState = observable({
  videoId: null,
  status: "off"
})

// export const playVideo = (payload) => {
//   state.next(Object.assign({}, _, _.video, {
//     video: {
//       status: 'on',
//       videoId: payload.video
//     }
//   }))
// }

// export const stopVideo = (_) => {
//   state.next(Object.assign({}, _, _.video, {
//     video: {
//       status: 'off'
//     }
//   }))
// }

// export const dispatch = (payload) => {
//   stateSubject.next(payload)
// }

// export const VIDEO_STATE = gql`
//   query {
//     video @client {
//       status
//     }
//   }
// `

// export const PLAY_VIDEO = gql`
//   mutation ($id: ID!) {
//     playVideo(id: $id) @client {
//       id
//     }
//   }
// `

// export const playVideo = async (video) => {
//   console.log('video', video);
//   const variables = {
//     id: video.id,
//   }
//   // get the current selected Objects
//   client.mutate({
//     mutation: PLAY_VIDEO,
//     variables,
//   })
// }