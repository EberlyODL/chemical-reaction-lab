import 'aframe'
import { increment, store } from '../store'
declare const AFRAME: any

const register = () => {
  AFRAME.registerComponent('inventory-item', {
    init: function () {
      const el = this.el
      // add the gui interactive
      el.setAttribute('gui-interactable', '')

      // Create the label
      const addButtonNode = this.makeButton()
      const menu = el.appendChild(addButtonNode)

      // Animate in the menu
      el.addEventListener('mouseenter', (e: any) => {
        const animateNode = document.createElement('a-animation')
        animateNode.setAttribute('attribute', 'scale')
        animateNode.setAttribute('dur', '300')
        animateNode.setAttribute('to', '1 1 1')
        menu.appendChild(animateNode)
      })
      // Animate out the menu
      el.addEventListener('mouseleave', (e: any) => {
        const animateNode = document.createElement('a-animation')
        animateNode.setAttribute('attribute', 'scale')
        animateNode.setAttribute('dur', '300')
        animateNode.setAttribute('to', '0 0 0')
        menu.appendChild(animateNode)
      })
    },

    selectItem: function () {
      store.dispatch(increment({ amount: 1 }))
    },

    makeButton: function (props: any) {
      const node = document.createElement('a-gui-button')
      node.setAttribute('width', '2')
      node.setAttribute('rotation', '0 90 0')
      node.setAttribute('position', '0 .7 0')
      node.setAttribute('height', '0.75')
      node.setAttribute('value', 'Select Item')
      node.setAttribute('font-family', 'Helvetica')
      node.setAttribute('scale', '0 0 0')
      node.setAttribute('look-at', '[camera]')

      node.addEventListener('click', e => {
        this.selectItem()
      })

      return node
    }
  })
}

export default register()