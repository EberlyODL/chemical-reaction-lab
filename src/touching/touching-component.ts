import 'aframe'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux';
declare const AFRAME: any
declare const THREE: any

const register = () => {
  AFRAME.registerComponent('touching', {
    schema: {
      target: { type: 'selector' },
      distance: { type: 'number', default: 2 },
    },

    init: function () {
      this.directionVec3 = new THREE.Vector3()
      this._inventoryId = this.el.getAttribute('data-inventory-id')
    },

    tick: function () {
      var directionVec3 = this.directionVec3
      // get current position
      var currentPosition = this.el.object3D.position

      // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
      var targetPosition = this.data.target.object3D.position
      // convert offset string into vector
      // var offset = new THREE.Vector3(...this.data.offset.split(' '))

      // Subtract the vectors to get the direction the entity should head in.
      directionVec3.copy(targetPosition).sub(currentPosition)

      // Calculate the distance.
      var distance = directionVec3.length()
      // find out if the two items are within the 'touching' distance of each other
      const touching = (distance < this.data.distance)
      // dirty check to find out when we switch to a new state
      if (touching !== this._touching) {
        // if we switched to a new state then we need to notify the store
        switch (touching) {
          case true:
            store.dispatch(addSelectedItem(this._inventoryId))
            break;

          case false:
            store.dispatch(removeSelectedItem(this._inventoryId))
            break;
        
          default:
            break;
        }
        // update the cached version of the touching state
        this._touching = touching
      }
    }
  });
}

export default register()