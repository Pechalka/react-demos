var _ = require('lodash');

var React = require('react');

module.exports = {
	init : function(){
		this.items = [];		
	},
	get : function(){
		return this.items;
	},
	set : function(items){
		this.items = items;
		this.trigger(this.items)
		return this.items;
	},
	_remove : function(item){
		var index = _.findIndex(this.get(), { id : item.id });
		return this._update({
			$splice : [[index, 1]]
		})
	},
	_update : function($update){
		var newState = React.addons.update(this.get(), $update);
		return this.set(newState);
	},
	_push : function(item){
		return this._update({
			$push : [item]
		})
	},
	push : function(item){
		return this._push(item);
	},
	update : function($update){
		return this._update($update)
	},
	remove : function(item){
		return this._remove(item);
	}
}