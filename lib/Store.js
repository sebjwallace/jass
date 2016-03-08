'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Store = undefined;

var _Style = require('./Style');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function Store() {
	var _this = this;

	_classCallCheck(this, Store);

	this.styles = {};
	this.tags = {};
	this.mixins = {};
	this.variables = {};
	this.events = {};
	this.bindings = {};
	this.tokenIndex = {};
	this.styleIndex = {};
	this.renderStack = {};

	this.registerTag = function (id, tag) {
		_this.tags[id] = tag;
	};
	this.updateTag = function (id, content) {
		_this.tags[id].update(content);
	};
	this.addVariable = function (name, value) {
		_this.variables[name] = value;
	};
	this.getVariable = function (name) {
		return _this.variables[name];
	};
	this.addMixin = function (name, fn) {
		_this.mixins[name] = fn;
	};
	this.getMixin = function (id) {
		return _this.mixins[id];
	};
	this.addEvent = function (id, selector, event) {
		if (!_this.events[id]) _this.events[id] = {};
		if (!_this.events[id][selector]) _this.events[id][selector] = event;
	};
	this.addBinding = function (id, binding) {
		_this.bindings[id] = binding;
	};
	this.addToRenderStack = function (key) {
		_this.renderStack[key] = key;
	};
	this.getRenderStack = function () {
		return _this.renderStack;
	};
	this.getStyleIndex = function () {
		return _this.styleIndex;
	};
	this.emptyRenderStack = function () {
		_this.renderStack = {};
	};
	this.addStyle = function (key, selector, styleBody) {
		_this.styles[selector] = new _Style.Style(key, selector, styleBody);
	};
	this.getStyle = function (selector) {
		if (!_this.styles[selector]) console.log('\'' + selector + '\' does not exist!');else return _this.styles[selector];
	};
	this.registerToken = function (key, selector, style) {
		if (!_this.tokenIndex[key]) _this.tokenIndex[key] = {};
		_this.tokenIndex[key][selector] = style;
	};
	this.registerStyle = function (key, selector, styleBody) {
		if (!_this.styleIndex[key]) _this.styleIndex[key] = {};
		_this.styleIndex[key][selector] = styleBody;
	};
};