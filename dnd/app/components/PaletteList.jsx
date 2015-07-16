var actions = require('actions');

var Reflux = require('reflux');

var React = require('react');

var cx = React.addons.classSet;

var PalettesStore = require('stores/palettes');
var PaletteStore = require('stores/palette');

module.exports = React.createClass({
	mixins : [
		Reflux.connect(PalettesStore, 'palettes'),
		Reflux.connect(PaletteStore, 'palette')
	],
	render : function(){
		var items = this.state.palettes.map((p)=>{
			var css = cx({
				'bg-primary' : this.state.palette && this.state.palette == p.css 
			})
			return <li onClick={actions.selectPalette.bind(null, p)} className={css}>
				{p.name}
			</li>
		})
		return <div>
			<ul className="list-unstyled">
			{items}
			</ul>
		</div>
	}
})