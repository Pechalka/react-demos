var React = require('react');
var cx = React.addons.classSet;

var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input, Grid, Col, Row } = require('react-bootstrap');


var PageStore = require('./stores/page');
var SitesStore = require('./stores/sites');
var ThemsStore = require('./stores/thems');
var PaletteList = require('./components/PaletteList');

var actions = require('actions');

var Reflux = require('reflux');

var PageList = require('components/PageList')


var SiteList = require('components/SiteList')

var ThemList = React.createClass({
	mixins : [
		Reflux.connect(ThemsStore, 'thems')
	],
	install : function(them){
		actions.addSite(them)
	},
	renderItem : function(item, index){
		return <div key={index} className="them text-center">
			{item.title}
			<Button onClick={this.install.bind(null, item)} className="pull-right">install</Button>
		</div>
	},
	render : function(){
		var items = this.state.thems.map(this.renderItem)
		return <div>
			<h3>Thems</h3>
			<div className="clearfix">
				{items}
			</div>
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
			<ThemList/>
			<PaletteList/>
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


