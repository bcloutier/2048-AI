import { List } from 'immutable'

//find empty cells. Return a List of Lists containing index
export const getEmptyCells = (boardState) => {
  let emptyCells = List()
  boardState.forEach((row, i) => {
    row.forEach((value, j) => {
      if(!value) {
        emptyCells = emptyCells.push(List.of(i,j))
      }
    })
  })
  return emptyCells
}

//2D transpose
export const transpose = (board) => {
  return board.get(0).map((_,i) => {
    return board.map((row) => {
      return row.get(i)
    })
  })
};

//remove all falsey values
export const compact = (A) => {
  return A.reduce( (prev, curr) => (!!curr) ? prev.push(curr) : prev , List())
}

export const maximizeCellValue = (...states) => {
  let maxVal=0;
  let stateWithMaxCell;
  states.forEach((state) => {
    state.get('board').forEach((row) => {
      if(row.max() > maxVal) {
        maxVal = row.max()
        stateWithMaxCell = state
      }
    })
  })
  return stateWithMaxCell
}

export const maximizeScore = (...states) => {
  let maxScore = 0
  let curScore
  let bestState;
  states.forEach((state) => {
    curScore = state.get('board').reduce((prevRow, currRow) => {
      return prevRow + compact(currRow).reduce((prev, curr) => prev + curr)
    },0)
    if(curScore>maxScore) {
      maxScore = curScore
      bestState = state
    }
  })
  return bestState
}