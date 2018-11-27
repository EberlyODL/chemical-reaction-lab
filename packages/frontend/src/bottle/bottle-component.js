import {html, render} from 'lit-html';
import registerComponent from '../utils/registerComponent';

const bottle = {
  schema: {
    id: { type: 'string' }
  },

  init: function () {
  },

  update: function () {
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
    el.setAttribute('gltf-model', '#bottle.gltf')
    render(this._template(this.data), this.el);
  },

  _template: (data) => {
    return html`
      <a-entity class="label" gltf-part="src:#01MCaCl2-object; part:3MHCl;" position="0 0 0.001" material="src:#${data.id}-label; repeat: 1 -1;"></a-entity>
    `
  }

}

export default registerComponent('bottle', bottle)