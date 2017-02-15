var Layers =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Layers = function () {
	  function Layers() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var _ref$wrapperSelector = _ref.wrapperSelector;
	    var wrapperSelector = _ref$wrapperSelector === undefined ? '.layers' : _ref$wrapperSelector;
	    var _ref$layerSelector = _ref.layerSelector;
	    var layerSelector = _ref$layerSelector === undefined ? '.layer' : _ref$layerSelector;
	    var _ref$perspective = _ref.perspective;
	    var perspective = _ref$perspective === undefined ? '800px' : _ref$perspective;
	    var _ref$transitionEasing = _ref.transitionEasing;
	    var transitionEasing = _ref$transitionEasing === undefined ? 'ease-out' : _ref$transitionEasing;
	    var _ref$transitionDurati = _ref.transitionDuration;
	    var transitionDuration = _ref$transitionDurati === undefined ? '80ms' : _ref$transitionDurati;
	    var _ref$wrapperTransform = _ref.wrapperTransformMultiplier;
	    var wrapperTransformMultiplier = _ref$wrapperTransform === undefined ? 5 : _ref$wrapperTransform;
	    var _ref$layerTransformMu = _ref.layerTransformMultiplier;
	    var layerTransformMultiplier = _ref$layerTransformMu === undefined ? 1.5 : _ref$layerTransformMu;

	    _classCallCheck(this, Layers);

	    this._options = {};
	    this._options.perspective = perspective;
	    this._options.transitionEasing = transitionEasing;
	    this._options.transitionDuration = transitionDuration;
	    this._options.wrapperTransformMultiplier = wrapperTransformMultiplier;
	    this._options.layerTransformMultiplier = layerTransformMultiplier;
	    this.wrappers = this.buildDOMElements(wrapperSelector, layerSelector);
	  }

	  _createClass(Layers, [{
	    key: 'buildDOMElements',
	    value: function buildDOMElements(wrapperSelector, layerSelector) {
	      var _this = this;

	      var positionStyle = function positionStyle(el) {
	        return el.style.position === 'absolute' ? '' : 'position: relative;';
	      };
	      return (0, _helpers.getIterableDOMNodes)(wrapperSelector).map(function (wrapper, i) {
	        // set base wrapper styles
	        wrapper.setAttribute('style', '\n        ' + positionStyle(wrapper) + '\n        transition: transform ' + _this._options.transitionDuration + ' ' + _this._options.transitionEasing + ';\n        transform-style: preserve-3d;\n        perspective: ' + _this._options.perspective + ';\n      ');

	        wrapper.addEventListener('mousemove', function (e) {
	          _this.handleMouseMove(e, i);
	        });
	        wrapper.addEventListener('mouseleave', function (e) {
	          _this.handleMouseLeave(e, i);
	        });

	        // set base layer styles
	        var layers = (0, _helpers.getIterableDOMNodes)(layerSelector, wrapper).map(function (layer) {
	          var offsetLayer = parseFloat(layer.dataset.level) || 1;
	          layer.setAttribute('style', '\n          ' + positionStyle(layer) + '\n          transform-style: flat;\n          transition: transform ' + _this._options.transitionDuration + ' ' + _this._options.transitionEasing + ';\n          transform: translateX(0px) translateY(0px) translateZ(0px);\n          perspective: ' + _this._options.perspective + ';\n          z-index: ' + (offsetLayer + 1) + ';\n        ');
	          return layer;
	        });

	        return { layers: layers, wrapper: wrapper };
	      });
	    }
	  }, {
	    key: 'handleMouseLeave',
	    value: function handleMouseLeave(e, wrapperIndex) {
	      var _wrappers$wrapperInde = this.wrappers[wrapperIndex];
	      var wrapper = _wrappers$wrapperInde.wrapper;
	      var layers = _wrappers$wrapperInde.layers;

	      wrapper.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0)';
	      layers.forEach(function (layer) {
	        layer.style.transform = 'translateX(0px) translateY(0px)';
	      });
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e, wrapperIndex) {
	      var _this2 = this;

	      var _wrappers$wrapperInde2 = this.wrappers[wrapperIndex];
	      var wrapper = _wrappers$wrapperInde2.wrapper;
	      var layers = _wrappers$wrapperInde2.layers;

	      var mousePosition = (0, _helpers.getMousePosition)(e, wrapper);
	      var offsetX = 0.5 - mousePosition.x / wrapper.offsetWidth;
	      var offsetY = 0.5 - mousePosition.y / wrapper.offsetHeight;
	      var translateY = offsetX * -1;
	      var rotateX = offsetY * this._options.wrapperTransformMultiplier * -1;
	      var rotateY = offsetX * this._options.wrapperTransformMultiplier;

	      wrapper.style.transform = '\n      translateY(' + translateY + 'px)\n      rotateX(' + rotateX + 'deg)\n      rotateY(' + rotateY + 'deg)\n      translateZ(0)\n    ';

	      layers.forEach(function (layer) {
	        var offsetLayer = parseFloat(layer.dataset.level) || 1;
	        var translateX = offsetX * offsetLayer * _this2._options.layerTransformMultiplier;
	        var translateY = offsetY * offsetLayer * _this2._options.layerTransformMultiplier;
	        layer.style.transform = '\n        translateX(' + translateX + 'px)\n        translateY(' + translateY + 'px)\n      ';
	        layer.style['z-index'] = offsetLayer + 1;
	      });
	    }
	  }]);

	  return Layers;
	}();

	exports.default = Layers;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIterableDOMNodes = getIterableDOMNodes;
	exports.getMousePosition = getMousePosition;
	function mousePositionDocument(e) {
	  var x = 0,
	      y = 0;
	  if (!e) {
	    e = window.event;
	  }
	  if (e.pageX || e.pageY) {
	    x = e.pageX;
	    y = e.pageY;
	  } else if (e.clientX || e.clientY) {
	    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	  }
	  return { x: x, y: y };
	}

	function findPos(el) {
	  var left = 0,
	      top = 0;
	  if (el.offsetParent) {
	    do {
	      left += el.offsetLeft;
	      top += el.offsetTop;
	    } while (el = el.offsetParent);
	  }
	  return { left: left, top: top };
	}

	function getIterableDOMNodes(selector, parent) {
	  parent = parent || document;
	  return Array.prototype.slice.call(parent.querySelectorAll(selector));
	}

	function getMousePosition(e, wrapper) {
	  var mousePosDoc = mousePositionDocument(e);
	  var targetPos = findPos(wrapper);
	  var x = mousePosDoc.x - targetPos.left;
	  var y = mousePosDoc.y - targetPos.top;
	  return { x: x, y: y };
	}

/***/ }
/******/ ]);