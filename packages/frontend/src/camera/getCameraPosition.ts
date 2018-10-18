import { Position, positions } from "./variables";

export default (position: Position['id']): Position | undefined => {
  return positions.find(i => i.id === position)
}