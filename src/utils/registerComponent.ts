declare const AFRAME: any

export default (name:string, config:any): void => {
  if (AFRAME) {
    if (AFRAME.components) {
      if (typeof AFRAME.components[name] === 'undefined') {
        AFRAME.registerComponent(name, config)
        console.log('create', name)
      }
      else {
        console.log('delete', name)
        delete AFRAME.components[name]
        AFRAME.registerComponent(name, config)
        console.log('create', name)
      }
    }
  }
}