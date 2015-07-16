var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input, Grid, Col, Row } = require('react-bootstrap');

var actions = require('actions');

var Reflux = require('reflux');

var React = require('react');

var cx = React.addons.classSet;

var SiteStore = require('stores/site');
var SitesStore = require('stores/sites');

module.exports = React.createClass({
	mixins : [
		Reflux.connect(SiteStore, 'site'),
		Reflux.connect(SitesStore, 'sites')
	],
	renderItem : function(item, index){
		var css = cx({
			'bg-success' : this.state.site && this.state.site.id == item.id,
			 'clearfix' : true
		})
		return <li key={index} className={css}>
			<a  onClick={actions.selectSite.bind(null, item)}  href="javascript:void(0)">{item.title}</a>
			{index != 0 && <Button onClick={actions.removeSite.bind(null, item)} className="pull-right">remove</Button>}
		</li>
	},
	render : function(){
		var items = this.state.sites.map(this.renderItem)
		return <div>
			<ul className="list-unstyled">
				{items}
			</ul>
		</div>
	}
})