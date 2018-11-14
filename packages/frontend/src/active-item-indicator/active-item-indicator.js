import client from "../apollo/client";
import { timingSafeEqual } from "crypto";

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

/**
 * Alongpath component for A-Frame.
 * Move Entities along a predefined Curve
 */
AFRAME.registerComponent("active-item-indicator", {
  schema: {
    /**
     * Comma separated list of query selectors
     */
    targets: { type: "string", default: "" },
    offset: { type: "vec3", default: { x: 0, y: 0, z: 0 } }
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: function() {
    this.vec3 = new THREE.Vector3();
    this.box3 = new THREE.Box3();
    this._activeEl = {
      el: null,
      elSize: null
    }

    // default is that it's not visible
    this.el.setAttribute("visible", false);

    this.el.sceneEl.addEventListener("droppable-surface-active-item-added", e => {
      this.updateIndicator(e.detail)
    });

    this.el.sceneEl.addEventListener("droppable-surface-new-active-item-removed", e => {
      this.el.setAttribute("visible", false);
    });
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("droppable-surface-active-item-added");
    this.el.sceneEl.removeEventListener("droppable-surface-active-item-removed");
  },

  tick: function () {
    if (this._activeEl.el && this._activeEl.elSize) {
      // get position of activeEl
      const el = this._activeEl.el
      const elSize = this._activeEl.elSize
      const newPosition = this.vec3.copy(el.object3D.position).add({x:0, y: elSize.y, z:0}).sub(this.data.offset)
      this.el.setAttribute('position', newPosition)
    }
  },

  updateIndicator: function (el) {
    // const targets = this.data.targets.split(",").map(i => i.trim());
    // const isValid = targets.find(i => el.matches(i));
    // if (typeof isValid !== "undefined" && isValid) {
      // set it to visible
      this.el.setAttribute("visible", true);
      // get the coordinates of the selected element and position set it there.
      const targetPosition = el.object3D.position;
      const elMesh = el.getObject3D('mesh')
      var elSize = this.box3.setFromObject(elMesh).getSize();
      this._activeEl = Object.assign({}, {el, elSize})
  }
});