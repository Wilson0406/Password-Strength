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
/******/ 	return __webpack_require__(__webpack_require__.s = "./jeg-elementor-kit/assets/dev/js/nav-menu.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jeg-elementor-kit/assets/dev/js/nav-menu.js":
/*!*****************************************************!*\
  !*** ./jeg-elementor-kit/assets/dev/js/nav-menu.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class JKitNavMenu extends elementorModules.frontend.handlers.Base {\n  getDefaultSettings() {\n    return {\n      selectors: {\n        wrapper: '.jeg-elementor-kit.jkit-nav-menu',\n        container: '.jkit-menu-wrapper',\n        open_toggle: '.jkit-hamburger-menu',\n        close_toggle: '.jkit-close-menu',\n        dropdown_toggle: 'li.menu-item-has-children > a i',\n        menu_dropdown: 'li.menu-item-has-children > a'\n      }\n    };\n  }\n\n  getDefaultElements() {\n    const selectors = this.getSettings('selectors');\n    return {\n      $wrapper: this.$element.find(selectors.wrapper),\n      $container: this.$element.find(selectors.container),\n      $open_toggle: this.$element.find(selectors.open_toggle),\n      $close_toggle: this.$element.find(selectors.close_toggle),\n      $dropdown_toggle: this.$element.find(selectors.dropdown_toggle),\n      $menu_dropdown: this.$element.find(selectors.menu_dropdown)\n    };\n  }\n\n  bindEvents() {\n    this.onLoadElement();\n  }\n\n  onLoadElement() {\n    this.addBodyClass();\n    this.addDropdownIcon();\n    this.onToogleClick();\n  }\n\n  addBodyClass() {\n    if (this.elements.$wrapper.length > 0) {\n      jQuery('html').addClass('jkit-nav-menu-loaded');\n    }\n  }\n\n  addDropdownIcon() {\n    const $this = this,\n          indicator = $this.elements.$wrapper.data('item-indicator'),\n          dropdown = $this.elements.$menu_dropdown,\n          selectors = this.getSettings('selectors');\n    dropdown.each(function () {\n      if (jQuery(this).find('i').length == 0) {\n        jQuery(this).append('<i class=\"' + indicator + '\"></i>');\n      }\n    });\n    $this.elements.$dropdown_toggle = this.$element.find(selectors.dropdown_toggle);\n  }\n\n  onToogleClick() {\n    const $this = this,\n          wrapper = $this.elements.$wrapper,\n          menu_dropdown = $this.elements.$menu_dropdown,\n          open_toggle = $this.elements.$open_toggle,\n          close_toggle = $this.elements.$close_toggle,\n          dropdown_toggle = $this.elements.$dropdown_toggle;\n    open_toggle.on('click', function (e) {\n      e.preventDefault();\n\n      if ($this.elements.$container.hasClass('active')) {\n        $this.elements.$container.removeClass('active');\n      } else {\n        $this.elements.$container.addClass('active');\n      }\n    });\n    close_toggle.on('click', function (e) {\n      e.preventDefault();\n      $this.elements.$container.removeClass('active');\n    });\n\n    if (wrapper.hasClass('submenu-click-title')) {\n      menu_dropdown.each(function () {\n        jQuery(this).on('click', function (e) {\n          e.preventDefault();\n          const dropdown = jQuery(this).next();\n\n          if (dropdown.hasClass('dropdown-open')) {\n            dropdown.removeClass('dropdown-open');\n          } else {\n            dropdown.addClass('dropdown-open');\n          }\n        });\n      });\n    } else {\n      dropdown_toggle.each(function () {\n        jQuery(this).on('click', function (e) {\n          e.preventDefault();\n          const dropdown = jQuery(this).parents('a').next();\n\n          if (dropdown.hasClass('dropdown-open')) {\n            dropdown.removeClass('dropdown-open');\n          } else {\n            dropdown.addClass('dropdown-open');\n          }\n        });\n      });\n    }\n  }\n\n}\n\njQuery(window).on('elementor/frontend/init', () => {\n  const addHandler = $element => {\n    elementorFrontend.elementsHandler.addHandler(JKitNavMenu, {\n      $element\n    });\n  };\n\n  elementorFrontend.hooks.addAction('frontend/element_ready/jkit_nav_menu.default', addHandler);\n});\n\n//# sourceURL=webpack:///./jeg-elementor-kit/assets/dev/js/nav-menu.js?");

/***/ })

/******/ });