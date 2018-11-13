import * as d3 from 'd3'
const vec3 = new THREE.Vector3()

export const bringUpHudOnLookDown = ({ cameraDirection, el, initialPosition }) => {
  const positionScaleY = d3.scaleLinear().domain([0.4, 0.8]).range([-1.174, -0.3])
  const positionScaleX = d3.scaleLinear().domain([1, -1]).range([1, -1])
  let newPosition = {...initialPosition}
  if (cameraDirection.y > 0.4 && cameraDirection.y < 0.8) {
    const cameraDirectionX = positionScaleX(cameraDirection.x)
    newPosition = Object.assign({}, newPosition, { x: cameraDirectionX })
    if (cameraDirection.y < 0.8) {
      const cameraDirectionY = positionScaleY(cameraDirection.y)
      newPosition = Object.assign({}, newPosition, { y: cameraDirectionY })
    }
    el.setAttribute('position', newPosition)
  }
}

export const panOnLeftRight = ({ cameraDirection, el }) => {
  const positionScaleX = d3.scaleLinear().domain([1, -1]).range([1, -1])
  const cameraDirectionX = positionScaleX(cameraDirection.x)
  const newPosition = Object.assign({}, el.object3D.position, { x: cameraDirectionX })
  el.setAttribute('position', newPosition)
}