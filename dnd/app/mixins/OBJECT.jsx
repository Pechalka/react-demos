var _ = require('lodash');


module.exports = {
	init : function(){
		
	},
	setApi : function(api){
		this.api = api;
	},
	update : function($update){
		var newState = this._update($update)
		this.api.put(newState.id, newState)
	}
}