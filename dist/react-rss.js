(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RSS = (function (_React$Component) {
	_inherits(RSS, _React$Component);

	function RSS(props) {
		_classCallCheck(this, RSS);

		_get(Object.getPrototypeOf(RSS.prototype), "constructor", this).call(this, props);
		this.key = this.generateKey();
		this.rendered = false;
	}

	_createClass(RSS, [{
		key: "generateKey",
		value: function generateKey() {
			var key = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < 10; i++) {
				key += possible.charAt(Math.floor(Math.random() * possible.length));
			}return key;
		}
	}, {
		key: "setStyles",
		value: function setStyles(styles) {
			if (typeof styles === 'object') styles = this.parseOBJ(styles);
			this.rendered ? this.updateCSS(styles) : this.renderCSS(styles);
		}
	}, {
		key: "parseOBJ",
		value: function parseOBJ(obj) {
			var post = {};
			var parentID = '';
			var parentOBJ = {};
			var sum = "";
			var stitch = function stitch(obj) {
				for (var props in obj) {

					if (props.match(/^(\#|\.)[a-z&\-]+$/)) {
						parentID = props;parentOBJ = obj[props];
					}

					if (props.match(/\@import/)) {
						// import
						post[obj[props] + ", " + parentID] = RSS.getSelector(obj[props]);
					} else if (props.match(/^\@[a-z&\-]+$/)) {
						// mixin
						stitch(RSS.getMixin(props.replace('@', ''), obj[props]));
					} else if (props.match(/^\>\s[a-z]+$/)) {
						// nesting
						post[parentID + " " + props.replace('> ', '')] = obj[props];
					} else {
						sum += props;
						if (typeof obj[props] === 'object') {
							sum += "{";stitch(obj[props]);sum += "}";
						} else {
							sum += ":" + obj[props] + ";";
						}
					}
				}
			};
			stitch(obj);
			stitch(post);
			return sum;
		}
	}, {
		key: "renderCSS",
		value: function renderCSS(styles) {
			var el = document.createElement('style');
			el.id = "react-styles-" + this.key;
			document.body.insertBefore(el, document.body.lastChild);

			if (styles) {
				var initialStylesEl = document.createElement('style');
				initialStylesEl.id = "react-styles-initial-" + this.key;
				initialStylesEl.innerHTML = styles;
				document.body.insertBefore(initialStylesEl, document.body.lastChild);
			}

			this.rendered = true;
		}
	}, {
		key: "updateCSS",
		value: function updateCSS(styles) {
			var el = document.getElementById('react-styles-' + this.key);
			el.innerHTML = styles;
		}
	}]);

	return RSS;
})(React.Component);

;

RSS["export"] = function (id, obj) {
	RSS.selectors[id] = obj;
};
RSS.getSelector = function (id) {
	return RSS.selectors[id];
};
RSS.selectors = {};

RSS.mixin = function (id, fn) {
	RSS.mixins[id] = fn;
};
RSS.getMixin = function (id, params) {
	return RSS.mixins[id](params);
};
RSS.mixins = {};

module.exports = RSS;

},{}]},{},[1]);
