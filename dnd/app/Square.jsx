var React = require('react');

var Square = React.createClass({
	render: function () {
		var black = this.props.black;
    	var fill = black ? 'black' : 'white';
    	var stroke = black ? 'white' : 'black';

    	return <div style={{
        	backgroundColor: fill,
        	color: stroke,
        	width: '100%',
        	height: '100%'
      	}}>
      		{this.props.children}
    	</div>
	}
});


module.exports = Square;