import 'aframe'
import 'three'
import 'aframe-extras'
// import 'aframe-html-shader'
// import 'aframe-animation-timeline-component'
import 'aframe-look-at-component'
import { client } from './state/graphql'
import './selectable-component'
import { gql } from 'apollo-boost'
import './camera'
import './hud/hud-button-component'
import './inventory/inventory-item-component'
import './lab-table/lab-table-component'
import { Positions } from './camera/variables';

document.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('loaded', (e) => {
    AFRAME.scenes[0].emit('changeCameraPosition', Positions.default)

    // change the state to is loaded
    client.query({
      query: gql`
        query isLoaded {
          isLoaded
        }
      `,
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
  })
})