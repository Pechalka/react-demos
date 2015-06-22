var React = require('react');
var cx = React.addons.classSet;

var { cloneElement } =  React;

var Drop = require('tether-drop');

var {OverlayTrigger, Tooltip, ButtonToolbar, Button, Glyphicon, OverlayTrigger} = require('react-bootstrap');

var onclickoutside = require('react-onclickoutside');

// function viewport()
// {
// var e = window
// , a = 'inner';
// if ( !( 'innerWidth' in window ) )
// {
// a = 'client';
// e = document.documentElement || document.body;
// }
// return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
// }

// function clearSelection() {
//   try {
//     window.getSelection().removeAllRanges();
//   } catch(e) {
//     document.selection.empty(); // IE<9
//   }
// }

// var ColsPopover = React.createClass({
// 	getInitialState: function() {
// 		return {
// 			cols : 2 
// 		};
// 	},
// 	click : function(n){
// 		this.setState({ cols : n })
// 	},
// 	render : function(){
// 		var btns = [2, 3, 4].map((n)=><button onClick={this.click.bind(null, n)} className={cx({ 'btn-default' : true, 'btn' : true, 'active' : this.state.cols == n })}>{n}</button>)
// 		return <div style={{ width : 200 }}>
// 			<div className="btn-toolbar">
// 				{btns}
// 			</div>
// 		</div>
// 	}
// })

// var ToolbarItem = React.createClass({
// 	render : function(){
// 		return null;
// 	}
// })

// var Toolbar = React.createClass({
// 	getInitialState: function() {
// 		return {
// 			opened : null,
// 			openUp : false
// 		};
// 	},
// 	renderBtns : function(){
// 		var btns = this.props.children.map((item, index)=>{
// 			var btn = cloneElement(item.props.button, { onClick : this.click.bind(null, index) });
			
// 			if (this.state.opened == index) return btn;

// 			return <OverlayTrigger placement='bottom' overlay={item.props.tooltip}>
//     			{btn}
//     		</OverlayTrigger>
// 		})
// 		return <div className="btn-toolbar">
// 			{btns}
// 		</div>
// 	},
// 	renderPopever : function(){
// 		var item = this.props.children.filter((item, index)=> {
// 			return index == this.state.opened;
// 		})

// 		if (item.length > 0) return item[0].props.children;

// 		return null;
// 	},
// 	click : function(item){
// 		var opened = this.state.opened == item ? null : item;
// 		this.props.onOpen();


// 		// var $popover = React.findDOMNode(this.refs.popover);
// 		// var $block = React.findDOMNode(this.refs.block);


// 		// var viewPort = viewport();

// 		// console.log(viewPort.height - $block.getBoundingClientRect().top)

// 		// console.log($block.getBoundingClientRect())
// 		// console.log(viewPort)

// 		// console.log('block', $block.getBoundingClientRect())

// 		// this.setState({
// 		// 	openUp : $popover.getBoundingClientRect().height > $block.getBoundingClientRect().height
// 		// })

// 		this.setState({
// 			opened : opened
// 		}, ()=>{
// 			var $popover = React.findDOMNode(this.refs.popover);
// 			var $block = React.findDOMNode(this.refs.block);
// 			var viewPort = viewport();


// 			this.setState({
// 				openUp : !(viewPort.height - $block.getBoundingClientRect().top > $popover.getBoundingClientRect().height)
// 			})
// 		})
// 	},
// 	componentDidMount: function() {
		
// 	},	
// 	// componentDidUpdate: function(prevProps, prevState) {
// 	// 	if (this.dropInstance && this.state.opened != prevState.opened){
// 	// 		this.dropInstance.toggle();
// 	// 		return;
// 	// 	}

// 	// 	var $btns = React.findDOMNode(this.refs.btns);
// 	// 	var $popover = React.findDOMNode(this.refs.popover);
// 	// 	this.dropInstance = new Drop({
// 	// 	  target: $btns,
// 	// 	  content: $popover,
// 	// 	  classes: 'drop-theme-arrows',
// 	// 	  position: 'bottom left',
// 	// 	  openOn: 'always'
// 	// 	})
// 	// },
// 	// componentWillUnmount: function() {
// 	// 	if (this.dropInstance)
// 	// 		this.dropInstance.destroy();		
// 	// },
// 	componentDidUpdate: function(prevProps, prevState) {
// 		var $popover = React.findDOMNode(this.refs.popover);
// 		var $block = React.findDOMNode(this.refs.block);

// 		// console.log('popover', $popover.getBoundingClientRect())
// 		// console.log('block', $block.getBoundingClientRect())

// 		// this.setState({
// 		// 	openUp : $popover.getBoundingClientRect().height > $block.getBoundingClientRect().height
// 		// })	
// 	},
// 	onMouseLeave : function(){
// 		//this.setState({ opened : null })
// 	},
// 	close : function(){
// 	//	alert('close')
// 		this.setState({ opened : null })
// 	},
// 	render : function(){
// 		var css = cx({
// 			'toobar__popover' : true,
// 			'toobar__popover--direction_up' : this.state.openUp
// 		})
// 		return <div onMouseLeave={this.onMouseLeave} className="toobar" ref="block">
// 			<div ref="btns" className="toobar__btns">{this.renderBtns()}</div>
// 			<div ref="popover" className={css}>{this.renderPopever()}</div>
// 		</div>
// 	}
// })

var Toolbar = React.createClass({
	render : function(){
		return <ButtonToolbar>
			 <OverlayTrigger placement='bottom' overlay={<Tooltip>remove</Tooltip>}>
			 	<Button onClick={this.props.onClick.bind(null, 1)}><Glyphicon glyph="remove"/></Button>
			 </OverlayTrigger>
			<Button onClick={this.props.onClick.bind(null, 2)}><Glyphicon glyph="option-vertical"/></Button>
			<Button onClick={this.props.onClick.bind(null, 3)}><Glyphicon glyph="list"/></Button>
			<Button onClick={this.props.onClick.bind(null, 4)}><Glyphicon glyph="arrow-up"/></Button>
			<Button onClick={this.props.onClick.bind(null, 5)}><Glyphicon glyph="arrow-down"/></Button>
		</ButtonToolbar>
	}
})

var Block = React.createClass({
	getInitialState: function() {
		return {
			open : false ,
			openOn :'hover'
		};
	},

	// componentDidMount: function() {
	// 	this.initDrop();
	// },
	// initDrop : function(){
	// 	this.drop = this.dropInstance = new Drop({
	// 	  target: React.findDOMNode(this.refs.block),
	// 	  content: React.findDOMNode(this.refs.toolbar),
	// 	  position: 'top center',
	// 	  openOn: this.state.openOn
	// 	})
	// },
	// componentDidUpdate: function(prevProps, prevState) {
	// 	this.initDrop();
	// },
	// componentWillUnmount: function() {
	// 	this.drop.destroy();
	// },
	onClick : function(n){
		if (n == 1) this.props.onRemove();
		//this.setState({ openOn : 'always' }, ()=> this.initDrop())
	},
	// componentDidUpdate: function(prevProps, prevState) {
	// 	return false;
	// },
	render : function(){
		return <div  >
			<div ref="toolbar" className='toolbar'>
				<ButtonToolbar>
					<OverlayTrigger key={1} placement='bottom' overlay={<Tooltip>remove</Tooltip>}>
						<Button onClick={this.onClick.bind(null, 1)}><Glyphicon glyph="remove"/></Button>
					</OverlayTrigger>
					<Button  key={2} onClick={this.onClick.bind(null, 2)}><Glyphicon glyph="option-vertical"/></Button>
					<Button  key={3} onClick={this.onClick.bind(null, 3)}><Glyphicon glyph="list"/></Button>
					<Button  key={4} onClick={this.onClick.bind(null, 4)}><Glyphicon glyph="arrow-up"/></Button>
					<Button  key={5} onClick={this.onClick.bind(null, 5)}><Glyphicon glyph="arrow-down"/></Button>
				</ButtonToolbar>
			</div>
			<div ref="block" className="block" style={{ minHeight : this.props.height }}>blocks</div>
		</div>
	}
})

//Drop

var App = React.createClass({
	getInitialState: function() {
		return {
			blocks : []//70, 200, 80 ,20 ,30 ,50, 100, 90, 200, 80 ,20 ,30 ,50, 100, 90, 200, 80 ,20 ,30 ,50, 100, 90] 
		};
	},
	addBlock : function(){
		var newState = React.addons.update(this.state, {
			blocks : {
				$push : [[90]]
			}
		})
		this.setState(newState)
	},
	removeBlock : function(index){
		var newState = React.addons.update(this.state, {
			blocks : {
				$splice : [[index, 1]]
			}
		})
		this.setState(newState)

	},
	render: function() {
		var blocks = this.state.blocks.map((h, index)=><Block onRemove={this.removeBlock.bind(null, index)} height={h} index={index} key={index}/>)
		return <div>
			<div className="panel">
				<Button onClick={this.addBlock}><Glyphicon glyph="plus"/></Button>
			</div>
			<div>
				{blocks}
			</div>
		</div>
	}

});

module.exports = App;