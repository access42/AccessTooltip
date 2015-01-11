
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

	/* set objs query selector */
	var objs = 'a, button, input, textarea, select';
	/* set className for the tooltip */
	var tooltipClassName = 'Ctooltip';
	/* array of element with no child (switch for tooltip insert method) */
	var noChild = new Array('INPUT','SELECT','TEXTAREA','IMG');
	/*	
	*** Constructor ***
	-required objs : query selector
	-optionnal mouse : null to ignore, true to set (this will replace native title)
	-optionnal abbr : null to ignore, true to set (this will set the abbr element for keyboard focus with tabindex='0')
	-optionnal img : null to ignore, true to set (this will set the img element for keyboard focus with tabindex='0')
	*/
	var Tooltip = function( objs, mouse, abbr, img ){
		var tabList = document.querySelectorAll(objs);
		for ( var i = 0, len = tabList.length ; i < len ; i++ ){
			if( tabList[i].getAttribute( 'title' ) ) setEvent( tabList[i] );
		}
		// abbr option
		if( abbr ){
			var abbrList = document.getElementsByTagName ('abbr');
			for (var i = 0, len = abbrList.length; i < len; i++ ){
				if( abbrList[i].getAttribute( 'title' ) ){
					abbrList[i].setAttribute('tabindex','0');
					setEvent(abbrList[i]);
				}
			}
		}
		// img option
		if( img ){
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
			obj.addEventListener('focus',function(){
				setTooltip( this );
			},false);
			obj.addEventListener('blur', function(){
				resetTooltip( this );
			},false);
			//mouse option
			if( mouse ){
				obj.addEventListener('mouseover',function(){
					setTooltip( this );
				},false);
				obj.addEventListener('mouseout',function(){
					resetTooltip( this );
				},false);
			}
		}
	}
	/* *** AccessTooltip dependencies *** */
	function setTooltip( obj){
		var spanTooltip = document.createElement( 'SPAN' );
		var txt = obj.getAttribute( 'title' );
		var txtTooltip = document.createTextNode( txt );
		if( txt != '' ){
			console.log(noChild.indexOf( obj.tagName ) );
			spanTooltip.appendChild( txtTooltip );
			spanTooltip.setAttribute( 'class', tooltipClassName );
			if( noChild.indexOf( obj.tagName ) > -1 ){
				obj.parentNode.insertBefore( spanTooltip, obj.nextSibling );
				obj.setAttribute('aria-labelledby','accesstooltipID');
				spanTooltip.setAttribute('id','accesstooltipID');
			}
			else{
				obj.appendChild( spanTooltip );
			}
			obj.removeAttribute('title');
			//position
			var refHeight = obj.offsetHeight;
			var newHeight = refHeight + 5;
			var refWidth = obj.offsetWidth;
			var newWidth = refWidth * 25/100;
			var posRight = spanTooltip.offsetLeft + spanTooltip.offsetWidth;
			var resetPosRight = 0;
			if( posRight > getWindowWidth() ) resetPosRight = posRight - getWindowWidth();
				spanTooltip.style.marginTop = newHeight + 'px';
				spanTooltip.style.marginLeft = '-' + newWidth - resetPosRight + 'px';
		}
		else{
			obj.removeAttribute( 'title' );
		}
	}
	function resetTooltip( obj ){
		if( noChild.indexOf( obj.tagName ) > -1 ) {
			var spanTooltip = obj.nextSibling;
			var txtTooltip = spanTooltip.firstChild.nodeValue;
			obj.setAttribute( 'title', txtTooltip );
			obj.parentNode.removeChild( spanTooltip )
			obj.removeAttributeNode( obj.getAttributeNode('aria-labelledby') );
		}
		else{
			var spanTooltip = obj.querySelector('.' + tooltipClassName);
			var txtTooltip = spanTooltip.firstChild.nodeValue;
			obj.setAttribute( 'title', txtTooltip );
			obj.removeChild( spanTooltip );
		}
	}
	/* tooltip position */
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
	/* Onload Init */
	window.addEventListener('DOMContentLoaded', function() {
		var toolTip = new Tooltip( objs, true, true, true);
	}, false );
} )();

// @license-end
