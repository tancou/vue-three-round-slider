/*!
* vue-round-slider v1.2.8
*
* @website https://github.com/Artem9989/vue-three-round-slider#readme
* @copyright (c) 2023 Artem9989
* @license MIT
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'vue'], factory) :
	(global = global || self, factory(global.RoundSlider = {}, global.$, global.vue));
}(this, (function (exports, jquery, vue) { 'use strict';

	jquery = jquery && Object.prototype.hasOwnProperty.call(jquery, 'default') ? jquery['default'] : jquery;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var roundslider_min = createCommonjsModule(function (module, exports) {
	/*! roundSlider v1.6.1 | (c) 2015-2020, Soundar | MIT license | http://roundsliderui.com/licence.html */
	!function(t){t(jquery);}(function(p){var o="roundSlider";function r(t,e){this.id=t.id,this.control=p(t),this.options=p.extend({},this.defaults,e);}p.fn[o]=function(t){return function(t,e){for(var i=0;i<this.length;i++){var s=this[i],a=p.data(s,o);if(a){if(p.isPlainObject(t)){ "function"==typeof a.option?a.option(t):s.id&&window[s.id]&&"function"==typeof window[s.id].option&&window[s.id].option(t); }else if("string"==typeof t&&"function"==typeof a[t]){if(("option"===t||0===t.indexOf("get"))&&void 0===e[2]){ return a[t](e[1]); }a[t](e[1],e[2]);}}else {var n=new r(s,t);n._saveInstanceOnElement(),n._saveInstanceOnID(),!1!==n._raise("beforeCreate")?(n._init(),n._raise("create")):n._removeData();}}return this}.call(this,t,arguments)},r.prototype={pluginName:o,version:"1.6.1",options:{},control:null,defaults:{min:0,max:100,step:1,value:null,radius:85,width:18,handleSize:"+0",startAngle:0,endAngle:"+360",animation:!0,showTooltip:!0,editableTooltip:!0,readOnly:!1,disabled:!1,keyboardAction:!0,mouseScrollAction:!1,lineCap:"butt",sliderType:"default",circleShape:"full",handleShape:"round",startValue:null,svgMode:!1,borderWidth:1,borderColor:null,pathColor:null,rangeColor:null,tooltipColor:null,beforeCreate:null,create:null,start:null,beforeValueChange:null,drag:null,change:null,update:null,valueChange:null,stop:null,tooltipFormat:null},keys:{UP:38,DOWN:40,LEFT:37,RIGHT:39},_props:function(){return {numberType:["min","max","step","radius","width","borderWidth","startAngle","startValue"],booleanType:["animation","showTooltip","editableTooltip","readOnly","disabled","keyboardAction","mouseScrollAction","svgMode"],stringType:["sliderType","circleShape","handleShape","lineCap"]}},_init:function(){var t,e=this.options;e.svgMode&&(t=function(){},this._appendSeperator=t,this._refreshSeperator=t,this._updateSeperator=t,this._appendOverlay=t,this._checkOverlay=t,this._updateWidth=t),this.control.is("input")&&(this._isInputType=!0,this._hiddenField=this.control,this.control=this.$createElement("div"),this.control.insertAfter(this._hiddenField),e.value=this._hiddenField.val()||e.value),this._isBrowserSupported()&&this._onInit();},_onInit:function(){this._initialize(),this._update(),this._render();},_initialize:function(){var t=this.browserName=this.getBrowserName();t&&this.control.addClass("rs-"+t),this._isReadOnly=!1,this._checkDataType(),this._refreshCircleShape();},_render:function(){this.container=this.$createElement("div.rs-container"),this.innerContainer=this.$createElement("div.rs-inner-container"),this.container.append(this.innerContainer);var t="rs-control "+(this.options.svgMode?"rs-svg-mode":"rs-classic-mode");this.control.addClass(t).empty().append(this.container),this._createLayers(),this._createOtherLayers(),this._setContainerClass(),this._setRadius(),this._setProperties(),this._setValue(),this._updateTooltipPos(),this._bindControlEvents("_bind"),this._raiseValueChange("create"),this._updatePre();},_update:function(){this._validateSliderType(),this._updateStartEnd(),this._validateStartEnd(),this._handle1=this._handle2=this._handleDefaults(),this._analyzeModelValue(),this._validateModelValue();},_createLayers:function(){var t=this.options;if(t.svgMode){ return this._createSVGElements(),this._setSVGAttributes(),this._setSVGStyles(),void this._moveSliderRange(!0); }this.block=this.$createElement("div.rs-block rs-outer rs-border"),this.innerContainer.append(this.block);var e=t.width,i=this._start,s=this.$createElement("div.rs-path rs-transition");this._showRange?(this.block1=s.clone().addClass("rs-range-color").rsRotate(i),this.block2=s.clone().addClass("rs-range-color").css("opacity","0").rsRotate(i),this.block3=s.clone().addClass("rs-path-color").rsRotate(i),this.block4=s.addClass("rs-path-color").css({opacity:"1","z-index":"1"}).rsRotate(i-180),this.block.append(this.block1,this.block2,this.block3,this.block4).addClass("rs-split")):this.block.append(s.addClass("rs-path-color")),this.lastBlock=this.$createElement("span.rs-block").css({padding:e}),this.innerBlock=this.$createElement("div.rs-inner rs-bg-color rs-border"),this.lastBlock.append(this.innerBlock),this.block.append(this.lastBlock);},_createOtherLayers:function(){this._appendHandle(),this._appendSeperator(),this._appendOverlay(),this._appendHiddenField();},_setProperties:function(){var t=this.options;this._setHandleShape(),this._addAnimation(),this._appendTooltip(),t.showTooltip||this._removeTooltip(),t.disabled?this.disable():t.readOnly&&this._readOnly(!0),t.mouseScrollAction&&this._bindScrollEvents("_bind");},_updatePre:function(){this._prechange=this._predrag=this._pre_bvc=this._preValue=this.options.value;},_backupPreValue:function(){this._pre_handle1=this._handle1,this._pre_handle2=this._handle2;},_revertPreValue:function(){this._handle1=this._pre_handle1,this._handle2=this._pre_handle2,this._updateModelValue();},_setValue:function(){var t;this._rangeSlider?(this._setHandleValue(1),this._setHandleValue(2)):(this._minRange&&!this.options.svgMode&&this._setHandleValue(1),t=this._minRange?2:this._active||1,this._setHandleValue(t));},_appendTooltip:function(){var t;0===this.container.children(".rs-tooltip").length&&(t=this.tooltip=this.$createElement("span.rs-tooltip rs-tooltip-text"),this.container.append(t),this._setTooltipColor(t),this._tooltipEditable(),this._updateTooltip());},_removeTooltip:function(){0!=this.container.children(".rs-tooltip").length&&this.tooltip&&this.tooltip.remove();},_setTooltipColor:function(t){var e=this.options,i=e.tooltipColor,s="inherit"!==i?i:e.rangeColor;t&&null!=s&&t.css("color",s);},_tooltipEditable:function(){var t=this.options,e=this.tooltip;e&&t.showTooltip&&this[t.editableTooltip?(e.addClass("rs-edit"),"_bind"):(e.removeClass("rs-edit"),"_unbind")](e,"click",this._editTooltip);},_editTooltip:function(t){var e,i,s=this.tooltip;s.hasClass("rs-edit")&&!this._isReadOnly&&(e=2*parseFloat(s.css("border-left-width")),i=this.input=this.$createElement("input.rs-input rs-tooltip-text").css({height:s.outerHeight()-e,width:s.outerWidth()-e}),this._setTooltipColor(i),s.html(i).removeClass("rs-edit").addClass("rs-hover"),i.focus().val(this._getTooltipValue(!0)),this._bind(i,"blur change",this._focusOut));},_focusOut:function(t){var e;"change"==t.type?(","==(e=this.input.val().replace("-",","))[0]&&(e="-"+e.slice(1).replace("-",",")),this.options.value=e,this._validateValue(!0)&&(this.input.val(this._getTooltipValue(!0)),this._raiseEvent("change"))):(delete this.input,this.tooltip.addClass("rs-edit").removeClass("rs-hover"),this._updateTooltip());},_setHandleShape:function(){var t=this.options,e=t.handleShape,i=this._handles();i.removeClass("rs-handle-dot rs-handle-square"),"dot"==e?i.addClass("rs-handle-dot"):"square"==e?i.addClass("rs-handle-square"):t.handleShape="round";},_setHandleValue:function(t){this._active=t;var e=this["_handle"+t];this._minRange||(this.bar=this._activeHandleBar()),this._changeSliderValue(e.value,e.angle);},_addAnimation:function(){this.options.animation&&this.control.addClass("rs-animation");},_removeAnimation:function(){this.control.removeClass("rs-animation");},_setContainerClass:function(){var t=this.options.circleShape;"full"==t||"pie"==t||0===t.indexOf("custom")?this.container.addClass("rs-full rs-"+t):this.container.addClass("rs-"+t.split("-").join(" rs-"));},_setRadius:function(){var t,e,i,s=this.options,a=s.radius,n=2*a,r=s.circleShape,o=0,h=t=n,l=e=n,d="full"==r||"pie"==r||0===r.indexOf("custom");if(s.svgMode&&!d&&(i=this._handleBars(),"none"!=s.lineCap?(o="butt"===s.lineCap?s.borderWidth/2:s.width/2+s.borderWidth,-1!=r.indexOf("bottom")&&i.css("margin-top",o+"px"),-1!=r.indexOf("right")&&i.css("margin-right",-o+"px")):p.each(i,function(t,e){e.style.removeProperty("margin-top"),e.style.removeProperty("margin-right");})),0===r.indexOf("half")){ switch(r){case"half-top":case"half-bottom":t=(h=a)+o;break;case"half-left":case"half-right":e=(l=a)+o;} }else { 0===r.indexOf("quarter")&&(t=e=(h=l=a)+o); }this.container.css({height:h,width:l}),this.control.css({height:t,width:e}),0!==o?this.innerContainer.css({height:t,width:e}):this.innerContainer.removeAttr("style"),s.svgMode&&this.svgContainer.height(n).width(n).children("svg").height(n).width(n);},_border:function(t){var e=this.options;return e.svgMode?2*e.borderWidth:t?parseFloat(this._startLine.children().css("border-bottom-width")):2*parseFloat(this.block.css("border-top-width"))},_appendHandle:function(){!this._rangeSlider&&this._minRange||this._createHandle(1),this._showRange&&this._createHandle(2);},_appendSeperator:function(){this._startLine=this._addSeperator(this._start,"rs-start"),this._endLine=this._addSeperator(this._start+this._end,"rs-end"),this._refreshSeperator();},_addSeperator:function(t,e){var i=this.$createElement("span.rs-seperator rs-border"),s=this.$createElement("span.rs-bar rs-transition "+e).append(i).rsRotate(t);return this.container.append(s),s},_refreshSeperator:function(){var t=this._startLine.add(this._endLine),e=t.children().removeAttr("style"),i=this.options,s=i.width+this._border();"round"==i.lineCap&&"full"!=i.circleShape?(t.addClass("rs-rounded"),e.css({width:s,height:s/2+1}),this._startLine.children().css("margin-top",-1).addClass(this._minRange?"rs-range-color":"rs-path-color"),this._endLine.children().css("margin-top",s/-2).addClass("rs-path-color")):(t.removeClass("rs-rounded"),e.css({width:s,"margin-top":this._border(!0)/-2}).removeClass("rs-range-color rs-path-color"));},_updateSeperator:function(){this._startLine.rsRotate(this._start),this._endLine.rsRotate(this._start+this._end);},_createHandle:function(t){var e,i=this.$createElement("div.rs-handle rs-move");"round"!=(e=this.options.handleShape)&&i.addClass("rs-handle-"+e),i.attr({index:t,tabIndex:"0"});var s=this._dataElement()[0].id,a=(s=s?s+"_":"")+"handle";this._rangeSlider&&(a+="_"+(1==t?"start":"end")),i.attr({role:"slider","aria-label":a});var n=this._handleDefaults(),r=this.$createElement("div.rs-bar rs-transition").css("z-index","7").append(i);return r.addClass(this._rangeSlider&&2==t?"rs-second":"rs-first"),r.rsRotate(n.angle),this.container.append(r),this._refreshHandle(),this.bar=r,1!=(this._active=t)&&2!=t&&(this["_handle"+t]=n),this._bind(i,"focus blur",this._handleFocus),i},_refreshHandle:function(){var t,e,i,s=this.options,a=s.handleSize,n=s.width,r=!0,o=this.isNumber;"string"==typeof a&&o(a)&&("+"===a.charAt(0)||"-"===a.charAt(0)?a=n+parseFloat(a):!a.indexOf(",")||o((i=a.split(","))[0])&&o(i[1])&&(e=parseFloat(i[0]),t=parseFloat(i[1]),r=!1)),r&&(t=e=o(a)?parseFloat(a):n);var h=(n+this._border()-e)/2;this._handles().css({height:t,width:e,margin:-t/2+"px 0 0 "+h+"px"});},_defaultValue:function(){var t=this.options,e=t.startValue;return this.isNumber(e)?this._limitValue(e):t.min},_handleDefaults:function(){var t=this._defaultValue();return {angle:this._valueToAngle(t),value:t}},_handleBars:function(){return this.container.children("div.rs-bar")},_handles:function(){return this._handleBars().find(".rs-handle")},_activeHandleBar:function(t){return this._minRange?this.bar:(t=null!=t?t:this._active,p(this._handleBars()[t-1]))},_handleArgs:function(t){var e=this["_handle"+(t=null!=t?t:this._active)]||{};return {element:this._activeHandleBar(t).children(),index:t,isActive:t==this._active,value:e.value,angle:e.angle}},_dataElement:function(){return this._isInputType?this._hiddenField:this.control},_raiseEvent:function(t){var e,i=this["_pre"+t],s=this.options.value;i!==s&&(this["_pre"+t]=s,"change"==t&&(this._predrag=s,this._updateHidden()),this._updateTooltip(),e=this._handleArgs(),this._raise(t,{value:s,preValue:i,handle:e}),s!=this._preValue&&(this._raise("update",{value:s,preValue:i,handle:e,action:t}),this._raiseValueChange(t)));},_raiseBeforeValueChange:function(t,e){void 0!==e?this._rangeSlider&&(e=this._formRangeValue(e)):e=this.options.value;var i="code"!==t;if(e===this._pre_bvc){ return !i; }var s={value:e,preValue:this._pre_bvc,action:t,isUserAction:i,cancelable:!0},a=0!=this._raise("beforeValueChange",s);return a&&(this._pre_bvc=e),a},_raiseValueChange:function(t){var e=this.options.value,i=[];this._minRange||i.push(this._handleArgs(1)),this._showRange&&i.push(this._handleArgs(2));var s={value:e,preValue:this._preValue,action:t,isUserAction:"code"!==t&&"create"!==t,isInvertedRange:this._isInvertedRange,handles:i};this._raise("valueChange",s),this._preValue=e;},_elementDown:function(t){var e,i,s,a,n,r,o,h,l;this._isReadOnly||(p(t.target).hasClass("rs-handle")?this._handleDown(t):(e=this._getXY(t),i=this._getCenterPoint(),s=this._getDistance(e,i),(a=(this.block||this.svgContainer).outerWidth()/2)-(this.options.width+this._border())<=s&&s<=a&&(0!==(n=this.control.find(".rs-handle.rs-focus")).length&&t.preventDefault(),h=(r=this._getAngleValue(e,i)).angle,l=r.value,this._rangeSlider&&(1==n.length?(o=parseFloat(n.attr("index")),this._invertRange||(1==o&&h>this._handle2.angle?o=2:2==o&&h<this._handle1.angle&&(o=1)),this._active=o):this._active=this._handle2.angle-h<h-this._handle1.angle?2:1,this.bar=this._activeHandleBar()),this._raiseBeforeValueChange("change",l)&&(this._changeSliderValue(l,h),this._raiseEvent("change")))));},_handleDown:function(t){t.preventDefault();var e=p(t.target);e.focus(),this._removeAnimation(),this._bindMouseEvents("_bind"),this.bar=e.parent(),this._active=parseFloat(e.attr("index")),this._handles().removeClass("rs-move"),this._raise("start",{value:this.options.value,handle:this._handleArgs()});},_handleMove:function(t){t.preventDefault();var e=this._getXY(t),i=this._getCenterPoint(),s=this._getAngleValue(e,i,!0),a=s.angle,n=s.value;this._raiseBeforeValueChange("drag",n)&&(this._changeSliderValue(n,a),this._raiseEvent("drag"));},_handleUp:function(t){this._handles().addClass("rs-move"),this._bindMouseEvents("_unbind"),this._addAnimation(),this._raiseEvent("change"),this._raise("stop",{value:this.options.value,handle:this._handleArgs()});},_handleFocus:function(t){var e,i;this._isReadOnly||(this._handles().removeClass("rs-focus"),(e=this.options.keyboardAction)&&this._bindKeyboardEvents("_unbind"),"blur"!==t.type&&((i=p(t.target)).addClass("rs-focus"),this.bar=i.parent(),this._active=parseFloat(i.attr("index")),e&&this._bindKeyboardEvents("_bind"),this.control.find("div.rs-bar").css("z-index","7"),this.bar.css("z-index","8")));},_handleKeyDown:function(t){var e,i,s,a=t.keyCode,n=this.keys;27==a&&this._handles().blur(),35<=a&&a<=40&&(37<=a&&a<=40&&this._removeAnimation(),e=this["_handle"+this._active],t.preventDefault(),a==n.UP||a==n.RIGHT?i=this._round(this._limitValue(e.value+this.options.step)):a==n.DOWN||a==n.LEFT?i=this._round(this._limitValue(e.value-this._getMinusStep(e.value))):36==a?i=this._getKeyValue("Home"):35==a&&(i=this._getKeyValue("End")),s=this._valueToAngle(i),this._raiseBeforeValueChange("drag",i)&&(this._changeSliderValue(i,s),this._raiseEvent("drag")));},_handleKeyUp:function(t){this._addAnimation(),this._raiseEvent("change");},_getMinusStep:function(t){var e=this.options,i=e.min,s=e.max,a=e.step;if(t!=s){ return a; }var n=(s-i)%a;return 0==n?a:n},_getKeyValue:function(t){var e=this.options,i=e.min,s=e.max;return this._rangeSlider?"Home"==t?1==this._active?i:this._handle1.value:1==this._active?this._handle2.value:s:"Home"==t?i:s},_elementScroll:function(t){var e,i,s,a,n;this._isReadOnly||(t.preventDefault(),0!=(n=(e=t.originalEvent||t).wheelDelta?e.wheelDelta/60:e.detail?-e.detail/2:0)&&(this._updateActiveHandle(t),s=(i=this["_handle"+this._active]).value+(0<n?this.options.step:-this._getMinusStep(i.value)),s=this._limitValue(s),a=this._valueToAngle(s),this._raiseBeforeValueChange("change",s)&&(this._removeAnimation(),this._changeSliderValue(s,a),this._raiseEvent("change"),this._addAnimation())));},_updateActiveHandle:function(t){var e=p(t.target);e.hasClass("rs-handle")&&e.parent().parent()[0]==this.control[0]&&(this.bar=e.parent(),this._active=parseFloat(e.attr("index"))),this.bar.find(".rs-handle").hasClass("rs-focus")||this.bar.find(".rs-handle").focus();},_bindControlEvents:function(t){this[t](this.control,"mousedown touchstart",this._elementDown);},_bindScrollEvents:function(t){this[t](this.control,"mousewheel DOMMouseScroll",this._elementScroll);},_bindMouseEvents:function(t){var e=p(document);this[t](e,"mousemove touchmove",this._handleMove),this[t](e,"mouseup mouseleave touchend touchcancel",this._handleUp);},_bindKeyboardEvents:function(t){var e=p(document);this[t](e,"keydown",this._handleKeyDown),this[t](e,"keyup",this._handleKeyUp);},_changeSliderValue:function(t,e){var i=this._oriAngle(e),s=this._limitAngle(e),a=this._active,n=this.options;if(this._showRange){var r=1==a&&i<=this._oriAngle(this._handle2.angle)||2==a&&i>=this._oriAngle(this._handle1.angle),o=this._invertRange;if(this._minRange||r||o){if(this["_handle"+a]={angle:e,value:t},n.value=this._rangeSlider?this._handle1.value+","+this._handle2.value:t,this.bar.rsRotate(s),this._updateARIA(t),n.svgMode){ return void this._moveSliderRange(); }var h=this._oriAngle(this._handle2.angle)-this._oriAngle(this._handle1.angle),l="1",d="0";h<=180&&!(h<0&&-180<h)&&(l="0",d="1"),this.block2.css("opacity",l),this.block3.css("opacity",d),(1==a?this.block4:this.block2).rsRotate(s-180),(1==a?this.block1:this.block3).rsRotate(s);}}else { this["_handle"+a]={angle:e,value:t},n.value=t,this.bar.rsRotate(s),this._updateARIA(t); }},_createSVGElements:function(){var t=this.$createSVG("svg"),e="path.rs-transition ",i={fill:"transparent"};this.$path=this.$createSVG(e+"rs-path",i),this.$range=this._showRange?this.$createSVG(e+"rs-range",i):null,this.$border=this.$createSVG(e+"rs-border",i),this.$append(t,[this.$path,this.$range,this.$border]),this.svgContainer=this.$createElement("div.rs-svg-container").append(t).appendTo(this.innerContainer);},_setSVGAttributes:function(){var t=this.options,e=t.radius,i=t.borderWidth,s=t.width,a=t.lineCap,n=e-i/2,r=n-s-i,o=this._start,h=this._end,l=o+h,d=this.$drawPath(e,n,o,l,r,a);this.$setAttribute(this.$border,{d:d}),p(this.$border).css("stroke-width",i);var u=e-i-s/2;this.svgPathLength=this.$getArcLength(u,h);var _={d:this.$drawPath(e,u,o,l),"stroke-width":s,"stroke-linecap":a};this.$setAttribute(this.$path,_),this._showRange&&(this.$setAttribute(this.$range,_),"round"==a||"square"==a?this.$range.setAttribute("stroke-dashoffset","0.01"):this.$range.removeAttribute("stroke-dashoffset"));},_setSVGStyles:function(){var t=this.options,e=t.borderColor,i=t.pathColor,s=t.rangeColor;e&&("inherit"==e&&(e=s),p(this.$border).css("stroke",e)),i&&(this.svgContainer["inherit"==i?"addClass":"removeClass"]("rs-path-inherited"),"inherit"==i&&(i=s),p(this.$path).css("stroke",i)),this._showRange&&s&&p(this.$range).css("stroke",s);},_moveSliderRange:function(t){var e,i,s,a,n,r,o,h,l;this._showRange&&(e=this._start,i=this._end,r=this._handle1.angle,o=this._handle2.angle,t&&(r=o=this._handleDefaults().angle),s=[],a=(r-=e)<=(o-=e),this._isInvertedRange=!a,a?s.push(0):(this._minRange&&s.push(0),n=r,r=o,o=n),h=r/i*this.svgPathLength,s.push(h),l=(o-r)/i*this.svgPathLength,s.push(l,this.svgPathLength),this.$range.style.strokeDasharray=s.join(" "));},_isPropsRelatedToSVG:function(t){return this._hasProperty(t,["radius","borderWidth","width","lineCap","startAngle","endAngle"])},_isPropsRelatedToSVGStyles:function(t){return this._hasProperty(t,["borderColor","pathColor","rangeColor"])},_hasProperty:function(t,e){return "string"==typeof t?-1!==e.indexOf(t):Object.keys(t).some(function(t){return -1!==e.indexOf(t)})},_updateARIA:function(t){var e,i=this.options,s=i.min,a=i.max;this.bar.children().attr({"aria-valuenow":t}),this._rangeSlider?((e=this._handles()).eq(0).attr({"aria-valuemin":s}),e.eq(1).attr({"aria-valuemax":a}),1==this._active?e.eq(1).attr({"aria-valuemin":t}):e.eq(0).attr({"aria-valuemax":t})):this.bar.children().attr({"aria-valuemin":s,"aria-valuemax":a});},_getDistance:function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},_getXY:function(t){return -1==t.type.indexOf("mouse")&&(t=(t.originalEvent||t).changedTouches[0]),{x:t.pageX,y:t.pageY}},_getCenterPoint:function(){var t=this.block||this.svgContainer,e=t.offset();return {x:e.left+t.outerWidth()/2,y:e.top+t.outerHeight()/2}},_getAngleValue:function(t,e,i){var s=-Math.atan2(t.y-e.y,e.x-t.x)/(Math.PI/180);return s<this._start&&(s+=360),s=this._checkAngle(s,i),this._processStepByAngle(s)},_checkAngle:function(t,e){var i=this._oriAngle(t),s=this["_handle"+this._active].angle,a=this._oriAngle(s);if(i>this._end){if(!e){ return s; }t=this._start+(a<=this._end-a?0:this._end);}else if(e){var n=this._handleDragDistance;if(this.isNumber(n)&&Math.abs(i-a)>n){ return s }}return t},_processStepByAngle:function(t){var e=this._angleToValue(t);return this._processStepByValue(e)},_processStepByValue:function(t){var e=this.options,i=e.min,s=e.max,a=e.step,n=s<i,r=t-(t-i)%(a=n?-a:a),o=this._limitValue(r+a),h=this._limitValue(r-a),l=n?t<=r?r-t<t-o?r:o:h-t<t-r?r:h:r<=t?t-r<o-t?r:o:t-h<r-t?r:h;return {value:l=this._round(l),angle:this._valueToAngle(l)}},_round:function(t){var e=this.options.step.toString().split(".");return e[1]?parseFloat(t.toFixed(e[1].length)):Math.round(t)},_oriAngle:function(t){var e=t-this._start;return e<0&&(e+=360),e},_limitAngle:function(t){return t>360+this._start&&(t-=360),t<this._start&&(t+=360),t},_limitValue:function(t){var e=this.options,i=e.min,s=e.max,a=s<i;return (!a&&t<i||a&&i<t)&&(t=i),(!a&&s<t||a&&t<s)&&(t=s),t},_angleToValue:function(t){var e=this.options,i=e.min,s=e.max;return this._oriAngle(t)/this._end*(s-i)+i},_valueToAngle:function(t){var e=this.options,i=e.min;return (t-i)/(e.max-i)*this._end+this._start},_appendHiddenField:function(){var t=this._hiddenField=this._hiddenField||this.$createElement("input");t.attr({type:"hidden",name:this._dataElement()[0].id||""}),this.control.append(t),this._updateHidden();},_updateHidden:function(){var t=this.options.value;this._hiddenField.val(t);},_updateTooltip:function(){var t=this.options,e=this.tooltip;e&&(e.hasClass("rs-hover")||e.html(this._getTooltipValue()),this._updateTooltipPos()),!t.showTooltip&&t.mouseScrollAction&&this.control.height();},_updateTooltipPos:function(){var t,e,i,s=this.options,a=s.circleShape,n={};s.showTooltip&&0!==a.indexOf("quarter")&&((t=this.tooltip).is(":visible")?(t.removeClass("rs-center").addClass("rs-reset"),e=-t.outerHeight()/2,i=-t.outerWidth()/2,t.removeClass("rs-reset"),"full"==a||"pie"==a||0===a.indexOf("custom")?n={"margin-top":e,"margin-left":i}:"half-top"==a||"half-bottom"==a?n={"margin-left":i}:"half-left"!=a&&"half-right"!=a||(n={"margin-top":e})):t.addClass("rs-center"),t.css(n));},_getTooltipValue:function(t){var e=this.options.value;if(this._rangeSlider){var i=e.split(",");return t?i[0]+" - "+i[1]:this._tooltipValue(i[0],1)+" - "+this._tooltipValue(i[1],2)}return t?e:this._tooltipValue(e)},_tooltipValue:function(t,e){var i=this._raise("tooltipFormat",{value:t,handle:this._handleArgs(e)});return null!=i&&"boolean"!=typeof i?i:t},_validateStartAngle:function(){var t=this.options,e=t.startAngle;return (e=(this.isNumber(e)?parseFloat(e):0)%360)<0&&(e+=360),t.startAngle=e},_validateEndAngle:function(){var t=this.options,e=t.startAngle,i=t.endAngle,i=this.isNumber(i)?("string"!=typeof i||"+"!==i.charAt(0)&&"-"!==i.charAt(0)||(i=e+parseFloat(i)),parseFloat(i)):360;return (i%=360)<=e&&(i+=360),i},_refreshCircleShape:function(){var t=this.options,e=t.circleShape;-1==["half-top","half-bottom","half-left","half-right","quarter-top-left","quarter-top-right","quarter-bottom-right","quarter-bottom-left","pie","custom-half","custom-quarter"].indexOf(e)&&(e="half"==e?"half-top":"quarter"==e?"quarter-top-left":"full"),t.circleShape=e;},_appendOverlay:function(){var t=this.options.circleShape;"pie"==t?this._checkOverlay(".rs-overlay",270):"custom-half"!=t&&"custom-quarter"!=t||(this._checkOverlay(".rs-overlay1",180),"custom-quarter"==t&&this._checkOverlay(".rs-overlay2",this._end));},_checkOverlay:function(t,e){var i=this.container.children(t);0==i.length&&(i=this.$createElement("div"+t+" rs-transition rs-bg-color"),this.container.append(i)),i.rsRotate(this._start+e);},_checkDataType:function(){var t,e,i,s=this.options,a=this._props();for(t in a.numberType){ i=s[e=a.numberType[t]],this.isNumber(i)?s[e]=parseFloat(i):s[e]=this.defaults[e]; }for(t in a.booleanType){ i=s[e=a.booleanType[t]],s[e]="false"!=i&&!!i; }for(t in a.stringType){ i=s[e=a.stringType[t]],s[e]=(""+i).toLowerCase(); }},_validateSliderType:function(){var t=this.options,e=t.sliderType.toLowerCase();this._rangeSlider=this._showRange=this._minRange=!1,"range"==e?this._rangeSlider=this._showRange=!0:e=-1!=e.indexOf("min")?(this._showRange=this._minRange=!0,"min-range"):"default",t.sliderType=e;},_updateStartEnd:function(){var t=this.options,e=t.circleShape,i=t.startAngle,s=t.endAngle;"full"!=e&&(-1!=e.indexOf("quarter")?s="+90":-1!=e.indexOf("half")?s="+180":"pie"==e&&(s="+270"),t.endAngle=s,"quarter-top-left"==e||"half-top"==e?i=0:"quarter-top-right"==e||"half-right"==e?i=90:"quarter-bottom-right"==e||"half-bottom"==e?i=180:"quarter-bottom-left"!=e&&"half-left"!=e||(i=270),t.startAngle=i);},_validateStartEnd:function(){this._start=this._validateStartAngle(),this._end=this._validateEndAngle();var t=this._start<this._end?0:360;this._end+=t-this._start;},_validateValue:function(t){return this._backupPreValue(),this._analyzeModelValue(),this._validateModelValue(),this._raiseBeforeValueChange(t?"change":"code")?(this._setValue(),this._backupPreValue(),!0):(this._revertPreValue(),!1)},_analyzeModelValue:function(){var t=this.options,e=t.value;e instanceof Array&&(e=e.toString());var i,s,a="string"==typeof e?e.split(","):[e];1==a.length&&this.isNumber(a[0])?a=[t.min,a[0]]:2<=a.length&&!this.isNumber(a[1])&&(a[1]=t.max),s=this._rangeSlider?[this._parseModelValue(a[0]),this._parseModelValue(a[1])].toString():(i=a.pop(),this._parseModelValue(i)),t.value=s;},_parseModelValue:function(t){return this.isNumber(t)?parseFloat(t):this._defaultValue()},_validateModelValue:function(){var t,e,i,s,a=this.options,n=a.value;this._rangeSlider?(t=n.split(","),i=parseFloat(t[0]),s=parseFloat(t[1]),i=this._limitValue(i),s=this._limitValue(s),this._invertRange||(e=a.min,a.max<e?i<s&&(i=s):s<i&&(s=i)),this._handle1=this._processStepByValue(i),this._handle2=this._processStepByValue(s)):this["_handle"+(this._minRange?2:this._active||1)]=this._processStepByValue(this._limitValue(n)),this._updateModelValue();},_updateModelValue:function(){var t;t=this._rangeSlider?this._handle1.value+","+this._handle2.value:this["_handle"+(this._minRange?2:this._active||1)].value,this.options.value=t;},_formRangeValue:function(t,e){e=e||this._active;var i=this._handle1.value,s=this._handle2.value;return 1==e?t+","+s:i+","+t},$createElement:function(t){var e=t.split(".");return p(document.createElement(e[0])).addClass(e[1]||"")},$createSVG:function(t,e){var i=t.split("."),s=document.createElementNS("http://www.w3.org/2000/svg",i[0]);return i[1]&&s.setAttribute("class",i[1]),e&&this.$setAttribute(s,e),s},$setAttribute:function(t,e){for(var i in e){var s,a=e[i];"class"!==i||(s=t.getAttribute("class"))&&(a+=" "+s),t.setAttribute(i,a);}return t},$append:function(e,t){return t.forEach(function(t){t&&e.appendChild(t);}),e},isNumber:function(t){return "number"==typeof(t=parseFloat(t))&&!isNaN(t)},getBrowserName:function(){var t="",e=window.navigator.userAgent;return window.opr&&opr.addons||window.opera||0<=e.indexOf(" OPR/")?t="opera":"undefined"!=typeof InstallTrigger?t="firefox":0<e.indexOf("MSIE ")||0<e.indexOf("Trident/")?t="ie":window.StyleMedia?t="edge":-1!=e.indexOf("Safari")&&-1==e.indexOf("Chrome")?t="safari":(window.chrome&&window.chrome.webstore||-1!=e.indexOf("Chrome"))&&(t="chrome"),t},_isBrowserSupported:function(){for(var t=["borderRadius","WebkitBorderRadius","MozBorderRadius","OBorderRadius","msBorderRadius","KhtmlBorderRadius"],e=0;e<t.length;e++){ if(void 0!==document.body.style[t[e]]){ return !0; } }console.error(o+" : Browser not supported");},_raise:function(t,e){var i=this.options,s=i[t],a=!0;return (e=e||{value:i.value}).id=this.id,e.control=this.control,e.options=i,s&&(e.type=t,"string"==typeof s&&(s=window[s]),p.isFunction(s)&&(a=!1!==(a=s.call(this,e))&&a)),this.control.trigger(p.Event(t,e)),a},_bind:function(t,e,i){p(t).bind(e,p.proxy(i,this));},_unbind:function(t,e,i){p(t).unbind(e,p.proxy(i,this));},_getInstance:function(){return p.data(this._dataElement()[0],o)},_saveInstanceOnElement:function(){p.data(this.control[0],o,this);},_saveInstanceOnID:function(){var t=this.id;t&&void 0!==window[t]&&(window[t]=this);},_removeData:function(){var t=this._dataElement()[0];p.removeData&&p.removeData(t,o),t.id&&"function"==typeof window[t.id]._init&&delete window[t.id];},_destroyControl:function(){this._isInputType&&this._dataElement().insertAfter(this.control).attr("type","text"),this.control.empty().removeClass("rs-control").height("").width(""),this._removeAnimation(),this._bindControlEvents("_unbind"),this._bindScrollEvents("_unbind");},_updateWidth:function(){this.lastBlock.css("padding",this.options.width);},_readOnly:function(t){this._isReadOnly=t,this.container.removeClass("rs-readonly"),t&&this.container.addClass("rs-readonly");},_get:function(t){return this.options[t]},_set:function(t,e,i){var s=this._props();if(-1!=p.inArray(t,s.numberType)){if(!this.isNumber(e)){ return; }e=parseFloat(e);}else { -1!=p.inArray(t,s.booleanType)?e="false"!=e&&!!e:-1!=p.inArray(t,s.stringType)&&(e=e.toLowerCase()); }var a=this.options;if(this._preValue=a.value,i||a[t]!==e){switch(a[t]=e,t){case"startAngle":case"endAngle":this._validateStartEnd(),this._updateSeperator(),this._appendOverlay();case"startValue":this._minRange&&(this._handle1=this._handleDefaults());case"min":case"max":case"step":case"value":this._validateValue()&&(this._updateHidden(),this._updateTooltip(),a.value!==this._preValue&&(this._raiseValueChange("code"),this._updatePre()));break;case"radius":this._setRadius(),this._updateTooltipPos();break;case"width":this._removeAnimation(),this._updateWidth(),this._setRadius(),this._refreshHandle(),this._updateTooltipPos(),this._addAnimation(),this._refreshSeperator();break;case"borderWidth":this._setRadius(),this._refreshHandle();break;case"handleSize":this._refreshHandle();break;case"handleShape":this._setHandleShape();break;case"animation":a.animation?this._addAnimation():this._removeAnimation();break;case"showTooltip":a.showTooltip?this._appendTooltip():this._removeTooltip();break;case"editableTooltip":this._tooltipEditable(),this._updateTooltipPos();break;case"rangeColor":case"tooltipColor":this._setTooltipColor(this.tooltip),this._setTooltipColor(this.input);break;case"disabled":a.disabled?this.disable():this.enable();break;case"readOnly":a.readOnly?this._readOnly(!0):a.disabled||this._readOnly(!1);break;case"mouseScrollAction":this._bindScrollEvents(a.mouseScrollAction?"_bind":"_unbind");break;case"lineCap":this._setRadius(),this._refreshSeperator();break;case"circleShape":this._refreshCircleShape(),"full"==a.circleShape&&(a.startAngle=0,a.endAngle="+360");case"sliderType":this._destroyControl(),this._onInit();break;case"svgMode":var n=this.control,r=a;this.destroy(),n[o](r);}return this}},option:function(t,e){if(t&&this._getInstance()){var i=this.options;if(p.isPlainObject(t)){var s,a="value",n=void 0!==t.min,r=void 0!==t.max;for(var o in (n||r)&&(n&&(i.min=t.min,delete t.min),r&&(i.max=t.max,delete t.max),s=i.value,void 0!==t[a]&&(s=t[a],delete t[a]),this._set(a,s,!0)),t){ this._set(o,t[o]); }}else if("string"==typeof t){if(void 0===e){ return this._get(t); }this._set(t,e);}return i.svgMode&&(this._isPropsRelatedToSVG(t)&&(this._setSVGAttributes(),this._moveSliderRange()),this._isPropsRelatedToSVGStyles(t)&&this._setSVGStyles()),this}},getValue:function(t){if(this._rangeSlider&&this.isNumber(t)){var e=parseFloat(t);if(1==e||2==e){ return this["_handle"+e].value }}return this._get("value")},setValue:function(t,e){var i,s;this.isNumber(t)&&(this.isNumber(e)&&(this._rangeSlider?(i=parseFloat(e),s=parseFloat(t),t=this._formRangeValue(s,i)):this._minRange||(this._active=e)),this._set("value",t));},refreshTooltip:function(){this._updateTooltipPos();},disable:function(){this.options.disabled=!0,this.container.addClass("rs-disabled"),this._readOnly(!0);},enable:function(){var t=this.options;t.disabled=!1,this.container.removeClass("rs-disabled"),t.readOnly||this._readOnly(!1);},destroy:function(){this._getInstance()&&(this._destroyControl(),this._removeData(),this._isInputType&&this.control.remove());}},p.fn.rsRotate=function(t){var e=this,i="rotate("+t+"deg)";return e.css("-webkit-transform",i),e.css("-moz-transform",i),e.css("-ms-transform",i),e.css("-o-transform",i),e.css("transform",i),e},r.prototype.$polarToCartesian=function(t,e,i){var s=(i-180)*Math.PI/180;return [t+e*Math.cos(s),t+e*Math.sin(s)].join(" ")},r.prototype.$drawArc=function(t,e,i,s,a){var n,r,o,h=s-i==360,l=Math.abs(i-s)<=180?"0":"1",d=a?1:0,u=a?s:i,_=[];return h?(n=(i+s)/2,r=this.$polarToCartesian(t,e,n),o=this.$polarToCartesian(t,e,u),_.push("A",1,1,0,0,d,r,"A",1,1,0,0,d,o)):(o=this.$polarToCartesian(t,e,u),_.push("A",e,e,0,l,d,o)),_.join(" ")},r.prototype.$drawPath=function(t,e,i,s,a,n){var r,o,h=this.$polarToCartesian(t,e,i),l=["M "+h,this.$drawArc(t,e,i,s,!0)];return a&&(r=this.$polarToCartesian(t,a,s),o=this.$drawArc(t,a,i,s,!1),"none"==n?l.push("M "+r,o):"round"==n?l.push("A 1, 1, 0, 0, 1, "+r,o,"A 1, 1, 0, 0, 1, "+h):"butt"!=n&&"square"!=n||l.push("L "+r,o,"L "+h,"Z")),l.join(" ")},r.prototype.$getArcLength=function(t,e){return void 0===e&&(e=360),2*Math.PI*t*(e/360)},p.fn[o].prototype=r.prototype;});
	});

	var toStr = Object.prototype.toString;

	var isArguments = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr$1 = Object.prototype.toString;
		var isArgs = isArguments; // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		];
		var equalsConstructorPrototype = function (o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') { return false; }
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		}());
		var equalsConstructorPrototypeIfNotBuggy = function (o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};

		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr$1.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr$1.call(object) === '[object String]';
			var theKeys = [];

			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}

			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}

			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	var implementation = keysShim;

	var slice = Array.prototype.slice;


	var origKeys = Object.keys;
	var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

	var originalKeys = Object.keys;

	keysShim$1.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArguments(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim$1;
		}
		return Object.keys || keysShim$1;
	};

	var objectKeys = keysShim$1;

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	var shams = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;


	var hasSymbols = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return shams();
	};

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice$1 = Array.prototype.slice;
	var toStr$2 = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation$1 = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr$2.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice$1.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice$1.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice$1.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	var functionBind = Function.prototype.bind || implementation$1;

	var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols$1 = hasSymbols();

	var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};



	var $concat = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace = functionBind.call(Function.call, String.prototype.replace);
	var $strSlice = functionBind.call(Function.call, String.prototype.slice);
	var $exec = functionBind.call(Function.call, RegExp.prototype.exec);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (src(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (src(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError('"allowMissing" argument must be a boolean');
		}

		if ($exec(/^%?[^%]*%?$/, name) === null) {
			throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
		}
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (src(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = src(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var $defineProperty = getIntrinsic('%Object.defineProperty%', true);

	var hasPropertyDescriptors = function hasPropertyDescriptors() {
		if ($defineProperty) {
			try {
				$defineProperty({}, 'a', { value: 1 });
				return true;
			} catch (e) {
				// IE 8 has a broken defineProperty
				return false;
			}
		}
		return false;
	};

	hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		// node v0.6 has a bug where array lengths can be Set but not Defined
		if (!hasPropertyDescriptors()) {
			return null;
		}
		try {
			return $defineProperty([], 'length', { value: 1 }).length !== 1;
		} catch (e) {
			// In Firefox 4-22, defining length on an array throws an exception.
			return true;
		}
	};

	var hasPropertyDescriptors_1 = hasPropertyDescriptors;

	var hasSymbols$2 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr$3 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr$3.call(fn) === '[object Function]';
	};

	var hasPropertyDescriptors$1 = hasPropertyDescriptors_1();

	var supportsDescriptors = origDefineProperty && hasPropertyDescriptors$1;

	var defineProperty = function (object, name, value, predicate) {
		if (name in object) {
			if (predicate === true) {
				if (object[name] === value) {
					return;
				}
			} else if (!isFunction(predicate) || !predicate()) {
				return;
			}
		}
		if (supportsDescriptors) {
			origDefineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value; // eslint-disable-line no-param-reassign
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = objectKeys(map);
		if (hasSymbols$2) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	var defineProperties_1 = defineProperties;

	var callBind = createCommonjsModule(function (module) {




	var $apply = getIntrinsic('%Function.prototype.apply%');
	var $call = getIntrinsic('%Function.prototype.call%');
	var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

	var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
	var $max = getIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(functionBind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}
	});
	var callBind_1 = callBind.apply;

	var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

	var callBound = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = getIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};

	// modified from https://github.com/es-shims/es6-shim

	var hasSymbols$3 = shams();

	var toObject = Object;
	var $push = callBound('Array.prototype.push');
	var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
	var originalGetSymbols = hasSymbols$3 ? Object.getOwnPropertySymbols : null;

	// eslint-disable-next-line no-unused-vars
	var implementation$2 = function assign(target, source1) {
		var arguments$1 = arguments;

		if (target == null) { throw new TypeError('target must be an object'); }
		var to = toObject(target); // step 1
		if (arguments.length === 1) {
			return to; // step 2
		}
		for (var s = 1; s < arguments.length; ++s) {
			var from = toObject(arguments$1[s]); // step 3.a.i

			// step 3.a.ii:
			var keys = objectKeys(from);
			var getSymbols = hasSymbols$3 && (Object.getOwnPropertySymbols || originalGetSymbols);
			if (getSymbols) {
				var syms = getSymbols(from);
				for (var j = 0; j < syms.length; ++j) {
					var key = syms[j];
					if ($propIsEnumerable(from, key)) {
						$push(keys, key);
					}
				}
			}

			// step 3.a.iii:
			for (var i = 0; i < keys.length; ++i) {
				var nextKey = keys[i];
				if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
					var propValue = from[nextKey]; // step 3.a.iii.2.a
					to[nextKey] = propValue; // step 3.a.iii.2.b
				}
			}
		}

		return to; // step 4
	};

	var lacksProperEnumerationOrder = function () {
		if (!Object.assign) {
			return false;
		}
		/*
		 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
		 * note: this does not detect the bug unless there's 20 characters
		 */
		var str = 'abcdefghijklmnopqrst';
		var letters = str.split('');
		var map = {};
		for (var i = 0; i < letters.length; ++i) {
			map[letters[i]] = letters[i];
		}
		var obj = Object.assign({}, map);
		var actual = '';
		for (var k in obj) {
			actual += k;
		}
		return str !== actual;
	};

	var assignHasPendingExceptions = function () {
		if (!Object.assign || !Object.preventExtensions) {
			return false;
		}
		/*
		 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
		 * which is 72% slower than our shim, and Firefox 40's native implementation.
		 */
		var thrower = Object.preventExtensions({ 1: 2 });
		try {
			Object.assign(thrower, 'xy');
		} catch (e) {
			return thrower[1] === 'y';
		}
		return false;
	};

	var polyfill = function getPolyfill() {
		if (!Object.assign) {
			return implementation$2;
		}
		if (lacksProperEnumerationOrder()) {
			return implementation$2;
		}
		if (assignHasPendingExceptions()) {
			return implementation$2;
		}
		return Object.assign;
	};

	var shim = function shimAssign() {
		var polyfill$1 = polyfill();
		defineProperties_1(
			Object,
			{ assign: polyfill$1 },
			{ assign: function () { return Object.assign !== polyfill$1; } }
		);
		return polyfill$1;
	};

	var polyfill$1 = callBind.apply(polyfill());
	// eslint-disable-next-line no-unused-vars
	var bound = function assign(target, source1) {
		return polyfill$1(Object, arguments);
	};

	defineProperties_1(bound, {
		getPolyfill: polyfill,
		implementation: implementation$2,
		shim: shim
	});

	var object_assign = bound;

	function styleInject(css, ref) {
	  if ( ref === void 0 ) { ref = {}; }
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = ".rs-ie,.rs-edge,.rs-handle{-ms-touch-action:none;touch-action:none}.rs-control{position:relative;outline:0 none}.rs-container{position:relative}.rs-control *,.rs-control *:before,.rs-control *:after{-webkit-box-sizing:border-box;box-sizing:border-box}.rs-animation .rs-transition{transition:all .5s linear 0s}.rs-bar{-webkit-transform-origin:100% 50%;-ms-transform-origin:100% 50%;transform-origin:100% 50%}.rs-control .rs-split .rs-path,.rs-control .rs-overlay1,.rs-control .rs-overlay2{-webkit-transform-origin:50% 100%;-ms-transform-origin:50% 100%;transform-origin:50% 100%}.rs-control .rs-overlay{-webkit-transform-origin:100% 100%;-ms-transform-origin:100% 100%;transform-origin:100% 100%}.rs-rounded .rs-seperator,.rs-split .rs-path{-webkit-background-clip:padding-box;background-clip:padding-box}.rs-disabled{opacity:.35}.rs-inner-container{height:100%;width:100%;position:absolute;top:0;overflow:hidden}.rs-control .rs-quarter div.rs-block{height:200%;width:200%}.rs-control .rs-half.rs-top div.rs-block,.rs-control .rs-half.rs-bottom div.rs-block{height:200%;width:100%}\r\n.rs-control .rs-half.rs-left div.rs-block,.rs-control .rs-half.rs-right div.rs-block{height:100%;width:200%}.rs-control .rs-bottom .rs-block{top:auto;bottom:0}.rs-control .rs-right .rs-block{right:0}.rs-block.rs-outer{border-radius:1000px}.rs-block{height:100%;width:100%;display:block;position:absolute;top:0;overflow:hidden;z-index:3}.rs-block .rs-inner{border-radius:1000px;display:block;height:100%;width:100%;position:relative}.rs-overlay{width:50%}.rs-overlay1,.rs-overlay2{width:100%}.rs-overlay,.rs-overlay1,.rs-overlay2{position:absolute;background-color:#fff;z-index:3;top:0;height:50%}.rs-bar{display:block;position:absolute;bottom:0;height:0;z-index:10}.rs-bar.rs-rounded{z-index:5}.rs-bar .rs-seperator{height:0;display:block;float:left}.rs-bar:not(.rs-rounded) .rs-seperator{border-left:none;border-right:none}.rs-bar.rs-start .rs-seperator{border-top:none}.rs-bar.rs-end .rs-seperator{border-bottom:none}.rs-bar.rs-start.rs-rounded .rs-seperator{border-radius:0 0 1000px 1000px}.rs-bar.rs-end.rs-rounded .rs-seperator{border-radius:1000px 1000px 0 0}\r\n.rs-full .rs-bar,.rs-half .rs-bar{width:50%}.rs-half.rs-left .rs-bar,.rs-half.rs-right .rs-bar,.rs-quarter .rs-bar{width:100%}.rs-full .rs-bar,.rs-half.rs-left .rs-bar,.rs-half.rs-right .rs-bar{top:50%}.rs-bottom .rs-bar{top:0}.rs-half.rs-right .rs-bar,.rs-quarter.rs-right .rs-bar{right:100%}.rs-handle.rs-move{cursor:move}.rs-readonly .rs-handle.rs-move{cursor:default}.rs-classic-mode .rs-path{display:block;height:100%;width:100%}.rs-split .rs-path{border-radius:1000px 1000px 0 0;overflow:hidden;height:50%;position:absolute;top:0;z-index:2}.rs-control .rs-svg-container{display:block;position:absolute;top:0}.rs-control .rs-bottom .rs-svg-container{top:auto;bottom:0}.rs-control .rs-right .rs-svg-container{right:0}.rs-tooltip{position:absolute;cursor:default;border:1px solid transparent;z-index:10}.rs-full .rs-tooltip{top:50%;left:50%}.rs-bottom .rs-tooltip{top:0}.rs-top .rs-tooltip{bottom:0}.rs-right .rs-tooltip{left:0}.rs-left .rs-tooltip{right:0}.rs-half.rs-top .rs-tooltip,.rs-half.rs-bottom .rs-tooltip{left:50%}\r\n.rs-half.rs-left .rs-tooltip,.rs-half.rs-right .rs-tooltip{top:50%}.rs-tooltip .rs-input{outline:0 none;border:none;background:0 0}.rs-tooltip-text{font-family:verdana;font-size:13px;border-radius:7px;text-align:center;color:inherit}.rs-tooltip.rs-edit{padding:5px 8px}.rs-tooltip.rs-hover,.rs-tooltip.rs-edit:hover{border:1px solid #aaa;cursor:pointer}.rs-readonly .rs-tooltip.rs-edit:hover{border-color:transparent;cursor:default}.rs-tooltip.rs-center{margin:0 !important}.rs-half.rs-top .rs-tooltip.rs-center,.rs-half.rs-bottom .rs-tooltip.rs-center{transform:translate(-50%,0)}.rs-half.rs-left .rs-tooltip.rs-center,.rs-half.rs-right .rs-tooltip.rs-center{transform:translate(0,-50%)}.rs-full .rs-tooltip.rs-center{transform:translate(-50%,-50%)}.rs-tooltip.rs-reset{margin:0 !important;top:0 !important;left:0 !important}.rs-handle{border-radius:1000px;outline:0 none;float:left}.rs-handle.rs-handle-square{border-radius:0}.rs-handle-dot{border:1px solid #aaa;padding:6px}.rs-handle-dot:after{display:block;content:\"\";border:1px solid #aaa;height:100%;width:100%;border-radius:1000px}\r\n.rs-seperator{border:1px solid #aaa}.rs-border{border:1px solid #aaa}.rs-path-color{background-color:#fff}.rs-range-color{background-color:#54bbe0}.rs-bg-color{background-color:#fff}.rs-handle{background-color:#838383}.rs-handle-dot{background-color:#fff}.rs-handle-dot:after{background-color:#838383}.rs-path-inherited .rs-path{opacity:.2}.rs-svg-mode .rs-path{stroke:#fff}.rs-svg-mode .rs-range{stroke:#54bbe0}.rs-svg-mode .rs-border{stroke:#aaa}.rs-handle{background-color:#f3f3f3;box-shadow:0px 0px 4px 0px #000}.rs-tooltip-text{font-size:26px;font-weight:500;font-family:Avenir,Tahoma,Verdana,sans-serif}.rs-animation .rs-transition{transition:all .5s ease-in-out 0s}.rs-tooltip.rs-hover,.rs-tooltip.rs-edit:hover{border:1px solid #cacaca}.rs-handle {\r\n    background-color: #f3f3f3;\r\n    box-shadow: 0px 0px 4px 0px #000;\r\n  }\r\n  \r\n  .rs-tooltip-text {\r\n    font-size: 26px;\r\n    font-weight: 500;\r\n    font-family: Avenir, Tahoma, Verdana, sans-serif;\r\n  }\r\n  \r\n  .rs-animation .rs-transition {\r\n    transition: all 0.5s ease-in-out 0s;\r\n  }\r\n  \r\n  .rs-tooltip.rs-hover,\r\n  .rs-tooltip.rs-edit:hover {\r\n    border: 1px solid #cacaca;\r\n  }";
	styleInject(css_248z);

	var script = {
	  name: "RoundSlider",
	  props: {
	    // Basic props (frequently used)
	    min: {
	      type: [String, Number],
	      default: 0,
	    },
	    max: {
	      type: [String, Number],
	      default: 100,
	    },
	    step: {
	      type: [String, Number],
	      default: 1,
	    },
	    modelValue: {
	      type: [String, Number],
	      default: null,
	    },
	    radius: {
	      type: [String, Number],
	      default: 105,
	    },
	    width: {
	      type: [String, Number],
	      default: 20,
	    },
	    lineCap: {
	      type: String,
	      default: "butt",
	      validator: function validator(cap) {
	        return validateProp("lineCap", cap);
	      },
	    },
	    startAngle: {
	      type: [String, Number],
	      default: 0,
	    },
	    endAngle: {
	      type: [String, Number],
	      default: "+360",
	    },

	    // UI appearance related props
	    borderWidth: {
	      type: [String, Number],
	      default: 0,
	    },
	    borderColor: {
	      type: String,
	      default: "inherit",
	    },
	    pathColor: {
	      type: String,
	      default: "#EEE",
	    },
	    rangeColor: {
	      type: String,
	      default: "#69F",
	    },
	    tooltipColor: {
	      type: String,
	      default: "inherit",
	    },

	    // Behaviour related props
	    sliderType: {
	      type: String,
	      default: "min-range",
	      validator: function validator(type) {
	        return validateProp("sliderType", type);
	      },
	    },
	    circleShape: {
	      type: String,
	      default: "full",
	      validator: function validator(shape) {
	        return validateProp("circleShape", shape);
	      },
	    },
	    animation: {
	      type: [String, Boolean],
	      default: true,
	    },
	    readOnly: {
	      type: [String, Boolean],
	      default: false,
	    },
	    disabled: {
	      type: [String, Boolean],
	      default: false,
	    },

	    // Miscellaneous
	    handleSize: {
	      type: [String, Number],
	      default: "+0",
	    },
	    handleShape: {
	      type: String,
	      default: "round",
	      validator: function validator(shape) {
	        return validateProp("handleShape", shape);
	      },
	    },
	    showTooltip: {
	      type: [String, Boolean],
	      default: true,
	    },
	    editableTooltip: {
	      type: [String, Boolean],
	      default: true,
	    },
	    keyboardAction: {
	      type: [String, Boolean],
	      default: true,
	    },
	    mouseScrollAction: {
	      type: [String, Boolean],
	      default: false,
	    },

	    // Usecase related props
	    startValue: {
	      type: [String, Number],
	      default: null,
	    },

	    // Events
	    create: {
	      type: Function,
	      default: null,
	    },
	    beforeValueChange: {
	      type: Function,
	      default: null,
	    },
	    change: {
	      type: Function,
	      default: null,
	    },
	    update: {
	      type: Function,
	      default: null,
	    },
	    valueChange: {
	      type: Function,
	      default: null,
	    },
	    tooltipFormat: {
	      type: Function,
	      default: null,
	    },
	  },
	  setup: function setup(props) {
	    var allProps = object_assign({}, props);
	    return {
	      allProps: allProps,
	    };
	  },
	  computed: {
	    control: function control() {
	      return jquery(this.$el);
	    },

	    instance: function instance() {
	      return this.control.data("roundSlider");
	    },
	    // for the vue lower versions
	    // allProps() {
	    //   if (this.$props) {
	    //     return this.$props;
	    //   }
	    //
	    //   const keys = Object.keys(this.$options.props);
	    //   const props = keys.reduce((propsObj, key) => {
	    //     const obj = {};
	    //     obj[key] = this[key];
	    //     return Object.assign(propsObj, obj);
	    //   }, {});
	    //   return props;
	    // },
	  },

	  mounted: function mounted() {
	    var this$1 = this;

	    // below are the default props to overwrite from base roundSlider
	    var defaultProps = {
	      svgMode: true,
	    };
	    // merge the actual props witht the default props then initialize the component
	    var options = Object.assign(defaultProps, this.allProps);

	    this.control.roundSlider(options).on("update", function (ref) {
	      var value = ref.value;

	      this$1.$emit("update:modelValue", value);
	      this$1.instance.option("value", value);
	    });
	    this.$emit("update:modelValue", this.modelValue);
	    this.instance.option("value", this.modelValue);
	    // all the props from round-slider will support the one-way data binding
	    // so, watch all the props for the changes to reflect in the component
	    this.watchProps();
	  },
	  unmounted: function unmounted() {
	    this.control.roundSlider("destroy");
	  },
	  emits: ["update:modelValue"],
	  methods: {
	    updateProp: function updateProp(prop, value) {
	      this.instance.option(prop, value);
	      this.instance.option("value", value);
	      this.$emit("update:modelValue", value);
	    },

	    watchProps: function watchProps() {
	      var this$1 = this;

	      var props = Object.keys(this.allProps);
	      props.forEach(function (prop) {
	        this$1.$watch(prop, function (value) {
	          this$1.updateProp(prop, value);
	        });
	      }, this);
	    },
	  },
	};

	// the possible values for the string type props
	// #: later this can be imported from the base roundSlider
	var possibleValues = {
	  lineCap: ["butt", "round", "square", "none"],
	  sliderType: ["min-range", "range", "default"],
	  circleShape: [
	    "full",
	    "pie",
	    "half-top",
	    "half-bottom",
	    "half-left",
	    "half-right",
	    "quarter-top-left",
	    "quarter-top-right",
	    "quarter-bottom-right",
	    "quarter-bottom-left" ],
	  handleShape: ["round", "square", "dot"],
	};

	var validateProp = function (prop, value) {
	  var allValues = possibleValues[prop];
	  if (allValues.indexOf(value) === -1) {
	    var msg = "custom validator check failed for prop \"" + prop + "\" with value \"" + value + "\"";
	    var info = "\n\n---> The possible values are \n\t\t* " + (allValues.join(
	      "\n\t\t* "
	    )) + "\n\n";
	    console.error("[Vue warn]: Invalid prop: " + msg + info);
	  }
	  return true;
	};

	var _hoisted_1 = /*#__PURE__*/vue.createElementVNode("div", null, null, -1 /* HOISTED */);
	var _hoisted_2 = [
	  _hoisted_1
	];

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return (vue.openBlock(), vue.createElementBlock("div", null, _hoisted_2))
	}

	script.render = render;
	script.__file = "src/round-slider.vue";

	/* global global*/

	// Define the install function
	var install = function (Vue) {
	  Vue.component("round-slider", script);
	};

	/* -- Plugin definition & Auto-install -- /
	/ You shouldn't have to modify the code below */

	// Plugin
	var plugin = { install: install };

	// Auto-install
	var GlobalVue = null;
	if (typeof window !== "undefined") {
	  GlobalVue = window.Vue;
	} else if (typeof global !== "undefined") {
	  GlobalVue = global.Vue;
	}
	if (GlobalVue) {
	  GlobalVue.use(plugin);
	}

	// Define the install function for Vue.use()
	install.installRoundSlider = function (Vue) {
	  if (install.installed) { return; }
	  install.installed = true;
	  Vue.component('RoundSlider', script);
	};

	exports.default = script;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
