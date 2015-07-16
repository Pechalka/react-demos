
var Reflux = require('reflux');
var GRUD = require('mixins/GRUD')

var actions = require('actions');

module.exports = Reflux.createStore({
	init : function(){
		this.listenTo(actions.selectPalette, this.selectPalette)
		this.listenTo(actions.selectSite, this.selectSite);
		this.listenTo(actions.addSite.completed, this.addSiteCompleted)
	},

	selectPalette : function(p){
		this.trigger(p.css)
	},
	addSiteCompleted : function(site){
		this.trigger(site.palette)
	},
	selectSite : function(site){
		this.trigger(site.palette)
	},
	getInitialState: function() {
		return null;
	}
})