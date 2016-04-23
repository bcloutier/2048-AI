import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import {GameContainer} from './components/Game'
import {BoardContainer} from './components/Board'

import { iteration,
  init,
  moveUp,
  moveRight,
  moveDown,
  moveLeft
} from './action_creators'


const store = createStore(reducer);
// Initalize board and add first cell
store.dispatch(init());
store.dispatch(iteration());

// Initalize global event listens for moving. Not using react-hotkeys
// cause that requires focus on board
window.addEventListener("keydown", (e)=> {
  switch(e.code) {
    case 'ArrowUp':
    case 'KeyW':
      store.dispatch(moveUp())
      store.dispatch(iteration())
      break;
    case 'ArrowDown':
    case 'KeyS':
      store.dispatch(moveDown())
      store.dispatch(iteration())
      break;
    case 'ArrowLeft':
    case 'KeyA':
      store.dispatch(moveLeft())
      store.dispatch(iteration())
      break;
    case 'ArrowRight':
    case 'KeyD':
      store.dispatch(moveRight())
      store.dispatch(iteration())
      break;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <GameContainer>
      <BoardContainer />
    </GameContainer>
  </Provider>,
  document.getElementById('app')
);