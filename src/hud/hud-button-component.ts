import 'aframe'
import switchCameraPosition from '../camera/switchCameraPosition';
import { Positions } from '../camera/variables';

const register = () => {
  AFRAME.registerComponent('hud-button', {
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
      // add event listener for scene changes
      this.el.addEventListener('click', (e:any) => {
        const id = e.target.id
        if (id) {
          if (id === 'hud-default-jump') {
            switchCameraPosition(Positions.default);
          }
          if (id === 'hud-stockroom-jump') {
            switchCameraPosition(Positions.stockroom);
            // AFRAME.scenes[0].emit('decreaseScore', {points: 1});
            // AFRAME.scenes[0].emit('removeInventoryItem', InventoryList.bottle1); 
          }
        }
      })
    },

  })
}

export default register()