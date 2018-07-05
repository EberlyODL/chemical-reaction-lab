import 'aframe'
declare const AFRAME:any
import { InventoryList } from './variables';

const register = () => {
  AFRAME.registerComponent('inventory-item', {
    init: function () {
      const el = this.el
      // add the gui interactive
      el.setAttribute('gui-interactable', '')

      // Create the label
      const menuNode = document.createElement('a-gui-button')
      menuNode.setAttribute('width', '2.5')
      menuNode.setAttribute('rotation', '0 90 0')
      menuNode.setAttribute('position', '0 .7 0')
      menuNode.setAttribute('height', '0.75')
      menuNode.setAttribute('value', 'test button')
      menuNode.setAttribute('font-family', 'Helvetica')
      el.appendChild(menuNode)

      el.addEventListener('mouseenter', (e:any) => {
      })
      el.addEventListener('mouseenter', (e:any) => {
      })
    },
  })
}

export default register()