'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Event = exports.Component = exports.RSS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Component2 = require('./Component');

var _Store = require('./Store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentFacade = function ComponentFacade(initial, styles) {
	_classCallCheck(this, ComponentFacade);

	var comp = new _Component2.Component(RSS.Store);
	if (typeof initial == 'string') document.getElementById(initial).className = comp.className();else if ((typeof initial === 'undefined' ? 'undefined' : _typeof(initial)) == 'object') comp.setStyles(initial);
	if (styles) comp.setStyles(styles);
	return comp;
};

var _Event = function _Event(id) {
	var comp = RSS.Store.events[id].component;
	var selector = RSS.Store.events[id].selector;
	var styles = {};
	styles[selector] = RSS.Store.events[id].styles;
	comp.setStyles(styles);
};

var _RSS = function _RSS(store) {
	_classCallCheck(this, _RSS);

	this.Store = store;
	this.Component = ComponentFacade;
	this.Event = _Event;
	if (!document.getElementById('rss-container')) {
		var el = document.createElement('div');
		el.id = 'rss-container';
		document.body.appendChild(el);
	}
};

var RSS = exports.RSS = new _RSS(new _Store.Store());
var Component = exports.Component = ComponentFacade;
var Event = exports.Event = _Event;