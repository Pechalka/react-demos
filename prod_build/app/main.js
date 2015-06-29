import './main.styl';
import './test.css';

var React = require('react');

var App = require('./App.jsx')


main();

function main(){
	React.render(<App/>, document.body)
}