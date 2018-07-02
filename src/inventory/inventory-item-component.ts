import 'aframe'
declare const AFRAME:any
import { InventoryList } from './variables';

const register = () => {
  AFRAME.registerComponent('inventory-item', {
    schema: {
      id: {type: 'string', default: ''}
    },
    init: function () {
      // check to make sure it's in the inventory list
      const exists =  Object.values(InventoryList).includes(this.data.id)
    },
  })
}

export default register()