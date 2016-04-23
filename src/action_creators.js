export function init() {
  return {
    type: 'INIT',
  };
}

export function moveUp() {
  return {
    type: 'MOVE_UP'
  }
}

export function moveDown() {
  return {
    type: 'MOVE_DOWN'
  }
}

export function moveLeft() {
  return {
    type: 'MOVE_LEFT'
  }
}

export function moveRight() {
  return {
    type: 'MOVE_RIGHT'
  }
}

export function move(dir) {
  return dir
}

export function iteration() {
  return {
    type: 'TICK'
  };
}
