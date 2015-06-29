var Reflux = require('reflux');

var actions = Reflux.createActions([
	'addPage',
	'selectPage',
	'showHomePage',

	'selectSite',


	'appStart'
])


actions.removePage = Reflux.createAction({
	asyncResult : true
})

actions.addSite = Reflux.createAction({
	asyncResult : true
})

module.exports = actions;