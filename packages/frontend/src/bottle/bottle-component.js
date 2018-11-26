import registerComponent from '../utils/registerComponent';

const bottle = {
  schema: {
    id: { type: 'string' }
  },

  init: function () {
    const data = this.data
    const el = this.el

    // set up the bottle
    el.id = `bottle-${data.id}`
    el.dataset.inventoryId = data.id
    el.setAttribute('track-movement', '')
    el.setAttribute('droppable-item', '')
    el.setAttribute('tabindex', '0')
    el.setAttribute('touching', 'target: #lab-table')
    el.setAttribute('scale', '5 5 5')
    // load the bottle
    el.setAttribute('gltf-model', '#bottle.gltf')

    // add a dynaimc label
    const labelEl = document.createElement('a-entity')
    labelEl.data
    labelEl.className = 'label'
    labelEl.setAttribute('gltf-part', 'src:#01MCaCl2-object; part:3MHCl;')
    labelEl.setAttribute('position', '0 0 0.001')
    labelEl.setAttribute('material', `
      src:#${this.data.id}-label;
      repeat: 1 -1;
    `)
    this._labelEl = el.appendChild(labelEl)
  }

}

export default registerComponent('bottle', bottle)