import { Map } from 'immutable'
import reducer from './reducers/game'
import { maximizeScore } from './utils/helpers'

const moveMap = {
  0: 'up',
  1: 'down',
  2: 'left',
  4: 'right'
}

export default function getStateWithMaxScore(state) {
  let move = {}
  move.up = reducer(state, {type: 'MOVE_UP'})
  move.down = reducer(state, {type: 'MOVE_DOWN'})
  move.left = reducer(state, {type: 'MOVE_LEFT'})
  move.right = reducer(state, {type: 'MOVE_RIGHT'})

  //if nothing changed. Pick a random direction
  if(move.up.get('score') === move.down.get('score') &&
    move.down.get('score') === move.left.get('score') &&
    move.left.get('score') === move.right.get('score')) {
      console.log('equal');
      return move[moveMap[Math.floor(Math.random()*4)]]
    }

  return maximizeScore(move.up, move.down, move.left, move.right)
}