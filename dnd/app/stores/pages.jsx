var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');
var _ = require('lodash');

var Guid = require('utils/Guid');
var Api = require('utils/Api');


var GRUD = require('mixins/GRUD')
var REST = require('mixins/REST')


module.exports = Reflux.createStore({
	mixins : [GRUD, REST],
	init : function(){
		this.listenTo(actions.addPage, this.addPage)
		this.listenTo(actions.removePage, this.removePage)
		this.listenTo(actions.showHomePage, this.showHomePage)
		this.listenTo(actions.selectSite, this.selectSite);

		this.listenTo(actions.addSite.completed, this.addSiteCompleted)
		this.listenTo(actions.removeSite.completed, this.removeSiteCompleted)
	},
	removeSiteCompleted : function(site){
		this.setApi(new Api('/sites/' + site.id + '/pages'))
		
		this.removeAll();
	},
	addSiteCompleted : function(site){
		this.setApi(new Api('/sites/' + site.id + '/pages'))
		
		var newPage = { title : 'home page', isHomePage : true, id : Guid() }
		this.push(newPage)
			.then(()=>this.selectSite(site))
	},
	selectSite : function(site){	
		this.setApi(new Api('/sites/' + site.id + '/pages'))
		this.fetch()
			.then(()=> this.showHomePage())

	},
	showHomePage : function(){
		var homePage = _.find(this.get(), { isHomePage : true })
		actions.selectPage(homePage)
	},
	removePage : function(page){
		this.remove(page)
			.then(() => actions.removePage.completed(page))
	},
	addPage : function(){
		var newPage = { title : 'new page ' + this.get().length, isHomePage : false , id : Guid() }
		this.push(newPage)
	},
	getInitialState: function() {
		return this.get();
	},
})