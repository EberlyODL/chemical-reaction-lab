// import '../../lib/aframe-state-component'

AFRAME.registerState({
  initialState: {
    selectedObjects: []
  },
 
  handlers: {
    selectObject: function (state, action) {
      let selectedObjects = Object.assign({}, state.selectedObjects)
      selectedObjects.filter(i => i === action)
      state.selectedObjects = Object.assign({}, selectedObjects, action);
    },

    unselectObject: function (state, action) {
      state.selectedObjects = Object.assign({}, state.selectedObjects.filter(i => i === action))
    }
  }
});