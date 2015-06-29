var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');
var _ = require('lodash');

var Guid = require('utils/Guid');
var Api = require('utils/Api');





var _pages = [];

module.exports = Reflux.createStore({
	init : function(){
		this.listenTo(actions.addPage, this.addPage)
		this.listenTo(actions.removePage, this.removePage)
		this.listenTo(actions.showHomePage, this.showHomePage)
		this.listenTo(actions.selectSite, this.selectSite);
		this.listenTo(actions.addSite.completed, this.addSiteCompleted)
	},
	addSiteCompleted : function(){
		this.create({ title : 'home page', isHomePage : true })
	},
	selectSite : function(site){
		if (!site) return;
		
		this.api = new Api('/sites/' + site.id + '/pages');

		this.api.get()
				.then((pages)=> {
					_pages = pages;
					this.trigger(_pages);
					this.showHomePage();
				})

	},
	showHomePage : function(){
		var homePage = _.find(_pages, { isHomePage : true })
		actions.selectPage(homePage)
	},
	removePage : function(page){
		var index = _.findIndex(pages, { id : page.id });
		pages = React.addons.update(pages, {
			$splice : [[index, 1]]
		})
		this.trigger(pages);
		actions.removePage.completed(page);
	},
	create : function(obj){
		return this.api.post(obj)
					   .then(()=>{
					   		_pages = React.addons.update(_pages, {
								$push : [obj]
							})
							this.trigger(_pages);
							return _pages;
					   })
	},
	addPage : function(){
		this.create({ title : 'new page ' + _pages.length, isHomePage : false })
	},
	getInitialState: function() {
		return _pages;
	},
})