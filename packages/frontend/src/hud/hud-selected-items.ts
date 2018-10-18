import 'aframe'
declare const AFRAME: any

const register = () => {
  AFRAME.registerComponent('hud-selected-items', {
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
      const el = this.el

      // this.selectedItemsUnsubscribe = store.subscribe(() => {
      //   const state = store.getState()
      //   const selectedItems = state.selectedItems
      //   selectedItems.forEach((id:string, index:number) => {
      //     const node = document.createElement('a-entity')
      //     node.setAttribute('inventory-item', '')
      //     node.setAttribute('id', id)
      //     node.setAttribute('position', `-${index * .6} 0 0`);
      //     el.appendChild(node)
      //   });
      // }) 
    },

    remove: function () {
      // this.selectedItemsUnsubscribe()
    }

  })
}

export default register()