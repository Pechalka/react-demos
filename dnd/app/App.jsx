var React = require('react');


var { observe } = require('./Game');
var Board = require('./Board');

observe(function(knightPosition) {
    React.render(<Board knightPosition={knightPosition} />, document.body)
})



//module.exports = App;


