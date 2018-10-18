import 'aframe'
import 'aframe-template-component'
import 'super-hands'
import { addSelectedItem, store } from '../state/redux'
import registerComponent from '../utils/registerComponent';
declare const AFRAME: any

const inventoryItem:any = {
  init: function () {
    const el = this.el
    const id = el.id

    // add the gui interactive
    el.setAttribute('gui-interactable', '')
    el.setAttribute('hoverable', '')
    el.setAttribute('grabbable', '')
    el.setAttribute('draggable', '')
    // el.setAttribute('dynamic-body', '')
    el.setAttribute('shadow', '')

    // add the model
    const model = document.createElement('a-entity')
    model.setAttribute('gltf-model', `#${id}-object`)
    model.setAttribute('scale', `.2 .2 .2`)
    el.appendChild(model)

    // Create the lighting
    // const light:any = document.createElement('a-entity')
    // light.setAttribute('light', `target:#${id}`)
    // el.appendChild(light)

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

    this.subscribe = store.subscribe(() => {
      const state = store.getState()
      const selectedItems = state.selectedItems
      // const isSelected = selectedItems.find((i:string) => i === this.)
    })
  },

  selectItem: function () {
    store.dispatch(addSelectedItem(this.el.id))
  },

  makeButton: function (props: any) {
    const node = document.createElement('a-gui-button')
    node.setAttribute('width', '2')
    node.setAttribute('position', '0 .8 1')
    node.setAttribute('height', '0.75')
    node.setAttribute('value', 'Select Item')
    node.setAttribute('font-family', 'Helvetica')
    node.setAttribute('scale', '0 0 0')

    node.addEventListener('click', e => {
      this.selectItem()
    })

    return node
  }
}

export default registerComponent('inventory-item', inventoryItem)