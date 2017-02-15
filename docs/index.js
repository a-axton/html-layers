!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Layers=t():e.Layers=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.wrapperSelector,o=void 0===n?".layers":n,i=t.layerSelector,s=void 0===i?".layer":i,a=t.perspective,l=void 0===a?"800px":a,p=t.transitionEasing,u=void 0===p?"ease-out":p,f=t.transitionDuration,c=void 0===f?"80ms":f,d=t.wrapperTransformMultiplier,v=void 0===d?5:d,y=t.layerTransformMultiplier,m=void 0===y?1.5:y;r(this,e),this._options={},this._options.perspective=l,this._options.transitionEasing=u,this._options.transitionDuration=c,this._options.wrapperTransformMultiplier=v,this._options.layerTransformMultiplier=m,this.wrappers=this.buildDOMElements(o,s)}return o(e,[{key:"buildDOMElements",value:function(e,t){var n=this,r=function(e){return"absolute"===e.style.position?"":"position: relative;"};return(0,i.getIterableDOMNodes)(e).map(function(e,o){e.setAttribute("style","\n        "+r(e)+"\n        transition: transform "+n._options.transitionDuration+" "+n._options.transitionEasing+";\n        transform-style: preserve-3d;\n        perspective: "+n._options.perspective+";\n      "),e.addEventListener("mousemove",function(e){n.handleMouseMove(e,o)}),e.addEventListener("mouseleave",function(e){n.handleMouseLeave(e,o)});var s=(0,i.getIterableDOMNodes)(t,e).map(function(e){var t=parseFloat(e.dataset.level)||1;return e.setAttribute("style","\n          "+r(e)+"\n          transform-style: flat;\n          transition: transform "+n._options.transitionDuration+" "+n._options.transitionEasing+";\n          transform: translateX(0px) translateY(0px) translateZ(0px);\n          perspective: "+n._options.perspective+";\n          z-index: "+(t+1)+";\n        "),e});return{layers:s,wrapper:e}})}},{key:"handleMouseLeave",value:function(e,t){var n=this.wrappers[t],r=n.wrapper,o=n.layers;r.style.transform="translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0)",o.forEach(function(e){e.style.transform="translateX(0px) translateY(0px)"})}},{key:"handleMouseMove",value:function(e,t){var n=this,r=this.wrappers[t],o=r.wrapper,s=r.layers,a=(0,i.getMousePosition)(e,o),l=.5-a.x/o.offsetWidth,p=.5-a.y/o.offsetHeight,u=l*-1,f=p*this._options.wrapperTransformMultiplier*-1,c=l*this._options.wrapperTransformMultiplier;o.style.transform="\n      translateY("+u+"px)\n      rotateX("+f+"deg)\n      rotateY("+c+"deg)\n      translateZ(0)\n    ",s.forEach(function(e){var t=parseFloat(e.dataset.level)||1,r=l*t*n._options.layerTransformMultiplier,o=p*t*n._options.layerTransformMultiplier;e.style.transform="\n        translateX("+r+"px)\n        translateY("+o+"px)\n      ",e.style["z-index"]=t+1})}}]),e}();t["default"]=s},function(e,t){"use strict";function n(e){var t=0,n=0;return e||(e=window.event),e.pageX||e.pageY?(t=e.pageX,n=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:t,y:n}}function r(e){var t=0,n=0;if(e.offsetParent)do t+=e.offsetLeft,n+=e.offsetTop;while(e=e.offsetParent);return{left:t,top:n}}function o(e,t){return t=t||document,Array.prototype.slice.call(t.querySelectorAll(e))}function i(e,t){var o=n(e),i=r(t),s=o.x-i.left,a=o.y-i.top;return{x:s,y:a}}Object.defineProperty(t,"__esModule",{value:!0}),t.getIterableDOMNodes=o,t.getMousePosition=i}])});