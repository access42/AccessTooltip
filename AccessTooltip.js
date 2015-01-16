
/**
AccessTooltip
GPL licence
https://github.com/access42/AccessTooltip
Copyright (c) 2015 Access42, access42.net
**/

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

/* *** AccessTooltip *** */
var AccessTooltip = ( function(){

	'use strict';
	
	/* 
	*** Parameters *** 
	- required objs : query selector for elements to set (tagName or any CSS selector)
	- required tooltipClassName : tooltip CSS design classname
	- required toolTipBetween : distance in pixels between the tooltip and the focused element
	- optionnal tooltipUp : false to set the tooltip above, true to set over the focused element
	- optionnal mouse : false to ignore, true to set (replace native title by tooltip on mouseover)
	- optionnal abbr : false to ignore, true to set (this will set the abbr element for keyboard focus with tabindex='0')
	- optionnal img : false to ignore, true to set (this will set the img element for keyboard focus with tabindex='0')
	- optionnal temp : false to ignore, true to set a displaying delay
	- optionnal tempDelay : the displaying delay in millisecondes
	*/
	var options = {
		objs : 'a, button, input, textarea, select',
		tooltipClassName : 'Ctooltip',
		toolTipBetween : 5,
		toolTipUp : false,
		mouse : true,
		abbr : true,
		img : true,
		temp : true,
		tempDelay : 4000
	}
	/* *** End ¨Parameters *** */
	/* Onload Init */
	window.addEventListener('DOMContentLoaded', function() {
		/* tooltip instance */
		var tooltip = new Tooltip(options);
	}, false );
	/* *** Constructor *** */
	var Tooltip = function( options ){
		/* set tooltip */
		var divTooltip = document.createElement('DIV');
		document.body.appendChild( divTooltip);
		divTooltip.setAttribute('id','AccessibleTooltip');
		divTooltip.setAttribute( 'class', options.tooltipClassName );
		divTooltip.style.display = 'none';
		var tabList = document.querySelectorAll(options.objs);
		for ( var i = 0, len = tabList.length ; i < len ; i++ ){
			if( tabList[i].getAttribute( 'title' ) ) setEvent( tabList[i] );
		}
		// abbr option
		if( options.abbr ){
			var abbrList = document.getElementsByTagName ('abbr');
			for (var i = 0, len = abbrList.length; i < len; i++ ){
				if( abbrList[i].getAttribute( 'title' ) ){
					abbrList[i].setAttribute('tabindex','0');
					setEvent(abbrList[i]);
				}
			}
		}
		// img option
		if( options.img ){
			var imgList = document.getElementsByTagName ('img');
			for (var i = 0, len = imgList.length; i < len; i++ ){
				if( imgList[i].getAttribute( 'title' ) ){
					imgList[i].setAttribute('tabindex','0');
					setEvent(imgList[i]);
				}
			}
		}		
		//setEvent listeners
		function setEvent( obj ){
			if( unsupported() ){
				obj.addEventListener('focus',function(event){
					setTooltip( this );
				},true);
				obj.addEventListener('blur', function(){
					resetTooltip( this );
				},false);
			}
			//mouse option
			if( options.mouse ){
				obj.addEventListener( 'mouseover',function(){
					setTooltip( this, options.mouse );
				},false);
				obj.addEventListener('mouseout',function(){
					resetTooltip( this, options.mouse );
				},false);
			}
		}
	}
	/* *** AccessTooltip dependencies *** */
	function setTooltip( obj, mouse ){
		if( obj.getAttribute( 'title' ) ){
			//get tooltip
			var divTooltip = document.getElementById('AccessibleTooltip');
			var txt = obj.getAttribute( 'title' );
			var txtTooltip = document.createTextNode( txt );
			//Set tooltip
			if( txt != '' ){
				if( mouse )obj.removeAttribute('title');
				//position
				var posRight = divTooltip.offsetLeft + divTooltip.offsetWidth;
				var resetPosRight = 0;
				if( posRight > getWindowWidth() ) resetPosRight = posRight - getWindowWidth();
				var setPos = options.toolTipBetween + obj.offsetHeight;
				var toolTipTop = position( obj, 'y' ) + setPos;
				if( options.toolTipUp) toolTipTop = position( obj, 'y' ) - setPos - 5;
				divTooltip.style.top = toolTipTop + 'px';
				divTooltip.style.left = position( obj, 'x' ) + obj.offsetWidth * 25/100 - resetPosRight + 'px';
				divTooltip.style.display = 'block';
				divTooltip.appendChild( txtTooltip );
				if( options.temp){
					setTimeout( function(){
						document.getElementById('AccessibleTooltip').style.display='none';
					}, options.tempDelay);
				}
			}
			else{
				obj.removeAttribute( 'title' );
			}
		}
	}
	function resetTooltip( obj, mouse ){
		var target = document.getElementById('AccessibleTooltip');
		if( target.firstChild ) {
			if( mouse )obj.setAttribute('title', target.firstChild.nodeValue);
			document.getElementById('AccessibleTooltip').removeChild( target.firstChild );
			target.style.display = 'none';
		}
	}
	/* window dimension */
	function getWindowWidth() {
		var windowWidth = 0;
		if ( typeof( window.innerWidth ) == 'number' ) {
			windowWidth = window.innerWidth;
		} 
		else {
			if ( document.documentElement && document.documentElement.clientWidth ) {
				windowWidth = document.documentElement.clientWidth;
			} 
			else {
				if ( document.body && document.body.clientWidth ) {
					windowWidth=document.body.clientWidth;
				}
			}
		}
	 return windowWidth;
	}
	function getWindowHeight() {
		var windowHeight=0;
		if ( typeof( window.innerHeight ) == 'number' ) {
			windowHeight = window.innerHeight;
		} 
		else {
			if ( document.documentElement && document.documentElement.clientHeight ) {
				windowHeight = document.documentElement.clientHeight;
			} 
			else {
				if ( document.body && document.body.clientHeight ) {
					windowHeight=document.body.clientHeight;
				}
			}
		}
		return windowHeight;
	}
	// obj position
	function position( obj, coordinate){
		var pos, parent = obj.offsetParent;
		(coordinate === 'x') ? pos = obj.offsetLeft : pos = obj.offsetTop;
		while( parent != null){
			(coordinate === 'x') ? pos += parent.offsetLeft : pos += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return pos;
	}
	// IE11 is the only browser wich expose the title on keyboard focus
	// Below a little trash IE11 filtering method
	// filter is based on the new user agent string for IE11+
	function unsupported(){
		var objUA = window.navigator.userAgent;
		if( objUA.indexOf('Trident') > 0 && objUA.indexOf('MSIE') < 0 ){
			return false;
		}
		else {
		return true;
		}
	}
} )();

// @license-end
