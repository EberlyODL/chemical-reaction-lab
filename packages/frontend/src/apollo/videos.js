
import gql from "graphql-tag";
import client from "../apollo/client";
import { Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';

let initialState = {
  videoId: null,
  status: "off"
}

// export const playVideo = (video) => {
//   const state = {
//     status: 'on',
//     videoId: video.video
//   }
//   stateSubject.next(state)
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

export const videoMatrix = [
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