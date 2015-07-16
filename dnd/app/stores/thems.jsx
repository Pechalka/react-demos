var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');
var _ = require('lodash');

var Guid = require('utils/Guid');
var Api = require('utils/Api');


var GRUD = require('mixins/GRUD')
var REST = require('mixins/REST')

var defaultThems = [
	{
		title : 'them 1',
		id : 'default'
	},
	{
		title : 'them 2',
		id : 'tech-paradise'
	}
]

module.exports = Reflux.createStore({
	mixins : [GRUD, REST],
	init : function(){

	},

	getInitialState: function() {
		return defaultThems;
	},
})