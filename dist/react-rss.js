(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function () {
	this.generate = function (length) {
		var key = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < length; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
		return key;
	};
	return this;
};

},{}],2:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (store) {

	this.store = store;

	this.isMediaQuery = function (check) {
		return check.match(/\@media/);
	};

	this.isImport = function (check) {
		return check.match(/\@import/);
	};

	this.isMixin = function (check) {
		return check.match(/^\@[a-z&\-]+$/);
	};

	this.isNesting = function (check) {
		return check.match(/^\>\s[a-z]+$/);
	};

	this.parse = function (obj) {
		var self = this;

		var stack = [];
		var parentID = '';
		var parentOBJ = {};
		var sum = "";

		// keep track of recursion level
		// level 1 keys are selectors
		var level = 0;

		var stitch = function stitch(obj) {

			level++;

			for (var props in obj) {

				if (level == 1 && !self.isMediaQuery(props)) {
					parentID = props;
					parentOBJ = obj[props];
				}

				if (self.isImport(props)) {
					var item = _defineProperty({}, obj[props] + ", " + parentID, self.store.getSelector(obj[props]));
					stack.push(item);
				} else if (self.isMixin(props)) {
					stitch(self.store.getMixin(props.replace('@', ''), obj[props]));
				} else if (self.isNesting(props)) {
					var item = _defineProperty({}, parentID + " " + props.replace('> ', ''), obj[props]);
					stack.push(item);
				} else {
					sum += props;
					if (typeof obj[props] === 'object') {
						sum += "{";
						stitch(obj[props]);
						sum += "}";
					} else {
						sum += ":" + obj[props] + ";";
					}
				}
			}

			level--;
		};

		stitch(obj);

		var len = stack.length;
		for (var i = 0; i < len; i++) {
			stitch(stack[i]);
			len = stack.length;
		}

		return sum;
	};

	return this;
};

},{}],3:[function(require,module,exports){
'use strict';

var Parser = require('./Parser');
var Keygen = require('./Keygen');
var Store = require('./Store');

var RSS = function RSS() {
	var self = this;
	var constructor = function constructor() {
		self.key = new Keygen().generate(5);
		self.rendered = false;
	};
	var renderCSS = function renderCSS(styles) {
		var el = document.createElement('style');
		el.id = "react-styles-" + self.key;
		document.body.insertBefore(el, document.body.lastChild);

		if (styles) {
			var initialStylesEl = document.createElement('style');
			initialStylesEl.id = "react-styles-initial-" + self.key;
			initialStylesEl.innerHTML = styles;
			document.body.insertBefore(initialStylesEl, document.body.lastChild);
		}

		self.rendered = true;
	};
	var updateCSS = function updateCSS(styles) {
		var el = document.getElementById('react-styles-' + self.key);
		el.innerHTML = styles;
	};
	this.setStyles = function (styles) {
		if (typeof styles === 'object') styles = new Parser(RSS.store).parse(styles);
		self.rendered ? updateCSS(styles) : renderCSS(styles);
	};
	constructor();
};

RSS.store = new Store();

RSS['export'] = function (id, obj) {
	RSS.store.setSelector(id, obj);
};
RSS.mixin = function (id, fn) {
	RSS.store.setMixin(id, fn);
};

module.exports = RSS;

},{"./Keygen":1,"./Parser":2,"./Store":5}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RSS = require('./RSS');

var ReactRSS = (function (_React$Component) {
	_inherits(ReactRSS, _React$Component);

	function ReactRSS(props) {
		_classCallCheck(this, ReactRSS);

		_get(Object.getPrototypeOf(ReactRSS.prototype), 'constructor', this).call(this, props);
		this.RSS = new RSS();
	}

	_createClass(ReactRSS, [{
		key: 'setStyles',
		value: function setStyles(styles) {
			this.RSS.setStyles(styles);
		}
	}]);

	return ReactRSS;
})(React.Component);

;

ReactRSS.mixin = function (id, fn) {
	RSS.mixin(id, fn);
};

ReactRSS['export'] = function (id, obj) {
	RSS['export'](id, obj);
};

module.exports = ReactRSS;

},{"./RSS":3}],5:[function(require,module,exports){
"use strict";

module.exports = function () {
	var self = this;

	var selectors = {};
	var mixins = {};

	this.setSelector = function (id, obj) {
		selectors[id] = obj;
	};

	this.getSelector = function (id) {
		return selectors[id];
	};

	this.setMixin = function (id, fn) {
		mixins[id] = fn;
	};

	this.getMixin = function (id, params) {
		return mixins[id](params);
	};
};

},{}]},{},[4]);
