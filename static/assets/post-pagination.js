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
/******/ 	return __webpack_require__(__webpack_require__.s = "./jeg-elementor-kit/assets/dev/js/post-pagination.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jeg-elementor-kit/assets/dev/js/post-pagination.js":
/*!************************************************************!*\
  !*** ./jeg-elementor-kit/assets/dev/js/post-pagination.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class JKitPostPagination extends elementorModules.frontend.handlers.Base {\n  getDefaultSettings() {\n    return {\n      selectors: {\n        wrapper: '.jeg-elementor-kit.post-element',\n        pagination: '.jkit-block-pagination'\n      }\n    };\n  }\n\n  getDefaultElements() {\n    const selectors = this.getSettings('selectors');\n    return {\n      $wrapper: this.$element.find(selectors.wrapper),\n      $pagination: this.$element.find(selectors.pagination)\n    };\n  }\n\n  bindEvents() {\n    this.onInitPagination();\n  }\n\n  onInitPagination() {\n    const $this = this,\n          wrapper = $this.elements.$wrapper,\n          pagination = $this.elements.$pagination,\n          options = wrapper.data('settings'),\n          load_limit = options.pagination_scroll_limit,\n          pagination_mode = options.pagination_mode,\n          parameter = {\n      'action': jkit_element_pagination_option.element_prefix + options.class,\n      'data': {\n        'current_page': 1,\n        'attr': options\n      }\n    };\n    let lock_load = false,\n        xhr_cache = [];\n\n    const scroll_handler = function () {\n      if (!lock_load && !pagination.hasClass('disabled') && window.self == window.top) {\n        if (load_limit >= parameter.data.current_page || load_limit == '0') {\n          pagination.find('a').waypoint(function () {\n            request_ajax();\n            this.destroy();\n          }, {\n            offset: '100%',\n            context: window\n          });\n        }\n      }\n    };\n\n    const save_cache = function (parameter, response) {\n      xhr_cache.push({\n        param: JSON.stringify(parameter),\n        result: response\n      });\n    };\n\n    const get_cache = function (parameter) {\n      const jsonparam = JSON.stringify(parameter);\n\n      for (let i = 0; i < xhr_cache.length; i++) {\n        if (jsonparam === xhr_cache[i].param) {\n          return prepare_cache(xhr_cache[i].result);\n        }\n      }\n    };\n\n    const prepare_cache = function (result) {\n      result.content = '<div>' + result.content + '</div>';\n      const content = jQuery(result.content);\n      result.content = content.html();\n      return result;\n    };\n\n    const render_ajax_response = function (response) {\n      const content = jQuery(response.content);\n      let count = 0;\n      content.each(function () {\n        if (jQuery(this).hasClass('jkit-post')) {\n          jQuery(this).addClass('jkit-ajax-loaded anim-' + count);\n        }\n\n        count++;\n      });\n      wrapper.removeClass('loading');\n      wrapper.addClass('loaded');\n      wrapper.find('.jkit-ajax-flag').append(content);\n\n      if (!response.next) {\n        pagination.addClass('disabled');\n        pagination.hide();\n      }\n\n      request_after_ajax();\n      jQuery(window).trigger('resize');\n\n      if ('scrollload' === pagination_mode) {\n        setTimeout(function () {\n          scroll_handler();\n        }, 500);\n      }\n    };\n\n    const request_ajax = function () {\n      request_before_ajax();\n      parameter.data.current_page = parameter.data.current_page + 1;\n      const result = get_cache(parameter);\n\n      if (result) {\n        render_ajax_response(result);\n      } else {\n        jQuery.ajax({\n          url: jkit_ajax_url,\n          type: 'post',\n          dataType: 'json',\n          data: parameter,\n          success: function (response) {\n            render_ajax_response(response);\n            save_cache(parameter, response);\n          }\n        });\n      }\n    };\n\n    const request_before_ajax = function () {\n      lock_load = true;\n      pagination.addClass('loading');\n      pagination.find('a').text(pagination.find('a').data('loading'));\n      wrapper.addClass('loading');\n    };\n\n    const request_after_ajax = function () {\n      lock_load = false;\n      pagination.removeClass('loading');\n      pagination.find('a').text(pagination.find('a').data('load'));\n    };\n\n    if ('scrollload' === pagination_mode) {\n      scroll_handler();\n    }\n\n    pagination.find('a').on('click', function (e) {\n      e.preventDefault();\n\n      if (!lock_load && !pagination.hasClass('disabled')) {\n        request_ajax();\n      }\n    });\n  }\n\n}\n\njQuery(window).on('elementor/frontend/init', () => {\n  const addHandler = $element => {\n    elementorFrontend.elementsHandler.addHandler(JKitPostPagination, {\n      $element\n    });\n  };\n\n  elementorFrontend.hooks.addAction('frontend/element_ready/jkit_post_block.default', addHandler);\n  elementorFrontend.hooks.addAction('frontend/element_ready/jkit_post_list.default', addHandler);\n});\n\n//# sourceURL=webpack:///./jeg-elementor-kit/assets/dev/js/post-pagination.js?");

/***/ })

/******/ });