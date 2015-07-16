var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');


var GRUD = require('mixins/GRUD')
var OBJECT = require('mixins/OBJECT')

var Api = require('utils/Api');

var siteApi = new Api('/sites');

module.exports = Reflux.createStore({
	mixins : [GRUD, OBJECT],
	init : function(){
		this.listenTo(actions.selectSite, this.selectSite);
		this.listenTo(actions.selectPalette, this.selectPalette)
		this.listenTo(actions.addSite.completed, this.addSiteCompleted)
		this.listenTo(actions.removeSite.completed, this.removeSiteCompleted)

		this.setApi(siteApi);
	},
	removeSiteCompleted : function(site){
		if (site.id == this.get().id){
			actions.selectFistSite();
		}
	},
	selectPalette : function(p){
		this.update({
			palette : {
				$set : p.css
			}
		})
	},
	addSiteCompleted : function(site){
		this.set(site)
	},
	selectSite : function(site){
		this.set(site)
	},
	getInitialState: function() {
		return this.get();
	},
})