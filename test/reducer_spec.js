import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducers/game';

describe('reducer', () => {
  let e; //empty cell (undefined)

  //fixed random generator used for testing
  var seed = 1;
  function random() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
  }

  it('handles INIT', () => {
    const action = { type: 'INIT' };
    const nextState = reducer(e, action);

    expect(nextState).to.equal(fromJS({
      lost: false,
      emptyCells: 16,
      hasWon: false,
      prevBoard: [[],[],[]],
      board: [[e,e,e,e],
              [e,e,e,e],
              [e,e,e,e],
              [e,e,e,e]]
    }));
  });

  it('move left board', () => {
    const state = fromJS({
      board: [[4,4,4,4],
              [e,2,2,4],
              [e,2,2,2],
              [e,2,e,e]]
    })
    const action = { type: 'MOVE_LEFT' }

    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
      [[8,8,e,e],
      [4,4,e,e],
      [4,2,e,e],
      [2,e,e,e]]
    ));
  });

  it('move left board', () => {
    const state = fromJS({
      board:   [[8,4,4,e],
                [16,32,128,64],
                [2,e,e,e],
                [2,e,e,2]]
    })
    const action = { type: 'MOVE_LEFT' };
    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
       [[8,8,e,e],
        [16,32,128,64],
        [2,e,e,e],
        [4,e,e,e]]
    ));
  });

  it('move right', () => {
    const state = fromJS({
      board:   [[8,8,e,e],
                [16,32,128,64],
                [2,e,2,2],
                [2,e,e,2]]
    })
    const action = { type: 'MOVE_RIGHT' };
    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
      [[e,e,e,16],
      [16,32,128,64],
      [e,e,2,4],
      [e,e,e,4]]
    ));
  });

  it('move down', () => {
    const state = fromJS({
      board:   [[8,128,2,2],
                [8,32,e,e],
                [8,64,e,2],
                [8,16,e,2]]
    })
    const action = { type: 'MOVE_DOWN' };

    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
      [[e,128,e,e],
      [e,32,e,e],
      [16,64,e,2],
      [16,16,2,4]]
    ));
  });

  it('move up', () => {
    const state = fromJS({
      board:   [[8,128,e,2],
                [8,32 ,e,e],
                [8,64 ,e,2],
                [8,16 ,2,2]]
    })
    const action = { type: 'MOVE_UP' };

    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
       [[16,128,2,4],
        [16,32,e,2],
        [e,64,e,e],
        [e,16,e,e]]
    ));
  });

  it('checks number of empty cells', () => {
    const state = fromJS({
      emptyCells: 4,
      board:   [[8,128,e,2],
                [8,32 ,e,e],
                [8,64 ,e,2],
                [8,16 ,2,2]]
    })
    const action = { type: 'MOVE_UP' };

    const nextState = reducer(state, action);

    expect(nextState.get('emptyCells')).to.equal(7);
  });

  it('tick', () => {
    const state = fromJS({
      randomGen: random,
      board: [[e,e,e,e],
              [e,e,e,e],
              [e,e,e,e],
              [e,e,e,e]]
    })
    const action = { type: 'TICK' };

    const nextState = reducer(state, action);
    expect(nextState.get('board')).to.equal(fromJS(
       [[e,e,e,e],
        [e,e,e,e],
        [e,e,e,4],
        [e,e,e,e]]
     ));
  });

  it('lost', () => {
    const state = fromJS({
      lost: false,
      emptyCells: 0,
      board: [[2,4,2,4],
              [4,2,4,2],
              [2,4,2,4],
              [4,2,4,2]]
    })
    const action = { type: 'MOVE_UP' };

    const nextState = reducer(state, action);

    expect(nextState.get('lost')).to.equal(true)
  });

  it('has a move avaliable', () => {
    const state = fromJS({
      lost: false,
      emptyCells: 0,
      board: [[512,8,4,16],
              [128,4,16,2],
              [8,16,32,4],
              [16,32,64,64]]
    })
    const action = { type: 'MOVE_UP' };

    const nextState = reducer(state, action);

    expect(nextState.get('board')).to.equal(fromJS(
      [[512,8,4,16],
      [128,4,16,2],
      [8,16,32,4],
      [16,32,64,64]]
    ));
    expect(nextState.get('emptyCells')).to.equal(0)
    expect(nextState.get('lost')).to.equal(false)
  });

  it('calculates Score', () => {
    const state = fromJS({
      score: 10,
      board:  [[8,128,e,2],
              [8,32 ,e,e],
              [8,64 ,e,2],
              [8,16 ,2,2]]
    })

    //36 created from this move is added to previous 10
    const action = { type: 'MOVE_UP' };

    const nextState = reducer(state, action);

    expect(nextState.get('score')).to.equal(46);
  });

  it('initalize game, add first cell, and move one position', () => {
    const state = fromJS({
      lost: false,
      emptyCells: 16,
      randomGen: random,
      prevBoard: [[],[],[]],
      board: [[e,e,e,e],
              [e,e,e,e],
              [e,e,e,e],
              [e,e,e,e]]
    })
    const actions = [{type:'TICK'}, {type:'MOVE_DOWN'}];

    const nextState = actions.reduce(reducer, state);

    expect(nextState.get('board')).to.equal(fromJS(
      [[e,e,e,e],
      [e,e,e,e],
      [e,e,e,e],
      [e,e,e,4]]
    ))
    expect(nextState.get('emptyCells')).to.equal(15)
  })

  it('nothing changed don\'t update', () => {
    const state = fromJS({
      lost: false,
      emptyCells: 12,
      score: 10,
      board: [[4,8,4,2],
              [e,e,e,e],
              [e,e,e,e],
              [e,e,e,e]],
      prevBoard: [[4,8,4,2],
                  [e,e,e,e],
                  [e,e,e,e],
                  [e,e,e,e]]
    })

    const actions = [{ type: 'MOVE_UP' },{ type: 'TICK'}];

    const nextState = actions.reduce(reducer, state);

    expect(nextState).to.equal(fromJS({
      lost: false,
      emptyCells: 12,
      hasWon: false,
      score: 10,
      board: [[4,8,4,2],
              [e,e,e,e],
              [e,e,e,e],
              [e,e,e,e]],
      prevBoard: [[4,8,4,2],
                  [e,e,e,e],
                  [e,e,e,e],
                  [e,e,e,e]]
    }));
  });
  it('has won', () => {
    const state = fromJS({
      lost: false,
      emptyCells: 14,
      board: [[e,e,e,e],
              [e,e,e,e],
              [1024,e,e,e],
              [1024,e,e,e]]
    })

    const actions = [{ type: 'MOVE_UP' },{ type: 'TICK'}];

    const nextState = actions.reduce(reducer, state);

    expect(nextState.get('hasWon')).to.equal(true)
  });
});