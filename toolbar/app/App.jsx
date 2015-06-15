var React = require('react');
var cx = React.addons.classSet;

var { cloneElement } =  React;

var Drop = require('tether-drop');

var {OverlayTrigger, Tooltip} = require('react-bootstrap');

var onclickoutside = require('react-onclickoutside');

function viewport()
{
var e = window
, a = 'inner';
if ( !( 'innerWidth' in window ) )
{
a = 'client';
e = document.documentElement || document.body;
}
return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function clearSelection() {
  try {
    window.getSelection().removeAllRanges();
  } catch(e) {
    document.selection.empty(); // IE<9
  }
}

var ColsPopover = React.createClass({
	getInitialState: function() {
		return {
			cols : 2 
		};
	},
	click : function(n){
		this.setState({ cols : n })
	},
	render : function(){
		var btns = [2, 3, 4].map((n)=><button onClick={this.click.bind(null, n)} className={cx({ 'btn-default' : true, 'btn' : true, 'active' : this.state.cols == n })}>{n}</button>)
		return <div style={{ width : 200 }}>
			<div className="btn-toolbar">
				{btns}
			</div>
		</div>
	}
})

var ToolbarItem = React.createClass({
	render : function(){
		return null;
	}
})

var Toolbar = React.createClass({
	getInitialState: function() {
		return {
			opened : null,
			openUp : false
		};
	},
	renderBtns : function(){
		var btns = this.props.children.map((item, index)=>{
			var btn = cloneElement(item.props.button, { onClick : this.click.bind(null, index) });
			
			if (this.state.opened == index) return btn;

			return <OverlayTrigger placement='bottom' overlay={item.props.tooltip}>
    			{btn}
    		</OverlayTrigger>
		})
		return <div className="btn-toolbar">
			{btns}
		</div>
	},
	renderPopever : function(){
		var item = this.props.children.filter((item, index)=> {
			return index == this.state.opened;
		})

		if (item.length > 0) return item[0].props.children;

		return null;
	},
	click : function(item){
		var opened = this.state.opened == item ? null : item;
		this.props.onOpen();


		// var $popover = React.findDOMNode(this.refs.popover);
		// var $block = React.findDOMNode(this.refs.block);


		// var viewPort = viewport();

		// console.log(viewPort.height - $block.getBoundingClientRect().top)

		// console.log($block.getBoundingClientRect())
		// console.log(viewPort)

		// console.log('block', $block.getBoundingClientRect())

		// this.setState({
		// 	openUp : $popover.getBoundingClientRect().height > $block.getBoundingClientRect().height
		// })

		this.setState({
			opened : opened
		}, ()=>{
			var $popover = React.findDOMNode(this.refs.popover);
			var $block = React.findDOMNode(this.refs.block);
			var viewPort = viewport();


			this.setState({
				openUp : !(viewPort.height - $block.getBoundingClientRect().top > $popover.getBoundingClientRect().height)
			})
		})
	},
	componentDidMount: function() {
		
	},	
	// componentDidUpdate: function(prevProps, prevState) {
	// 	if (this.dropInstance && this.state.opened != prevState.opened){
	// 		this.dropInstance.toggle();
	// 		return;
	// 	}

	// 	var $btns = React.findDOMNode(this.refs.btns);
	// 	var $popover = React.findDOMNode(this.refs.popover);
	// 	this.dropInstance = new Drop({
	// 	  target: $btns,
	// 	  content: $popover,
	// 	  classes: 'drop-theme-arrows',
	// 	  position: 'bottom left',
	// 	  openOn: 'always'
	// 	})
	// },
	// componentWillUnmount: function() {
	// 	if (this.dropInstance)
	// 		this.dropInstance.destroy();		
	// },
	componentDidUpdate: function(prevProps, prevState) {
		var $popover = React.findDOMNode(this.refs.popover);
		var $block = React.findDOMNode(this.refs.block);

		// console.log('popover', $popover.getBoundingClientRect())
		// console.log('block', $block.getBoundingClientRect())

		// this.setState({
		// 	openUp : $popover.getBoundingClientRect().height > $block.getBoundingClientRect().height
		// })	
	},
	onMouseLeave : function(){
		//this.setState({ opened : null })
	},
	close : function(){
	//	alert('close')
		this.setState({ opened : null })
	},
	render : function(){
		var css = cx({
			'toobar__popover' : true,
			'toobar__popover--direction_up' : this.state.openUp
		})
		return <div onMouseLeave={this.onMouseLeave} className="toobar" ref="block">
			<div ref="btns" className="toobar__btns">{this.renderBtns()}</div>
			<div ref="popover" className={css}>{this.renderPopever()}</div>
		</div>
	}
})

var Block = React.createClass({
	mixins : [onclickoutside],
	getInitialState: function() {
		return {
			open : false 
		};
	},
	openToolbar : function(){
		this.setState({ open : !this.state.open })
	},
	handleClickOutside : function(){
		this.setState({ open : false })
		this.refs.toolbar.close();
	},

	render : function(){
		var css = cx({
			'block__toolbar' : true,
			'block__toolbar--first' : this.props.index == 0
		})

		return <div className={cx({ "block" : true, 'block--open' : this.state.open })} style={{ minHeight : this.props.height }}>
			<div className={css}>
				<Toolbar ref="toolbar" onOpen={this.openToolbar}>
					<ToolbarItem key={0} tooltip={<Tooltip>a</Tooltip>} button={<a className="btn btn-default btn-xs">a</a>}>
						<div style={{ width : 200, height : 300 }}>conten for a aaa</div>
					</ToolbarItem>
					<ToolbarItem key={1} tooltip={<Tooltip>b</Tooltip>} button={<a className="btn btn-default btn-xs">b</a>}>
						<ColsPopover/>
					</ToolbarItem>
				</Toolbar>
			</div>
			<div>blocks</div>
		</div>
	}
})

var App = React.createClass({
	getInitialState: function() {
		return {
			blocks : [70, 200, 80 ,20 ,30 ,50, 100, 90, 200, 80 ,20 ,30 ,50, 100, 90, 200, 80 ,20 ,30 ,50, 100, 90] 
		};
	},
	render: function() {
		var blocks = this.state.blocks.map((h, index)=><Block height={h} index={index}/>)
		return <div>
			{blocks}
		</div>
	}

});

module.exports = App;