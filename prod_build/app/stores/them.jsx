
var Reflux = require('reflux');
var GRUD = require('mixins/GRUD')

var actions = require('actions');

module.exports = Reflux.createStore({
	init : function(){
	//	this.listenTo(actions.selectPalette, this.selectPalette)
	},

	
	getInitialState: function() {
		return null;
	}
})