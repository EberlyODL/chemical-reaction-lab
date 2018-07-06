import 'aframe'
import { addSelectedItem, store } from '../store'
declare const AFRAME: any

const register = () => {
  AFRAME.registerComponent('inventory-item', {
    init: function () {
      const el = this.el
      const id = el.id

      // add the gui interactive
      el.setAttribute('gui-interactable', '')

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

      // this.subscribe = store.subscribe(() => {
      //   const state = store.getState()
      //   const selectedItems = state.selectedItems
      //   selectedItems.forEach((id:string, index:number) => {
      //     const node = document.createElement('a-entity')
      //     // node.setAttribute('inventory-item', '')
      //     node.setAttribute('id', id)
      //     node.setAttribute('position', `-${index * .6} 0 0`);
      //     el.appendChild(node)
      //   })
      // })
    },

    selectItem: function () {
      store.dispatch(addSelectedItem(this.el.id))
    },

    makeButton: function (props: any) {
      const node = document.createElement('a-gui-button')
      node.setAttribute('width', '2')
      node.setAttribute('position', '0 .7 0')
      node.setAttribute('height', '0.75')
      node.setAttribute('value', 'Select Item')
      node.setAttribute('font-family', 'Helvetica')
      node.setAttribute('scale', '0 0 0')
      // node.setAttribute('look-at', '[camera]')

      node.addEventListener('click', e => {
        this.selectItem()
      })

      return node
    }
  })
}

export default register()