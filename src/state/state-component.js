import 'aframe'
import 'aframe-state-component'
import { Cameras } from '../camera/variables';
import switchCameraPosition from '../camera/switchCameraPosition';

AFRAME.registerState({
  initialState: {
    inventory: [],
    cameraPosition: Cameras.camera1
  },

  handlers: {
    addInventoryItem: function (state, action) {
      const alreadyContains = state.inventory.find(i => i === action)
      if (!alreadyContains) {
        state.inventory = [...state.inventory, ...[action]]
      }
    },

    removeInventoryItem: function (state, action) {
      state.inventory = state.inventory.filter(i => i !== action)
    },

    changeCameraPosition: function (state, action) {
      state.cameraPosition = action
      switchCameraPosition(action)
    }
  }
})