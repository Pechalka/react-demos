var React = require('react');
var cx = React.addons.classSet;

var { cloneElement } =  React;

var {OverlayTrigger, Tooltip, Button , Glyphicon, ButtonToolbar, Input } = require('react-bootstrap');

require('./blocks/menu')
require('./blocks/grid')
require('./blocks/footer')

var Block = React.createClass({
	render : function(){
		var css = cx({
			'block' : true,
			'block--disabled' : this.props.disabled,
			'block--edit' : this.props.edit
		})
		var b = this.props.model;
		
		var block = React.createFactory(require('./blocks/' + b.type));

		return <div className={css} >
			<div className="block__toolbar">
				<ButtonToolbar>
					<Button onClick={this.props.onRemove}><Glyphicon glyph="remove"/></Button>
					<Button onClick={this.props.onEdit}><Glyphicon glyph="edit"/></Button>
				</ButtonToolbar>
			</div>
			<div>
				{block({ model : b })}
			</div>
			{this.props.disabled && <div onClick={this.props.cancelEdit} className="block__glass">
			</div>}
		</div>
	}
})

var Page = React.createClass({

	render: function() {
		
		var blocks = this.props.blocks.map((b, index)=>{
			var disabled = this.props.editBlock && this.props.editBlock.id != b.id;
			var edit = this.props.editBlock && this.props.editBlock.id == b.id;
			return <Block edit={edit} 
				cancelEdit={this.props.cancelEdit} 
				onRemove={this.props.onRemove.bind(null, b, index)} 
				onEdit={this.props.onEdit.bind(null, b, index)} disabled={disabled} model={b} index={index}/>
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
	addItem : function(){
		this.props.changeBlock(this.props.index, this.props.block, { items : { $push : [[2]] }  })
	},
	removeItem : function(){
		this.props.changeBlock(this.props.index, this.props.block, { items : { $splice : [[0, 1]] }  })
	},
	toggleElement : function(el){
		var block = this.props.block;
		var elIndex = block.elements.indexOf(el);

		if (elIndex ==-1){
			this.props.changeBlock(this.props.index, block, { elements : { $push : [el] }  })	
		} else {
			this.props.changeBlock(this.props.index, block, { elements : { $splice : [[elIndex, 1]] }  })	
		}
	},
	render : function(){
		var block = this.props.block;
		var index = this.props.index;
		if (!block) return null;

		var elements, cols,items;

		if (block.cols){
			var btns = [2,3,4].map((n)=>{
				var css = cx({
					"active" : block.cols == n 
				})
				return <Button className={css} key={n} 
				onClick={this.props.changeBlock.bind(null, index, block, { cols : { $set : n }  })}>{n}</Button>
			})
			cols = <div>
				<h4>Columns</h4>
				<ButtonToolbar>
					{btns}
				</ButtonToolbar>
			</div>
		}
		if (block.items){
			items = <div>
				<h4>Items</h4>
				<ButtonToolbar>
					<Button onClick={this.addItem}><Glyphicon glyph="plus"/></Button>
					<Button onClick={this.removeItem}><Glyphicon glyph="minus"/></Button>
				</ButtonToolbar>
			</div>
		}

		if (block.avalibleElements) {
			var elementsItems = block.avalibleElements.map((b)=>{
				var checked = block.elements.indexOf(b) != -1;
				return <li key={b}><Input onChange={this.toggleElement.bind(null, b)} checked={checked} label={b} type="checkbox"/></li>
			})
			elements = <div>
				<h4>Elements</h4>
				<ul className="list-unstyled">
					{elementsItems}
				</ul>
			</div>
		}
			
		var settings = <div>
			{cols}
			{items}
			{elements}
		</div>


		return <div className="block-panel">
			<h3>Block settings</h3>
			<div>
				{settings}
			</div>

			<h3>element settings</h3>
			<p>settings</p>
		</div>
	}
})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var createBlock = function(type){
	var block = {
		type : type,
		id : guid()
	}
	if (type == 'menu'){
		block.elements = ['logo'];
		block.avalibleElements = ['logo'];
	}
	if (type == 'grid'){
		block.items = [1,2,3,4];
		block.cols = 4;
		block.elements = ['title'];
		block.avalibleElements = ['title'];
	}
	if (type == 'footer'){
		block.elements = [];
		block.avalibleElements = ['items'];
	}

	return block;
};

var App = React.createClass({

	addBlock : function(b){
		var newState = React.addons.update(this.state, {
			blocks : {
				$push : [createBlock(b)]
			}
		})
		this.setState(newState)
	},
	getInitialState: function() {
		return {
			blocks : [
				createBlock('menu'),
				createBlock('grid'),
				createBlock('footer')
			],
			editBlock : null,
			index : -1
		};
	},
	removeBlock : function(b, index){
		var newState = React.addons.update(this.state, {
			blocks : {
				$splice : [[index, 1]]
			}
		})
		this.setState(newState)
	},
	editBlock : function(b, index){
		this.setState({ editBlock : b, index : index })
	},
	cancelEdit : function(){
		this.setState({ editBlock : null })	
	},
	changeBlock : function(index, block, $update){
		var b = React.addons.update(block, $update);
		var newState = React.addons.update(this.state, {
			blocks : {
				$splice : [[index, 1, b]]
			},
			editBlock : {
				$set : b
			}
		})
		this.setState(newState)
	},
	render : function(){
		return <div>
			{!this.state.editBlock && <ConstructorPanel onAddBlock={this.addBlock}/>}
			<Page 	cancelEdit={this.cancelEdit} 
					onEdit={this.editBlock} 
					editBlock={this.state.editBlock} 
					onRemove={this.removeBlock}
					blocks={this.state.blocks}/>
			<EditBlockPanel index={this.state.index} changeBlock={this.changeBlock} block={this.state.editBlock}/>
		</div>
	}
});

module.exports = App;