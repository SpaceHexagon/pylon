console.log('Loading Pylon..');

import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

ReactDOM.render(
  (
    <div className='root'>
	  <img className='logo' title='☀️Pylon' src='images/pylon-concept-7.png'/>
	  <p className='logo'>This will get a nice 3d background soon...</p>
	</div>
  ),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});
