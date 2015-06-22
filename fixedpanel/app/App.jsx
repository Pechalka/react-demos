var React = require('react');
var cx = React.addons.classSet;

var { cloneElement } =  React;

var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar} = require('react-bootstrap');

var Block = React.createClass({
	render : function(){
		var css = cx({
			'block' : true,
			'block--disabled' : this.props.disabled
		})
		return <div className={css} >
			<div className="block__toolbar">
				<ButtonToolbar>
					<Button><Glyphicon glyph="remove"/></Button>
					<Button onClick={this.props.onEdit}><Glyphicon glyph="edit"/></Button>
				</ButtonToolbar>
			</div>
			<div>
				{this.props.model.type}
			</div>
			{this.props.disabled && <div onClick={this.props.cancelEdit} className="block__glass">
			</div>}
		</div>
	}
})

var Page = React.createClass({

	render: function() {
		
		var blocks = this.props.blocks.map((b, index)=>{
			var disabled = this.props.editBlock && this.props.editBlock != b;
			return <Block cancelEdit={this.props.cancelEdit} onEdit={this.props.onEdit.bind(null, b)} disabled={disabled} model={b} index={index}/>
		})
		return <div>
			{blocks}
		</div>
	}
})

var BlocksList = React.createClass({
	render : function(){
		return <div className="panel">
			<ul className="list-unstyled">
				{this.props.blocks.map((b)=><li onClick={this.props.onClick.bind(null, b)}>{b}</li>)}
			</ul>
		</div>
	}
})

var ConstructorPanel = React.createClass({
	getInitialState: function() {
		return {
			open : false 
		};
	},
	toggle : function(){
		this.setState({ open : !this.state.open })
	},
	
	render : function(){
		var content = this.state.open
			? <div >
				<Button onClick={this.toggle}>
					<Glyphicon glyph='remove' />
				</Button>
				<BlocksList onClick={this.props.onAddBlock} blocks={['menu', 'grid', 'footer']}/>
			</div>
			: <div>
				<Button onClick={this.toggle}>
					<Glyphicon glyph='plus' />
				</Button>
			</div>
		return <div className="constructor-panel">
			{content}
		</div>
	}
})

var EditBlockPanel = React.createClass({
	render : function(){
		var block = this.props.block;
		if (!block) return null;

		return <div className="block-panel">
			<h3>Block settings</h3>
			<p>settings</p>

			<h3>element settings</h3>
			<p>settings</p>
		</div>
	}
})

var App = React.createClass({
	addBlock : function(b){
		alert(b)
	},
	getInitialState: function() {
		return {
			blocks : [
				{ type : 'menu' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'grid' },
				{ type : 'footer' },
			],
			editBlock : null
		};
	},
	editBlock : function(b){
		this.setState({ editBlock : b })
	},
	cancelEdit : function(){
		this.setState({ editBlock : null })	
	},
	render : function(){
		return <div>
			<ConstructorPanel onAddBlock={this.addBlock}/>
			<Page cancelEdit={this.cancelEdit} onEdit={this.editBlock} editBlock={this.state.editBlock} blocks={this.state.blocks}/>
			<EditBlockPanel block={this.state.editBlock}/>
		</div>
	}
});

module.exports = App;