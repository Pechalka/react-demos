var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');
var _ = require('lodash');
var Guid = require('utils/Guid');
var Api = require('utils/Api');

var _sites = [
	{
		title : 'site 1',
		id : 1
	}
];



var siteApi = new Api('/sites');

module.exports = Reflux.createStore({
	init : function(){
		this.listenTo(actions.addSite, this.addSite);
		this.listenTo(actions.appStart, this.appStart);
	},
	appStart : function(){
		siteApi.get()
			   .then((sites) => {
			   		_sites = sites
			   		this.trigger(_sites);
			   		actions.selectSite(_sites[0])
			   	})
	},
	addSite : function(){
		var newObject = { title : 'new site ' + (_sites.length+1), id : Guid() };

		siteApi.post(newObject)
			   .then(()=>{
					_sites = React.addons.update(_sites, {
						$push : [newObject]
					})
					this.trigger(_sites);
					return _sites;			   	
			   })
			   .then((sites)=> actions.addSite.completed(newObject))
	},
	getInitialState: function() {
		return _sites;
	},
})