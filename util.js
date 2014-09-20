// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

window.onload = function(){
	TabList=document.querySelectorAll('A, BUTTON');
	for (var i=0 ; i<TabList.length ; i++){
		if(TabList[i].getAttribute('title')){
			TabList[i].addEventListener('focus',SetTooltip,true);
			TabList[i].addEventListener('blur',ResetTooltip,true);
		}
	}
}
function SetTooltip(){
	var spanTooltip=document.createElement('SPAN');
	var txtTooltip=document.createTextNode(this.getAttribute('title'));
	if(txtTooltip!=''){
		spanTooltip.appendChild(txtTooltip);
		spanTooltip.setAttribute('class','Ctooltip');
		this.appendChild(spanTooltip);
		this.removeAttribute('title');
		//positionnement
		var refHeight=this.offsetHeight;
		var newHeight=refHeight+5;
		var refWidth=this.offsetWidth;
		var newWidth=refWidth*25/100;
		var posRight=spanTooltip.offsetLeft+spanTooltip.offsetWidth;
		var resetPosRight=0;
		if(posRight>getWindowWidth())resetPosRight=posRight-getWindowWidth();
		spanTooltip.style.marginTop=newHeight+'px';
		spanTooltip.style.marginLeft='-'+newWidth-resetPosRight+'px';
	}
	else{
		this.removeAttribute('title');
	};
}
function ResetTooltip(){
	var spanTooltip=this.querySelector('.Ctooltip');
	var txtTooltip=spanTooltip.firstChild.nodeValue;
	this.setAttribute('title',txtTooltip);
	this.removeChild(spanTooltip);
}
function getWindowWidth() {
	var windowWidth=0;
	if (typeof(window.innerWidth)=='number') {
		windowWidth=window.innerWidth;
    } 
	else {
		if (document.documentElement&& document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
        } 
		else {
			if (document.body&&document.body.clientWidth) {
				windowWidth=document.body.clientWidth;
			}
        }
    }
 return windowWidth;
}
function getWindowHeight() {
	var windowHeight=0;
    if (typeof(window.innerHeight)=='number') {
        windowHeight=window.innerHeight;
    } 
	else {
        if (document.documentElement&& document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        } 
		else {
            if (document.body&&document.body.clientHeight) {
                windowHeight=document.body.clientHeight;
            }
        }
    }
    return windowHeight;
}
// @license-end
