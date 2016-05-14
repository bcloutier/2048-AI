import { List, Map } from 'immutable'
import { compact } from 'lodash'
import reducer from './reducers/game'
import { maximizeScore } from './utils/helpers'

const moveMap = {
  0: 'MOVE_UP',
  1: 'MOVE_DOWN',
  2: 'MOVE_LEFT',
  4: 'MOVE_RIGHT'
}
function largestCornerValue(board) {
  const A = [board.get('0').get('0'), board.get('0').get('3'),
             board.get('3').get('0'), board.get('3').get('3')]

  return Math.max(...compact(A))
}
function calculateScore(state) {
  //largest number is in a corner
  //largest number of empty cells
  //maximize score
  //+ largestCornerValue(state.get('board')) + state.get('emptyCells')
  return state.get('score') + state.get('emptyCells')
}

export default function calculateBestMove(state, n) {
  let originalState = state
  var stateTree = Map()
  let tempState = Map()

  tempState = tempState.set('0', reducer(state.set('_rootDir','MOVE_UP'), {type: 'MOVE_UP'}))
  tempState = tempState.set('1', reducer(state.set('_rootDir','MOVE_DOWN'), {type: 'MOVE_DOWN'}))
  tempState = tempState.set('2', reducer(state.set('_rootDir','MOVE_LEFT'), {type: 'MOVE_LEFT'}))
  tempState = tempState.set('3', reducer(state.set('_rootDir','MOVE_RIGHT'), {type: 'MOVE_RIGHT'}))

  stateTree = stateTree.setIn(['0','boards'], tempState)
  for(var i=1; i<n; i++) {
    const index = i-1
    const boards = stateTree.getIn([index.toString(),'boards'])
    let updatedBoards = Map()
    let boardNum = 0
    boards.forEach((board) => {
      updatedBoards = updatedBoards.set(boardNum++, reducer(board, {type: 'MOVE_UP'}))
      updatedBoards = updatedBoards.set(boardNum++, reducer(board, {type: 'MOVE_DOWN'}))
      updatedBoards = updatedBoards.set(boardNum++, reducer(board, {type: 'MOVE_LEFT'}))
      updatedBoards = updatedBoards.set(boardNum++, reducer(board, {type: 'MOVE_RIGHT'}))
    })
    stateTree = stateTree.setIn([i.toString(),'boards'], updatedBoards)

  }
  let maxScore = -Infinity
  let curScore
  let bestState;
  stateTree.getIn([(n-1).toString(),'boards']).forEach((s)=>{
    curScore = calculateScore(s)
    if(curScore>maxScore) {
      maxScore = curScore
      bestState = s
    }
  })
  const pickedDirection = bestState.get('_rootDir')

  const newState = reducer(originalState, {type: pickedDirection})
  //prevent gridlock
  if(newState.get('board').equals(newState.get('prevBoard'))) {
    console.log('random move');
    const newMove = moveMap[Math.floor(Math.random()*4)]
    return reducer(originalState, {type: newMove})
  } else {
    return newState
  }
}



  //   //if nothing changed. Pick a random direction
  //   if(move.get('MOVE_UP').get('score') === move.get('MOVE_DOWN').get('score') &&
  //       move.get('MOVE_DOWN').get('score') === move.get('MOVE_LEFT').get('score') &&
  //       move.get('MOVE_LEFT').get('score') === move.get('MOVE_RIGHT').get('score')) {
  //     const newMove = moveMap[Math.floor(Math.random()*4)]
  //     state = move[newMove]
  //   } else {
  //     state = maximizeScore(move.get('MOVE_UP'), move.get('MOVE_DOWN'), move.get('MOVE_LEFT'), move.get('MOVE_RIGHT'))
  //   }
  // }
//}