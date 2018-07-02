import { Position, Cameras } from './variables'
import getCameraPosition from './getCameraPosition';

export default (position: Position['id']) => {
  const camera:any =  document.querySelector(`#${Cameras.camera1}`)
  const p = getCameraPosition(position)
  if (p) {
    camera.setAttribute('position', p.position)
    camera.setAttribute('rotation', p.rotation)
  }
}
