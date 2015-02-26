
/**
AccessTooltip
A lightweight Javascript function to make the title attribute accessible for keyboard user

GPL licence
https://github.com/access42/AccessTooltip
Copyright (c) 2015 Access42, access42.net
**/

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

/*
	*** Parameters *** 
	- required objs : query selector for elements to set (tagName or any CSS selector)
	- required tooltipClassName : tooltip CSS design classname
	- required toolTipBetween : distance in pixels between the tooltip and the focused element
	- optionnal tooltipUp : false to set the tooltip above, true to set over the focused element
	- optionnal mouse : false to ignore, true to set mouse mode(replace native title by tooltip on mouseover)
	- optionnal tempDelay : displaying delay in millisecondes ( O to ignore)
	- optionnal useAriaDP : true to use the tooltip design pattern ARIA
	- optionnal useEscClose : true to allow tooltip closed by ESC Key (note : true by default when useAriaDP is set)

    *** implementation ***
Insert this code right before the closing </body> element of your HTML document. 
<script type="text/javascript" src="AccessTooltip.js"></script>
<script type="text/javascript">
	AccessTooltip({
		objs : 'a, button, input, textarea, select',
		tooltipClassName : 'access-tooltip',
		toolTipBetween : 5,
		toolTipUp : false,
		mouse : true,
		tempDelay : 4000,
		useAriaDP : false,
		useEscClose : true
	});
</script>

/* *** AccessTooltip *** */
function AccessTooltip(options){

	'use strict';
	
	/* set displaying delay */
	var timeoutID;
	/* IE11/windows8+ detection */
	var unsupported = Unsupported();
	/* set tooltip */
	var divTooltip = document.createElement( 'DIV' );
	document.body.appendChild( divTooltip );
	divTooltip.setAttribute( 'id','AccessibleTooltip' );
	divTooltip.setAttribute( 'class', options.tooltipClassName );
	if ( options.useAriaDP ) divTooltip.setAttribute( 'role', 'tooltip' );
	divTooltip.style.display = 'none';
	/* set elements targeted */
	var tabList = document.querySelectorAll(options.objs);
	for ( var i = 0, len = tabList.length ; i < len ; i++ ){
		if ( tabList[i].getAttribute( 'title' ) ) {
			tabList[i].setAttribute('tabindex','0');
			if( options.useAriaDP ) tabList[i].setAttribute('aria-describedby','AccessibleTooltip');
			//set Event listeners
			if( unsupported ){
				tabList[i].addEventListener( 'focus',function(){
					setTooltip( this );
				},false);
				tabList[i].addEventListener( 'blur', function(){
					setTooltip( this, true );
				},false);
			}
			//mouse option
			if( options.mouse ){
				tabList[i].addEventListener( 'mouseover',function(){
					setTooltip( this, false, true );
				},false);
				tabList[i].addEventListener('mouseout',function(){
					setTooltip( this, true, true );
				},false);
			}
		}
	}
	/* *** AccessTooltip dependencies *** */
	function setTooltip( obj, reset, mouse ){
		if( reset ){
			clearTooltip ( obj, mouse );
		}
		else if( obj.getAttribute( 'title' ) ){
			var txt = obj.getAttribute( 'title' );
			var txtTooltip = document.createTextNode( txt );
			//Set tooltip
			if( txt != '' ){
				if( mouse )obj.removeAttribute('title');
				//position
				var posRight = divTooltip.offsetLeft + divTooltip.offsetWidth;
				var resetPosRight = 0;
				var windowWidth=document.body.clientWidth;
				var windowHeight=document.body.clientHeight;
				if( posRight > windowWidth ) resetPosRight = posRight - windowWidth;
				var setPos = options.toolTipBetween + obj.offsetHeight;
				var toolTipTop = position( obj, 'y' ) + setPos;
				if( options.toolTipUp) toolTipTop = position( obj, 'y' ) - setPos - 5;
				divTooltip.style.top = toolTipTop + 'px';
				divTooltip.style.left = position( obj, 'x' ) + obj.offsetWidth * 25/100 - resetPosRight + 'px';
				divTooltip.style.display = 'block';
				if( divTooltip.firstChild ) divTooltip.removeChild( divTooltip.firstChild );
				divTooltip.appendChild( txtTooltip );
				if( options.tempDelay > 0){
					timeoutID = setTimeout( function(){
						if( divTooltip.firstChild ) {
							if( mouse ) obj.setAttribute('title', divTooltip.firstChild.nodeValue);
							divTooltip.removeChild( divTooltip.firstChild );
							divTooltip.style.display = 'none';
						}
					}, options.tempDelay);
				}
				if( options.useAriaDP || options.useEscClose ) {
					document.addEventListener( 'keydown', escClose, false );
				}
			}
			else{
				obj.removeAttribute( 'title' );
			}
		}
	}
	function escClose( event ){
		if( event.keyCode === 27 ){
			if( divTooltip.firstChild ) {
				divTooltip.removeChild( divTooltip.firstChild );
				divTooltip.style.display = 'none';
			}
			document.removeEventListener( 'keydown', escClose , false );
		}
	}
	function clearTooltip ( obj, mouse ){
		if( divTooltip.firstChild ) {
			if( mouse )obj.setAttribute('title', divTooltip.firstChild.nodeValue);
			divTooltip.removeChild( divTooltip.firstChild );
			divTooltip.style.display = 'none';
		}
		clearTimeout(timeoutID); 
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
	// IE11 on windows 8 is the only browser wich expose the title on keyboard focus
	// Below a little trash, but sufficient, IE11/windows 8 filtering method
	// filter is based on the new user agent string for IE11+
	function Unsupported(){
		var objUA = window.navigator.userAgent;
		//If IE 11
		if( objUA.indexOf('Trident') > 0 && objUA.indexOf('MSIE') < 0 ){
			//If windows 7 then title keyboard focus is unsupported
			if(objUA.indexOf('NT 6.1') > 0){
				return true;
			}
			//If windows 8+ title keyboard focus is supported
			else {
			 return false;
			}
		}
		//If not IE title keyboard focus is unsupported
		else {
		return true;
		}
	}
};

// @license-end
