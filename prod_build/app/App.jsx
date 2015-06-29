var React = require('react');
var cx = React.addons.classSet;

var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input, Grid, Col, Row } = require('react-bootstrap');

var PagesStore = require('./stores/pages');
var PageStore = require('./stores/page');
var SitesStore = require('./stores/sites');


var actions = require('actions');

var Reflux = require('reflux');

var PageList = React.createClass({
	mixins : [
		Reflux.connect(PagesStore, 'pages')
	],
	renderPage : function(page, index){
		return <li key={index} className="clearfix">
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


var SiteList = React.createClass({
	mixins : [
		Reflux.connect(SitesStore, 'sites')
	],
	renderItem : function(item, index){
		return <li key={index} className="clearfix">
			<a  onClick={actions.selectSite.bind(null, item)}  href="javascript:void(0)">{item.title}</a>
			{index != 0 && <Button className="pull-right">remove</Button>}
		</li>
	},
	render : function(){
		var items = this.state.sites.map(this.renderItem)
		return <div>
			<ul className="list-unstyled">
				{items}
			</ul>
			<Button onClick={actions.addSite}>add site</Button>
		</div>
	}
})



var Page = React.createClass({
	render : function(){
		var page = this.props.page;

		if (!page) return <div>not page</div>;

		return <Grid>
			<h2>{page.title}</h2>
			<Row>
				<Col xs={4}>test</Col>
				<Col xs={8}>8</Col>
			</Row>
		</Grid>
	}
})

var Panel = React.createClass({
	render : function(){
		return <div className="constructor-panel">
			<PageList/>
			<SiteList/>
		</div>
	}
})

var App = React.createClass({
	mixins : [
		Reflux.connect(PageStore, 'page')
	],
	getInitialState: function() {
		return {
			tasks : []
		};
	},
	componentDidMount: function() {
		actions.appStart();
	},
	render : function(){
		return <div>
			<Panel />
			<Page page={this.state.page}/>
		</div>
	}
});

module.exports = App;


