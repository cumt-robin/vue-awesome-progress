(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueAwesomeProgress", [], factory);
	else if(typeof exports === 'object')
		exports["VueAwesomeProgress"] = factory();
	else
		root["VueAwesomeProgress"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(2);

var iterableToArray = __webpack_require__(3);

var nonIterableSpread = __webpack_require__(4);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/index.vue?vue&type=template&id=7363219c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{ref:"canvasDemo",attrs:{"width":_vm.canvasSize,"height":_vm.canvasSize}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/index.vue?vue&type=template&id=7363219c&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(0);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/bezier-easing/src/index.js
var src = __webpack_require__(1);
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/index.vue?vue&type=script&lang=js&

//
//
//
//

/* harmony default export */ var componentsvue_type_script_lang_js_ = ({
  name: 'VueAwesomeProgress',
  props: {
    startDeg: {
      type: Number,
      "default": 270,
      validator: function validator(value) {
        return value >= 0 && value < 360;
      }
    },
    percentage: {
      type: Number,
      "default": 0,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    circleRadius: {
      type: Number,
      "default": 40
    },
    circleWidth: {
      type: Number,
      "default": 2
    },
    circleColor: {
      type: String,
      "default": '#e5e5e5'
    },
    lineWidth: {
      type: Number,
      "default": 8
    },
    useGradient: {
      type: Boolean,
      "default": true
    },
    lineColor: {
      type: String,
      "default": '#3B77E3'
    },
    lineColorStops: {
      type: Array,
      "default": function _default() {
        return [{
          percent: 0,
          color: '#13CDE3'
        }, {
          percent: 1,
          color: '#3B77E3'
        }];
      }
    },
    showText: {
      type: Boolean,
      "default": true
    },
    fontSize: {
      type: Number,
      "default": 14
    },
    fontColor: {
      type: String,
      "default": '#3B77E3'
    },
    pointRadius: {
      type: Number,
      "default": 6
    },
    pointColor: {
      type: String,
      "default": '#3B77E3'
    },
    animated: {
      type: Boolean,
      "default": true
    },
    easing: {
      type: String,
      // ease-in
      "default": '0.42,0,1,1',
      validator: function validator(value) {
        return /^(\d+(\.\d+)?,){3}\d+(\.\d+)?$/.test(value);
      }
    },
    duration: {
      type: Number,
      // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
      "default": 1
    },
    format: {
      type: Function
    }
  },
  data: function data() {
    return {
      gradient: null,
      easingFunc: null
    };
  },
  computed: {
    outerRadius: function outerRadius() {
      return this.pointRadius > 0 ? this.circleRadius + this.pointRadius : this.circleRadius + this.lineWidth / 2;
    },
    canvasSize: function canvasSize() {
      return 2 * this.outerRadius + 'px';
    },
    steps: function steps() {
      return this.duration * 60;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var easingParams = this.easing.split(',').map(function (item) {
      return Number(item);
    });
    this.easingFunc = src_default.a.apply(void 0, toConsumableArray_default()(easingParams));
    this.$nextTick(function () {
      _this.initCanvas();
    });
  },
  methods: {
    initCanvas: function initCanvas() {
      var _this2 = this;

      var canvas = this.$refs.canvasDemo;
      var ctx = canvas.getContext('2d');

      if (this.useGradient) {
        this.gradient = ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
        this.lineColorStops.forEach(function (item) {
          _this2.gradient.addColorStop(item.percent, item.color);
        });
      }

      var endDeg = this.getTargetDegByPercentage(this.startDeg, this.percentage);

      if (this.percentage === 0) {
        this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, 0, 0);
      } else {
        if (this.animated) {
          // 用动画来画动态内容
          this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, 1, this.steps);
        } else {
          this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, this.steps, this.steps);
        }
      }
    },
    animateDrawArc: function animateDrawArc(canvas, ctx, startDeg, endDeg, stepNo, stepTotal) {
      var _this3 = this;

      window.requestAnimationFrame(function () {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        var nextDeg = _this3.getTargetDeg(startDeg, endDeg, stepNo, stepTotal);

        var startArc = _this3.deg2Arc(startDeg);

        var nextArc = _this3.deg2Arc(nextDeg); // 画圆环


        ctx.strokeStyle = _this3.circleColor;
        ctx.lineWidth = _this3.circleWidth;
        ctx.beginPath();
        ctx.arc(_this3.outerRadius, _this3.outerRadius, _this3.circleRadius, 0, _this3.deg2Arc(360));
        ctx.stroke(); // 画文字

        if (_this3.showText) {
          ctx.font = "".concat(_this3.fontSize, "px Arial,\"Microsoft YaHei\"");
          ctx.fillStyle = _this3.fontColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var currPercentage = stepTotal > 0 ? _this3.easingFunc(stepNo / stepTotal) * _this3.percentage : 0;
          var label;

          if (typeof _this3.format === 'function') {
            label = _this3.format(currPercentage);
          } else {
            label = Math.round(currPercentage) + '%';
          }

          ctx.fillText(label, canvas.clientWidth / 2, canvas.clientWidth / 2);
        } // 画进度弧线


        if (stepTotal > 0) {
          ctx.strokeStyle = _this3.useGradient ? _this3.gradient : _this3.lineColor;
          ctx.lineWidth = _this3.lineWidth;
          ctx.beginPath();
          ctx.arc(_this3.outerRadius, _this3.outerRadius, _this3.circleRadius, startArc, nextArc);
          ctx.stroke();
        } // 画点


        if (_this3.pointRadius > 0) {
          ctx.fillStyle = _this3.pointColor;

          var pointPosition = _this3.getPositionsByDeg(nextDeg);

          ctx.beginPath();
          ctx.arc(pointPosition.x + _this3.pointRadius, pointPosition.y + _this3.pointRadius, _this3.pointRadius, 0, _this3.deg2Arc(360));
          ctx.fill();
        }

        if (stepNo !== stepTotal) {
          stepNo++;

          _this3.animateDrawArc(canvas, ctx, startDeg, endDeg, stepNo, stepTotal);
        }
      });
    },
    // 顺时针方向，根据开始deg，结束deg，以及步进值step，求取目标deg
    getTargetDeg: function getTargetDeg(startDeg, endDeg, stepNo, stepTotal) {
      if (stepTotal === 0) {
        return startDeg;
      }

      startDeg = startDeg % 360;
      endDeg = endDeg % 360;

      if (startDeg > endDeg) {
        var diff = endDeg + 360 - startDeg;
        var nextDeg = startDeg + diff * this.easingFunc(stepNo / stepTotal);

        if (nextDeg > 360) {
          nextDeg = nextDeg - 360;
          return nextDeg > endDeg ? endDeg : nextDeg;
        }

        return nextDeg;
      } else if (startDeg < endDeg) {
        var _diff = endDeg - startDeg;

        var _nextDeg = startDeg + _diff * this.easingFunc(stepNo / stepTotal);

        if (_nextDeg > endDeg) {
          return endDeg;
        } else if (_nextDeg > 360) {
          return _nextDeg - 360;
        }

        return _nextDeg;
      } else {
        return startDeg + 360 * this.easingFunc(stepNo / stepTotal);
      }
    },
    getTargetDegByPercentage: function getTargetDegByPercentage(startDeg, percentage) {
      return (startDeg + 360 * percentage / 100) % 360;
    },
    // 根据角度获取点的位置
    getPositionsByDeg: function getPositionsByDeg(deg) {
      var x = 0;
      var y = 0;

      if (deg >= 0 && deg <= 90) {
        // 0~90度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(deg)));
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(deg)));
      } else if (deg > 90 && deg <= 180) {
        // 90~180度
        x = this.circleRadius * (1 - Math.cos(this.deg2Arc(180 - deg)));
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(180 - deg)));
      } else if (deg > 180 && deg <= 270) {
        // 180~270度
        x = this.circleRadius * (1 - Math.sin(this.deg2Arc(270 - deg)));
        y = this.circleRadius * (1 - Math.cos(this.deg2Arc(270 - deg)));
      } else {
        // 270~360度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(360 - deg)));
        y = this.circleRadius * (1 - Math.sin(this.deg2Arc(360 - deg)));
      }

      return {
        x: x,
        y: y
      };
    },
    // deg转弧度
    deg2Arc: function deg2Arc(deg) {
      return deg / 180 * Math.PI;
    }
  }
});
// CONCATENATED MODULE: ./src/components/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentsvue_type_script_lang_js_ = (componentsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/index.vue





/* normalize component */

var component = normalizeComponent(
  src_componentsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components = (component.exports);
// CONCATENATED MODULE: ./src/components/index.js


components.install = function (Vue) {
  Vue.component(components.name, components);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(components);
}

/* harmony default export */ var src_components = __webpack_exports__["default"] = (components);

/***/ })
/******/ ]);
});