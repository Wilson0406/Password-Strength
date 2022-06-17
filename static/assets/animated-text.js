/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./jeg-elementor-kit/assets/dev/js/animated-text.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jeg-elementor-kit/assets/dev/js/animated-text.js":
/*!**********************************************************!*\
  !*** ./jeg-elementor-kit/assets/dev/js/animated-text.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class JKitAnimatedText extends elementorModules.frontend.handlers.Base {\n  getDefaultSettings() {\n    return {\n      selectors: {\n        wrapper: '.jeg-elementor-kit.jkit-animated-text',\n        dynamic: '.dynamic-wrapper'\n      }\n    };\n  }\n\n  getDefaultElements() {\n    const selectors = this.getSettings('selectors');\n    return {\n      $wrapper: this.$element.find(selectors.wrapper),\n      $dynamic: this.$element.find(selectors.dynamic)\n    };\n  }\n\n  bindEvents() {\n    this.onRenderElement();\n  }\n\n  onRenderElement() {\n    const animation = this.elements.$wrapper.data('style');\n\n    if ('rotating' == animation) {\n      const rotate = this.elements.$wrapper.data('rotate'),\n            dynamic_text = this.elements.$dynamic.find('.dynamic-text');\n\n      if (dynamic_text.length > 0) {\n        const firstText = dynamic_text.first();\n\n        if (['typing', 'swirl', 'blinds', 'wave'].includes(rotate)) {\n          this.animateText(firstText, this.getNextText(firstText));\n        } else {\n          this.showText(firstText, this.getNextText(firstText));\n        }\n      }\n    }\n  }\n\n  animateText(text, nextText) {\n    this.elements.$dynamic.removeClass('typing-delete');\n    text.addClass('show-text');\n    this.elements.$dynamic.removeClass('cursor-blink');\n    this.animateLetter(text.find('.dynamic-text-letter').first(), text, nextText);\n  }\n\n  animateLetter(letter, text, nextText) {\n    const $this = this,\n          letter_speed = this.elements.$wrapper.data('letter-speed');\n    letter.addClass('show-letter');\n    setTimeout(function () {\n      if (letter.is(':last-child')) {\n        $this.hideText(text, nextText);\n      } else {\n        $this.animateLetter(letter.next(), text, nextText);\n      }\n    }, letter_speed);\n  }\n\n  getNextText(text) {\n    return text.is(':last-child') ? this.elements.$dynamic.find('.dynamic-text').first() : text.next();\n  }\n\n  hideText(text, nextText) {\n    const $this = this,\n          rotate = $this.elements.$wrapper.data('rotate'),\n          delay = $this.elements.$wrapper.data('delay');\n    this.elements.$dynamic.addClass('cursor-blink');\n    setTimeout(function () {\n      if ('typing' == rotate) {\n        const delay_delete = $this.elements.$wrapper.data('delay-delete');\n        $this.elements.$dynamic.addClass('typing-delete');\n        setTimeout(function () {\n          text.removeClass('show-text');\n          text.find('.dynamic-text-letter').removeClass('show-letter');\n          $this.animateText(nextText, $this.getNextText(nextText));\n        }, delay_delete);\n      } else {\n        text.removeClass('show-text');\n        text.find('.dynamic-text-letter').removeClass('show-letter');\n        $this.animateText(nextText, $this.getNextText(nextText));\n      }\n    }, delay);\n  }\n\n  showText(text, nextText) {\n    const $this = this,\n          delay = $this.elements.$wrapper.data('delay'),\n          rotate = $this.elements.$wrapper.data('rotate');\n    text.addClass('show-text');\n\n    if (rotate == 'clip') {\n      const clip_duration = $this.elements.$wrapper.data('clip-duration');\n      $this.elements.$dynamic.width(text.width() + 10);\n      $this.elements.$dynamic.animate({\n        width: 0\n      }, clip_duration / 2, function () {\n        text.removeClass('show-text');\n        nextText.addClass('show-text');\n        $this.elements.$dynamic.animate({\n          width: nextText.width() + 10\n        }, clip_duration / 2, function () {\n          setTimeout(function () {\n            text.removeClass('show-text');\n            $this.showText(nextText, $this.getNextText(nextText));\n          }, delay);\n        });\n      });\n    } else {\n      $this.elements.$dynamic.width(text.width());\n      setTimeout(function () {\n        text.removeClass('show-text');\n        $this.showText(nextText, $this.getNextText(nextText));\n      }, delay);\n    }\n  }\n\n}\n\njQuery(window).on('elementor/frontend/init', () => {\n  const addHandler = $element => {\n    elementorFrontend.elementsHandler.addHandler(JKitAnimatedText, {\n      $element\n    });\n  };\n\n  elementorFrontend.hooks.addAction('frontend/element_ready/jkit_animated_text.default', addHandler);\n});\n\n//# sourceURL=webpack:///./jeg-elementor-kit/assets/dev/js/animated-text.js?");

/***/ })

/******/ });