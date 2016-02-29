(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.RSS = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function () {

	this.createStyleTag = function (id, content) {
		var el = window.document.createElement('style');
		el.id = id;
		if (content) el.innerHTML = content;
		window.document.body.insertBefore(el, window.document.body.lastChild);
	};

	this.updateStyleTag = function (id, content) {
		var el = window.document.getElementById(id);
		el.innerHTML = content;
	};
};

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
		return check.match(/^\>\s[^]+$/);
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

},{}],4:[function(require,module,exports){
'use strict';

var Parser = require('./Parser');
var Keygen = require('./Keygen');
var Store = require('./Store');
var DOMBridge = require('./DOMBridge');

var RSS = function RSS() {
	var self = this;
	self.dom = new DOMBridge();
	var constructor = function constructor() {
		self.key = new Keygen().generate(5);
		self.rendered = false;
	};
	var renderCSS = function renderCSS(styles) {
		self.dom.createStyleTag(self.getIds('reactive'));

		if (styles) self.dom.createStyleTag(self.getIds('initial'), styles);

		self.rendered = true;
	};
	var updateCSS = function updateCSS(styles) {
		self.dom.updateStyleTag(self.getIds('reactive'), styles);
	};
	this.setStyles = function (styles, returnAsString) {
		if (typeof styles === 'object') styles = new Parser(RSS.store).parse(styles);
		if (!returnAsString) self.rendered ? updateCSS(styles) : renderCSS(styles);else return styles;
	};
	this['export'] = function (id, obj) {
		RSS['export'](id, obj);
	};
	this.mixin = function (id, fn) {
		RSS.mixin(id, fn);
	};
	this.getIds = function (select) {
		var ids = {
			key: self.key,
			initial: 'rss-initial-' + self.key,
			reactive: 'rss-' + self.key
		};
		if (select) return ids[select];else return ids;
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

},{"./DOMBridge":1,"./Keygen":2,"./Parser":3,"./Store":5}],5:[function(require,module,exports){
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

},{}]},{},[4])(4)
});