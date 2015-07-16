
var React = require('react');
var PropTypes = React.PropTypes;


var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var Square = require('./Square');
var { canMoveKnight, moveKnight } = require('./Game');

var BoardSquare = require('./BoardSquare');

var Knight = require('./Knight');

var Board = React.createClass({
  	propTypes: {
    	knightPosition: PropTypes.arrayOf(
      		PropTypes.number.isRequired
    	).isRequired
  	},

    handleSquareClick: function (toX, toY) {
         if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }, 
  renderSquare: function (i) {
  var x = i % 8;
  var y = Math.floor(i / 8);

  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x}
                   y={y}>
        {this.renderPiece(x, y)}
      </BoardSquare>
    </div>
  );
},

renderPiece: function (x, y) {
  var knightX = this.props.knightPosition[0]
  var knightY = this.props.knightPosition[1];

  if (x === knightX && y === knightY) {
    return <Knight />;
  }
},

  render: function () {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }	
});

module.exports =  DragDropContext(HTML5Backend)(Board);

