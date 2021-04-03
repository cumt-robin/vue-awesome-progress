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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(3);

var iterableToArray = __webpack_require__(4);

var unsupportedIterableToArray = __webpack_require__(5);

var nonIterableSpread = __webpack_require__(6);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(0);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(0);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/index.vue?vue&type=template&id=51c3ab3a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{ref:"canvasDemo",attrs:{"width":_vm.canvasSize,"height":_vm.canvasSize}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/index.vue?vue&type=template&id=51c3ab3a&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(1);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/bezier-easing/src/index.js
var src = __webpack_require__(2);
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
      "default": false
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
      "default": '#444'
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
        return /^(\-?\d+(\.\d+)?,){3}\-?\d+(\.\d+)?$/.test(value);
      }
    },
    duration: {
      type: Number,
      // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
      "default": 0.6
    },
    format: {
      type: Function
    }
  },
  data: function data() {
    return {
      gradient: null,
      easingFunc: null,
      animationId: null,
      canvasInstance: null,
      ctx: null
    };
  },
  computed: {
    // 外围半径
    outerRadius: function outerRadius() {
      return this.pointRadius > 0 ? this.circleRadius + this.pointRadius : this.circleRadius + this.lineWidth / 2;
    },
    // 画布大小
    canvasSize: function canvasSize() {
      return 2 * this.outerRadius + 'px';
    },
    // 执行的总步数
    steps: function steps() {
      return this.duration * 60;
    }
  },
  watch: {
    percentage: function percentage(val, oldVal) {
      if (val >= 0 && val <= 100) {
        window.cancelAnimationFrame(this.animationId); // 更新进度条的时候，直接给定0.3s时间，即18帧

        this.animateDrawArc(oldVal, val, 1, 18);
      } else {
        throw new Error('进度百分比的范围必须在1~100内');
      }
    }
  },
  mounted: function mounted() {
    var easingParams = this.easing.split(',').map(function (item) {
      return Number(item);
    });
    this.easingFunc = src_default.a.apply(void 0, toConsumableArray_default()(easingParams));
    console.log(easingParams);
    this.initCanvas();
  },
  beforeDestroy: function beforeDestroy() {
    window.cancelAnimationFrame(this.animationId);
  },
  methods: {
    // 初始化canvas
    initCanvas: function initCanvas() {
      var _this = this;

      this.canvasInstance = this.$refs.canvasDemo;
      this.ctx = this.canvasInstance.getContext('2d'); // 设置渐变色

      if (this.useGradient) {
        this.gradient = this.ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
        this.lineColorStops.forEach(function (item) {
          _this.gradient.addColorStop(item.percent, item.color);
        });
      }

      if (this.percentage === 0) {
        this.animateDrawArc(0, 0, 0, 0);
      } else {
        if (this.animated) {
          // 用动画来画动态内容
          this.animateDrawArc(0, this.percentage, 1, this.steps);
        } else {
          this.animateDrawArc(0, this.percentage, this.steps, this.steps);
        }
      }
    },
    // 利用raf控制动画绘制
    animateDrawArc: function animateDrawArc(beginPercent, endPercent, stepNo, stepTotal) {
      this.ctx.clearRect(0, 0, this.canvasInstance.clientWidth, this.canvasInstance.clientHeight);
      var nextPercent = beginPercent + (endPercent - beginPercent) * this.easingFunc(stepNo / stepTotal);
      var nextDeg = this.getTargetDegByPercentage(nextPercent);
      var startArc = this.deg2Arc(this.startDeg);
      var nextArc = this.deg2Arc(nextDeg); // 画圆环

      this.ctx.strokeStyle = this.circleColor;
      this.ctx.lineWidth = this.circleWidth;
      this.ctx.beginPath();
      this.ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360));
      this.ctx.stroke(); // 画文字

      if (this.showText) {
        this.ctx.font = "".concat(this.fontSize, "px Arial,\"Microsoft YaHei\"");
        this.ctx.fillStyle = this.fontColor;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        var label;

        if (typeof this.format === 'function') {
          label = this.format(nextPercent);
        } else {
          label = Math.round(nextPercent) + '%';
        }

        this.ctx.fillText(label, this.canvasInstance.clientWidth / 2, this.canvasInstance.clientWidth / 2);
      } // 画进度弧线


      if (stepTotal > 0) {
        this.ctx.strokeStyle = this.useGradient ? this.gradient : this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, startArc, nextArc);
        this.ctx.stroke();
      } // 画点


      if (this.pointRadius > 0) {
        this.ctx.fillStyle = this.pointColor;
        var pointPosition = this.getPositionsByDeg(nextDeg);
        this.ctx.beginPath();
        this.ctx.arc(pointPosition.x + this.pointRadius, pointPosition.y + this.pointRadius, this.pointRadius, 0, this.deg2Arc(360));
        this.ctx.fill();
      }

      if (stepNo !== stepTotal) {
        stepNo++;
        this.animationId = window.requestAnimationFrame(this.animateDrawArc.bind(null, beginPercent, endPercent, stepNo, stepTotal));
      } else {
        window.cancelAnimationFrame(this.animationId);
      }
    },
    // 根据开始角度和进度百分比求取目标角度
    getTargetDegByPercentage: function getTargetDegByPercentage(percentage) {
      if (percentage === 100) {
        return this.startDeg + 360;
      } else {
        var targetDeg = (this.startDeg + 360 * percentage / 100) % 360;
        return targetDeg;
      }
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
      // register for functional component in vue file
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