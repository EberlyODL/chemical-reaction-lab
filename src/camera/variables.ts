export enum Positions {
  default = 'default',
  stockroom = 'stockroom'
}

export enum Cameras {
  camera1 = 'camera1'
}

export interface Position {
  id: string,
  position: string,
  rotation: RotationAttribute,
}

export interface RotationAttribute {
  x: number,
  y: number,
  z: number,
}

export const positions: Position[] = [
  {
    id: 'default',
    position: '1 1 1',
    rotation: {
      x: 0, y: 0, z: 0
    }
  },
  {
    id: 'stockroom',
    position: '-15.230 5.010 4.950',
    rotation: {
      x: 0, y: 90, z: 0
    }
  }
]
