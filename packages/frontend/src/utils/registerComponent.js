export default (name, config) => {
  if (AFRAME) {
    if (AFRAME.components) {
      if (typeof AFRAME.components[name] === 'undefined') {
        AFRAME.registerComponent(name, config)
      }
      else {
        delete AFRAME.components[name]
        AFRAME.registerComponent(name, config)
      }
    }
  }
}