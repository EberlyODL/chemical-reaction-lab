import 'aframe'
import { store, addSelectedItem, removeSelectedItem } from '../state/redux';
declare const AFRAME: any
declare const THREE: any

const register = () => {
  AFRAME.registerComponent('video-player', {
    schema: {
    },

    init: function () {
      const matrix = [
        { id: 3, combination: ['CuOH2', 'bunsen_burner']},
        { id: 7, combination: ['magnesiumstrips', 'bunsen_burner']},
        { id: 9, combination: ['3MHCl', 'CuOH2']},
      ]
      this.subscribe = store.subscribe(() => {
        const state = store.getState()
        const selectedItems:any = state.selectedItems
        console.log(selectedItems)
        const activeCombination = matrix.find((i:any) => {
          let includes = true;
          i.combination.forEach((e:any) => {
            if (!selectedItems.includes(e)) {
              includes = false
            }
          });
          return includes
        })
        console.log(activeCombination)
      })
    },

  });
}

export default register()