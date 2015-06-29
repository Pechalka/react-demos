var React = require('react');
var cx = React.addons.classSet;

var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input, Grid, Col, Row } = require('react-bootstrap');

var App = React.createClass({
	getInitialState: function() {
		return {
			tasks : [] 
		};
	},
	render : function(){
		return <Grid>
			<Row>
				<Col xs={4}>test</Col>
				<Col xs={8}>8</Col>
			</Row>
		</Grid>
	}
});

module.exports = App;


