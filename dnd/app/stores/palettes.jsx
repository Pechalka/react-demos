
var Reflux = require('reflux');
var GRUD = require('mixins/GRUD')

var actions = require('actions');
var promise = require('q');


var getPaletersByThem = function(them){
	var deferred = promise.defer();
	setTimeout(()=>{
		var items = [];
		if (them == "default"){
			items = [
				{ name : 'crazy summer', css : 'green' },
				{ name : 'I see read', css : 'red'},
				{ name : 'elephant walking', css : 'blue'}
			]
		}
		if (them== "tech-paradise"){
			items = [
				{ name : 'default them', css : 'th-default' },
				{ name : 'orange them', css : 'th-orange'}
			]
		}
		deferred.resolve(items)
	},0)
	return deferred.promise;
}

module.exports = Reflux.createStore({
	mixins : [GRUD],
	init : function(){
		this.listenTo(actions.selectSite, this.selectSite);
		this.listenTo(actions.addSite.completed, this.addSiteCompleted)
	},
	addSiteCompleted : function(site){
		getPaletersByThem(site.them)
			.then((data) => this.set(data))
	},
	selectSite : function(site){
		getPaletersByThem(site.them)
			.then((data) => this.set(data))
	},
	
	getInitialState: function() {
		return this.get();
	}
})