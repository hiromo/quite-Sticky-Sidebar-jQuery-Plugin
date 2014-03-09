/*
 *	quite Sticky Sidebar jQuery Plugin. ver 1.07
 *
 *	Copyright 2013-2014 Hirotaka Matsuoka. (TeraDas.net) / https://github.com/hiromo
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/* quite Sticky Sidebar jQuery Plugin ***********************
 *
 * Simply "Sticky Sidebar" jQuery plugin. It's quite really sticky.
 * 
 * You can "Anchor" sidebars along the X or Y-Axis to prevent unwanted floating.
 * It might be helpful in case of your webpage have 2 or 3 or more columns, or a webpage reflows after $(document).ready().
 * 
 * @param target    The Target. Desired element ID to be sticky. (ex. '#quite_sticky_sidebar')
 * @param footer    Footer element ID beneath the Target. (ex. '#footer')
 * @param anchorX   (Optional) The Element ID to serve as anchor along the X-axis for the Target. 
 *                  This will prevent floating the Target horizontally even if a browser is resized or scrolled.
 *                  This is NOT mandatory param but we strongly recommend to use this in the most cases. (ex. '#outfit_quite_sticky_sidebar')
 * @param anchorY   (Optional) The Element ID to serve as anchor along the Y-axis for the Target.
 *                  Try this if the Target floats vertically. This will typically happen when your webpage is
 *                  rewrited and reflowed after $(document).ready() . (ex. '#outfit_quite_sticky_sidebar')
 * @param marginBottom	(Optional) Try this to positive if the Target penetrates through the Footer. (ex. 17)
 *
 */
jQuery.fn.quiteStickySidebar = function(target, footer, anchorX, anchorY, marginBottom) {
	
	var windowHeight;
	var targetHeight;
	var targetPosition;
	var anchorPositionX;
	var anchorPositionY;
	var footerHeight;
	var footerPosition;
	var scrollbarHeight;
	
	$(document).ready(function(){
		windowHeight = $(window).height() - marginBottom;
		targetHeight = target.outerHeight();
		targetPosition = target.position();
		footerPosition = footer.position();
		anchorPositionX = anchorX ? anchorX.position() : null ;
		anchorPositionY = anchorY ? anchorY.position() : null ;
		stickyElement();
	});
	
	$(window).resize(function(){
		windowHeight = $(window).height() - marginBottom;
		anchorPositionX = anchorX ? anchorX.position() : null ;
		anchorPositionY = anchorY ? anchorY.position() : null ;
		stickyElement();
	});
	
	$(window).scroll(function(){
		anchorPositionX = anchorX ? anchorX.position() : null ;
		anchorPositionY = anchorY ? anchorY.position() : null ;
		stickyElement();
	});
	
	function stickyElement(){
		footerPosition = footer.position();
		var scrollTop = $(this).scrollTop();
		var scrollLeft = $(this).scrollLeft();
		var visibleBottom = scrollTop + windowHeight;
		var targetTop = anchorY ? anchorPositionY.top : targetPosition.top ;
		var targetBottom = targetPosition.top + targetHeight;
		var targetLeftFixedCss = anchorPositionX ? {left: anchorPositionX.left- scrollLeft} : null;
		var footerTop = footerPosition.top;
		
		if (targetHeight > windowHeight) {
			// target heigher than window height.
			if (visibleBottom > targetBottom) {
				if(visibleBottom >= footerTop) {
					// clogged with footer top.
					target.css({position:"fixed", top: footerTop - scrollTop - targetHeight});
				} else {
					target.css({position:"fixed", top: windowHeight - targetHeight});
				}
				if ( anchorPositionX ) { target.css( targetLeftFixedCss ) };
			} else {
				target.css({position:"static", top:""});
				if ( anchorPositionX ) { target.css({left:""}) }
			}
			
		} else {
			// target smaller than window height.
			if (scrollTop > targetTop) {
				if(scrollTop + targetHeight >= footerTop) {
					// clogged with footer top.
					target.css({position:"fixed", top: footerTop - scrollTop - targetHeight});
				} else {
					target.css({position:"fixed", top: 0});
				}
				if ( anchorPositionX ) { target.css( targetLeftFixedCss ) };
			} else {
				target.css({position:"static", top:""});
				if ( anchorPositionX ) { target.css({left:""}) }
			}
		}
	}
	
};
