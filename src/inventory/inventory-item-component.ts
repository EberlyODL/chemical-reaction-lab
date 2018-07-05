import 'aframe'
import anime from 'animejs'
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
      menuNode.setAttribute('width', '2')
      menuNode.setAttribute('rotation', '0 90 0')
      menuNode.setAttribute('position', '0 .7 0')
      menuNode.setAttribute('height', '0.75')
      menuNode.setAttribute('value', 'Select Item')
      menuNode.setAttribute('font-family', 'Helvetica')
      menuNode.setAttribute('scale', '0 0 0')
      menuNode.setAttribute('look-at', '[camera]')
      const menu = el.appendChild(menuNode)

      el.addEventListener('mouseenter', (e:any) => {
        const animateNode = document.createElement('a-animation')
        animateNode.setAttribute('attribute', 'scale')
        animateNode.setAttribute('dur', '300')
        animateNode.setAttribute('to', '1 1 1')
        menu.appendChild(animateNode)
      })
      el.addEventListener('mouseleave', (e:any) => {
        const animateNode = document.createElement('a-animation')
        animateNode.setAttribute('attribute', 'scale')
        animateNode.setAttribute('dur', '300')
        animateNode.setAttribute('to', '0 0 0')
        menu.appendChild(animateNode)
      })
    },
  })
}

export default register()