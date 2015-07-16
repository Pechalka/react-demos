var Reflux = require('reflux');
var actions = require('actions');
var React = require('react');
var _ = require('lodash');
var Guid = require('utils/Guid');
var Api = require('utils/Api');

var _sites = [];
var Api = require('utils/Api');


var siteApi = new Api('/sites');


var GRUD = require('mixins/GRUD')
var REST = require('mixins/REST')

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
	mixins : [GRUD, REST],
	init : function(){
		this.listenTo(actions.addSite, this.addSite);
		this.listenTo(actions.removeSite, this.removeSite)

		this.listenTo(actions.appStart, this.appStart);

		this.listenTo(actions.selectFistSite, this.selectFistSite)

		this.setApi(siteApi);
	},
	selectFistSite : function(){
		actions.selectSite(this.get()[0])
	},
	removeSite : function(site){
		this.remove(site)
			.then(() => actions.removeSite.completed(site))

	},
	appStart : function(){
		this.fetch()
			.then((sites) => {
				if (sites.length == 0){
					this.addSite({ id : 'default' });
				} else {
					actions.selectSite(sites[0])
				}
			})
	},
	addSite : function(them){
		getPaletersByThem(them.id)
			.then((palettes) => new Object({ title : 'new site ' + (_sites.length+1), id : Guid(), them : them.id, palette : palettes[0].css }))
			.then((newObject) => { this.push(newObject); return newObject; })
			.then((newObject)=> actions.addSite.completed(newObject))
	},
	getInitialState: function() {
		return this.get();
	},
})