// const State:any = {
//   selectedItemsState:any[] = []

//   get selectedItems() {
//     return this.selectedItemsState
//   }

//   set selectedItems(item) {
//     const newSelectedItems = [...this.selectedItemsState, item]
//   }
// }

const state = {
  selectedItems: []
}

const getSelectedItems = () => {
  return state.selectedItems
}
const addSelectedItem = (item:string) => {
  const newSelectedItems = [...state.selectedItems, item]
}
const itemIsSelected = (item:string) => {
  return state.selectedItems.find(i => i === item)
}

document.addEventListener('DOMContentLoaded', function () {
  const scene:any = document.querySelector('a-scene')
  scene.addEventListener('inventory-select-item', (e:any) => {
  })
})