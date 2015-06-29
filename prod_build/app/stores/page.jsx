var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');

var _page = null;


module.exports = Reflux.createStore({
	init : function(){
		this.listenTo(actions.selectPage, this.selectPage);
		this.listenTo(actions.removePage.completed, this.pageRemoved)
	},

	pageRemoved : function(page){
		if (page.id === _page.id)
			actions.showHomePage();
	},

	selectPage : function(page){
		_page = page
		this.trigger(_page)
	},
	getInitialState: function() {
		return _page;
	},
})