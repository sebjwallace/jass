'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Event = exports.Component = exports.RSS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Component2 = require('./Component');

var _Store = require('./Store');

var _Token = require('./Token');

var _Tag = require('./Tag');

var _StyleSheet = require('./StyleSheet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentFactory = function ComponentFactory(initial, styles) {
	_classCallCheck(this, ComponentFactory);

	var Store = RSS.Store,
	    token = new _Token.Token(),
	    tag = new _Tag.Tag(token.key, document),
	    stylesheet = new _StyleSheet.StyleSheet();

	var comp = new _Component2.Component({
		Store: Store, token: token, tag: tag, stylesheet: stylesheet
	});

	if (typeof initial == 'string') document.getElementById(initial).className = comp.className();else if ((typeof initial === 'undefined' ? 'undefined' : _typeof(initial)) == 'object') comp.setStyles(initial);
	if (styles) comp.setStyles(styles);

	return comp;
};

var _Event = function _Event(id) {
	var event = RSS.Store.events[id];
	for (var listener in event) {
		var comp = event[listener].component;
		var selector = event[listener].selector;
		var styles = {};
		styles[selector] = event[listener].styles;
		comp.setStyles(styles);
	}
};

var _RSS = function _RSS(store) {
	_classCallCheck(this, _RSS);

	this.Store = store;
	this.Component = ComponentFactory;
	this.Event = _Event;
	if (!document.getElementById('rss-container')) {
		var el = document.createElement('div');
		el.id = 'rss-container';
		document.body.appendChild(el);
	}
};

var RSS = exports.RSS = new _RSS(new _Store.Store());
var Component = exports.Component = ComponentFactory;
var Event = exports.Event = _Event;