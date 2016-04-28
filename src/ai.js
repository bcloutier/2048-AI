import { Map } from 'immutable'
import reducer from './reducers/game'
import { maximizeScore } from './utils/helpers'

export default function getStateWithMaxScore(state) {
  const moveUp = reducer(state, {type: 'MOVE_UP'})
  const moveDown = reducer(state, {type: 'MOVE_DOWN'})
  const moveLeft = reducer(state, {type: 'MOVE_LEFT'})
  const moveRight = reducer(state, {type: 'MOVE_RIGHT'})

  return maximizeScore(moveUp, moveDown, moveLeft, moveRight)
}