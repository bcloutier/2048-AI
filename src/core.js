import { Map, List, fromJS } from 'immutable';
import { compact, transpose, getEmptyCells } from './utils/helpers.js'

/**
  *
  */
export function init(state) {
  let e; //empty cell
  const init = fromJS({
    lost:false,
    hasWon: false,
    emptyCells: 16,
    prevBoard: [[],[],[]],
    board: [[e,e,e,e],
            [e,e,e,e],
            [e,e,e,e],
            [e,e,e,e]]
  })

  return state.merge(init)
}

/**
  *
  */
export function tick(state) {
  // Check if hasWon flag has been set
  if(state.get('hasWon')) {
    return state
  }

  // Board must of changed in order for a new cell to be added.
  if(state.get('board').equals(state.get('prevBoard'))) {
    return state
  }

  //get all empty cells and there [x,y] location
  const emptyCells = getEmptyCells(state.get('board'))
  //pick a cell at random, use passed random generator for testing or default JS
  const random = state.get('randomGen') || Math.random
  const pickCell = Math.floor(random() * emptyCells.size)
  //pull out indices
  const [i,j] = emptyCells.get(pickCell);
  //rules for picking value
  const value = (random() < .9) ? 2 : 4
  //assign value to the randomly selected cell
  state = state.merge({board: state.get('board').update(i, (row) => row.set(j, value))})
  //reduce number of emptycells by one
  return state.update('emptyCells', (emptyCells) => --emptyCells)
}

/**
  *
  */
export function transverseX(state, dir='MOVE_LEFT') {
  // Flag set to true when a cell has 2048
  let hasWon = false;

  // Check to see if any cells are empty
  let emptyCells = state.get('emptyCells')
  if(emptyCells === 0) {
    let avalCells = false
    let board = state.get('board')
    let size = board.size
    board.forEach((row,i) => {
      row.forEach((val,j) => {
        if(avalCells) return; //already found one, return
        //check all adjacent cells (no diagnols)
        if((i-1 >= 0 && board.get(i-1).get(j) == val ) || //top
           (i+1 < size && board.get(i+1).get(j) == val) ||//bottom
           (j-1 >= 0 && board.get(i).get(j-1) == val) ||  //left
           (j+1 < size && board.get(i).get(j+1) == val)) {//right
          avalCells = true
        }
      })
    })
    if(!avalCells) {
      return state.set('lost', true)
    }
  }

  state = state.update('board', (board) => board.map((row) => {
    let foundMatch = false;
    row = compact (row)
    if(dir==='MOVE_RIGHT') {
      row = row.reverse()
    }
    row = row.reduce((prev, curr, i) => {
      //found match last iteration
      if(foundMatch) {
        foundMatch = false
        return prev
      }
       //found match
      else if(curr === row.get(i+1)) {
        //won game
        if(curr*2 === 2048) hasWon = true
        foundMatch = true
        emptyCells = emptyCells + 1
        return prev.push(curr*2)
      }
       //didn't find match
      return prev.push(curr)
    }, List()).setSize(4)

    return (dir==='MOVE_RIGHT') ? row.reverse() : row
  }))

  return state.merge({ hasWon: hasWon, emptyCells: emptyCells })
}

/**
  *
  */
export function transverseY(state, dir='MOVE_DOWN') {
  // Transpose board so that reduce can be easily used
  state = state.update('board', (board) => transpose(board))
  // Reduce: the direction determines which way to reduce
  state = transverseX(state, (dir==='MOVE_DOWN') ? 'MOVE_RIGHT' : 'MOVE_LEFT')
  // Transpose back and update state
  return state.update('board', (board) => transpose(board))
}