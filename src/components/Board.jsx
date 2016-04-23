import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import Cell from './Cell'

const style = {
  container:{
    marginTop: '70px',
    // backgroundColor: '#faf8ef',
    fontFamily: '"Clear Sans", "Helvetica Neue", Arial, sans-serif'
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '13px',
    borderColor: '#bbada0',
    borderRadius: '3px'
  },
  table: {
    backgroundColor: '#bbada0'
  }
}

export const Board = React.createClass({
  mixins: [PureRenderMixin],
  getBoard: function() {
    return this.props.board || [];
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-2 col-md-offset-3" style={style.center}>
            <table style={style.table}>
              <tbody>
              {
                this.getBoard().map((row, row_index) =>
                  <tr key={`r${row_index}`} style={style.border}>
                    {
                      row.map((val,col_index) =>
                        <td key={`${row_index}_${col_index}`} style={style.border}>
                          <Cell value={val}/>
                        </td>
                      )
                    }
                  </tr>
                )
              }
              </tbody>
            </table>
        </div>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    board: state.get('board')
  };
}

connect(mapStateToProps)(Board);

export const BoardContainer = connect(mapStateToProps)(Board);
