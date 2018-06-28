import 'aframe'

const registerSelectable = () => {
  AFRAME.registerComponent('selectable', {
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
      this.__selected = false;
      // toggle internal state of selected
      this.el.addEventListener('mousedown', e => {
        this.__selected = !this.__selected;
        console.log('mousedown');
      })
    },
  })
}

module.exports = registerSelectable();