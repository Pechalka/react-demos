var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input, Grid, Col, Row } = require('react-bootstrap');

var actions = require('actions');

var Reflux = require('reflux');

var React = require('react');

var cx = React.addons.classSet;

var PageStore = require('stores/page');
var PagesStore = require('stores/pages');

module.exports = React.createClass({
	mixins : [
		Reflux.connect(PagesStore, 'pages'),
		Reflux.connect(PageStore, 'page')
	],
	renderPage : function(page, index){
		var css = cx({
			'bg-success' : this.state.page && this.state.page.id == page.id,
			 'clearfix' : true
		})
		return <li key={index} className={css}>
			<a onClick={actions.selectPage.bind(null, page)} href="javascript:void(0)">{page.title}</a>
			{!page.isHomePage &&<Button onClick={actions.removePage.bind(null, page)} className="pull-right">remove</Button>}
		</li>
	},
	render : function(){
		var items = this.state.pages.map(this.renderPage)
		return <div>
			<ul className="list-unstyled">
				{items}
			</ul>
			<Button onClick={actions.addPage}>add page</Button>
		</div>
	}
})