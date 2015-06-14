import React from 'react';
import './index.styl'


export default class Hello extends React.Component {
  render() {
    return <div className="index-page">
    	<h1>Hello world 2</h1>
    	<div className="alert alert-danger" role="alert">
	      <strong>Oh snap!</strong> Change a few things up and try submitting again.
	    </div>
    </div>;
  }
}