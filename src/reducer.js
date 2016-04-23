import { Map } from 'immutable'
import { init, tick, transverseX, transverseY} from './core'

export default function(state = Map(), action) {
  switch (action.type) {
  case 'INIT':
    return init(state)
  case 'TICK':
    return tick(state)
  case 'MOVE_RIGHT':
  case 'MOVE_LEFT':
    // Save previous board before starting move
    state = state.set('prevBoard', state.get('board'))
    return transverseX(state, action.type)
  case 'MOVE_UP':
  case 'MOVE_DOWN':
    // Save previous board before starting move
    state = state.set('prevBoard', state.get('board'))
    return transverseY(state.set('prevBoard', state.get('board')), action.type)
  }
  return state;
}