import reducer from '../reducer'

const moveMap = {
  0: { type: 'MOVE_LEFT' },
  1: { type: 'MOVE_RIGHT' },
  2: { type: 'MOVE_DOWN' },
  3: { type: 'MOVE_UP' }
}

export default function moveRandomly() {
  return moveMap[Math.floor(Math.random()*4)]
}