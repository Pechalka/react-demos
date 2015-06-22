var React = require('react');

var {OverlayTrigger, Grid, Col, Tooltip, Button , Glyphicon, ButtonToolbar} = require('react-bootstrap');

module.exports = React.createClass({
	showElement : function(el) {
		return this.props.model.elements.indexOf(el) != -1;
	},
	render: function() {

		return <Grid>
			<div className="clearfix">
				{this.showElement('logo') && <div className="pull-left">
					logo
				</div>}
				<div className="pull-right">
					<ul className="list-inline">
						<li>Home</li>
						<li>About</li>
						<li>Contact</li>
					</ul>
				</div>
			</div>
		</Grid>
	}

});
