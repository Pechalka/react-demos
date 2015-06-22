var React = require('react');


var {OverlayTrigger, Grid, Col, Row, Tooltip, Button , Glyphicon, ButtonToolbar} = require('react-bootstrap');

var lorem = 'Pellentesque dignissim metus eget iaculis eleifend. Proin quis lacus vitae ex varius dignissim id sed nulla. Nunc sit amet vulputate dolor, eget pretium sem. Praesent feugiat vehicula arcu sit amet aliquam. In id tortor a justo facilisis suscipit id nec libero. Aliquam interdum molestie nulla, et convallis mauris luctus at. Cras et quam quis dolor tristique molestie. Vivamus quis enim vitae ante commodo imperdiet quis in nibh. Ut et eros quis felis molestie efficitur. Maecenas leo lacus, finibus sit amet ex at, ornare dignissim sem. Etiam sollicitudin augue neque, ut tempor neque vestibulum nec. Proin consequat est ipsum, a scelerisque orci ullamcorper et. Vestibulum malesuada aliquam leo in porttitor. Mauris eget maximus mi, nec semper tellus. Vestibulum dapibus, enim sit amet posu';

module.exports = React.createClass({
	showElement : function(el) {
		return this.props.model.elements.indexOf(el) != -1;
	},
	renderItem : function(){
		var cols = 12/this.props.model.cols;
		return <div className={"col-xs-" + cols} >
			{this.showElement('title') && <h3>Title</h3>}
			<p>{lorem}</p>
		</div>
	},
	render: function() {
		var items = this.props.model.items.map(this.renderItem)
		return <Grid>
			{items}
		</Grid>
	}

});
