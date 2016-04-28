import { fromJS } from 'immutable';
import {expect} from 'chai';

import * as helpers from '../src/utils/helpers';

describe('helper functions', () => {

  it('transpose a matrix', () => {
    const M = fromJS([[1,2,3],[4,5,6],[7,8,9]])

    const MT = helpers.transpose(M)

    expect(MT).to.equal(fromJS([[1,4,7],[2,5,8],[3,6,9]]))
  })

  it('transpose a matrix with undefined values', () => {
    const M = fromJS([[1,2,undefined],[undefined,5,6],[7,8,9]])

    const MT = helpers.transpose(M)

    expect(MT).to.equal(fromJS([[1,undefined,7],[2,5,8],[undefined,6,9]]))
  })


  it('removes all fasey values from a List', () => {
    const L = fromJS([null,undefined,1,0,false,true,'','test'])

    const LC = helpers.compact(L)

    expect(LC).to.equal(fromJS([1,true,'test']))
  })

  it('returns a list of indices of empty cells from a 2D matrix ', () => {
    const M = fromJS([
      [undefined,1,5],
      [undefined,3,6],
      [100,1,undefined]
    ])

    const emptyCells = helpers.getEmptyCells(M)

    expect(emptyCells).to.equal(fromJS([[0,0],[1,0],[2,2]]))
  })

  it('returns board with the max cell value', () => {
    const A = fromJS({
      board: [[1,1,5],
              [4,3,6],
              [5,1,14]]
    })

    const B = fromJS({
      board: [[1,1,5],
            [4,3,6],
            [100,1,13]]
    })

    const C = fromJS({
      board: [[1,1,5],
            [4,3,6],
            [4,1,13]]
    })

    const nextState = helpers.maximizeCellValue(A, B, C)

    expect(nextState.get('board')).to.equal(fromJS([
      [1,1,5],
      [4,3,6],
      [100,1,13]
    ]))
  })

  it('returns board with the max score', () => {
    const A = fromJS({
      board: [[1,1,5],
              [4,3,6],
              [5,1,14]]
    })

    const B = fromJS({
      board: [[1,1,5],
            [4,3,6],
            [100,1,13]]
    })

    const C = fromJS({
      board: [[1,1,5],
            [4,3,6],
            [4,1,13]]
    })

    const nextState = helpers.maximizeScore(A, B, C)

    expect(nextState.get('board')).to.equal(fromJS([
      [1,1,5],
      [4,3,6],
      [100,1,13]
    ]))
  })
});