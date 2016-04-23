import React from 'react';
import {connect} from 'react-redux'
import {init, iteration, move} from '../action_creators';
import moveRandom from '../ai/random_moves.js'

const style = {
  container:{
    marginTop: '70px',
    //backgroundColor: '#faf8ef',
    fontFamily: '"Clear Sans", "Helvetica Neue", Arial, sans-serif',
    overflowX: 'hidden'
  },
  button:{
    textAlign: 'center',
    borderRadius: '3px',
    padding: '15px 20px 15px 20px',
    color:'#f9f6f2',
    background: '#8f7a66',
    height: '100%',
    lineHeight: '42px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'none',
    marginRight:'305px'
  },
  buttonRow:{
    height:'70px'
  },
  lost: {
    fontWeight: 'bold',
    fontSize: '25px'
  }
}

export const Game = React.createClass({
  handleRestart() {
    this.props.init()
    this.props.iteration()
  },
  startAI() {
    if(this.props.lost || this.props.hasWon) return
    setTimeout(()=> {
      this.props.move(moveRandom())
      this.props.iteration()
      this.startAI()
    },1)
  },
  render() {
    return (
      <div className="container" style={style.container}>
        <div className="row" style={style.buttonRow}>
          <div className="col-md-2 col-md-offset-3">
            <a style={style.button} onClick={this.handleRestart}>Restart</a>
            <a style={style.button} onClick={this.startAI}>AI</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-md-offset-3">
            {this.props.lost ? <div style={style.lost}>Lost</div> : ''}
            {this.props.hasWon ? <div>Won!</div> : ''}
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    board: state.get('board'),
    hasWon: state.get('hasWon'),
    lost: state.get('lost')
  };
}

export const GameContainer = connect(mapStateToProps, {
  init,
  iteration,
  move})(Game);
