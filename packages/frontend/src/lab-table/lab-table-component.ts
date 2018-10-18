import 'aframe'
import 'aframe-state-component'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux'
declare const AFRAME:any

const register = () => {
  AFRAME.registerComponent('lab-table', {
    init: function () {
      // const events = ['collide', 'ondrop', 'drag-drop', 'dragover-end', 'dragover-stop']
      // events.forEach(name => {
      //   this.el.addEventListener(name, e => {
      //     console.log(e)
      //   })
      // });
      // this.el.addEventListener('collide', (e:any) => {
      //     try {
      //       const inventoryId = e.detail.body.el.dataset.inventoryId
      //       store.dispatch(addSelectedItem(inventoryId))
      //     } catch (error) {
      //       console.error(error)
      //     }
      // })
      // this.el.addEventListener('dragover-end', (e:any) => {
      //   console.log(e)
      //   try {
      //     const inventoryId = e.detail.carried.dataset.inventoryId
      //     store.dispatch(removeSelectedItem(inventoryId))
      //   } catch (error) {
      //     console.error(error)
      //   }
      // })
    }
  })
}

export default register()