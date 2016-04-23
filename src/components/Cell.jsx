import React, { PropTypes } from 'react'

const length = '100px'
const fontSize = '45px'

const style = {
  cell: {
    width: length,
    height: length,
    backgroundColor: 'rgba(238, 228, 218, 0.35)'
  },
  value: {
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: length,
    fontSize: fontSize,
    fontWeight: 'bold'
  },
  2: {
    backgroundColor: '#eee4da',
    color:'#776e65'
  },
  4: {
    backgroundColor: '#ede0c8',
    color:'#776e65'
  },
  8: {
    backgroundColor: '#f2b179',
    color: '#f9f6f2'
  },
  16: {
    backgroundColor: '#f59563',
    color: '#f9f6f2'
  },
  32: {
    backgroundColor: '#f67c5f',
    color: '#f9f6f2'
  },
  64: {
    backgroundColor: '#f65e3b',
    color: '#f9f6f2'
  },
  128: {
    backgroundColor: '#edcf72',
    color: '#f9f6f2'
  },
  256: {
    backgroundColor: '#edcc61',
    color: '#f9f6f2',
    boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)'
  },
  512: {
    backgroundColor: '#edc850',
    color: '#f9f6f2',
    boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)'
  },
  1024: {
    backgroundColor: '#edc53f',
    color: '#f9f6f2',
    boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)'
  },
  2048: {
    backgroundColor: '##edc22e',
    color: '#f9f6f2',
    boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)'
 }
}
const Cell = React.createClass({
  render () {
    const val = this.props.value || ''
    return (
      <div style={style.cell}>
        <div style={style[val]}>
          <div style={style.value}>{val}</div>
        </div>
    </div>
    )
  }
})

export default Cell
