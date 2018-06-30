import { Position, positions } from "./variables";

export default (position: Position['id']) => {
  return positions.find(i => i.id === position)
}