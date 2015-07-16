var _ = require('lodash');


module.exports = {
	init : function(){
		
	},
	setApi : function(api){
		this.api = api;
	},
	fetch : function(){
		return this.api.get()
					   .then((data)=>this.set(data))
	},
	remove : function(item){
		return this.api.del(item.id)
				.then(() => this._remove(item))
	},
	removeAll : function(){
		return this.api.del(null)
					   .then(() => this.set([]))
	},
	push : function(item){
		return this.api.post(item)
					   .then(()=> this._push(item))
	}
}