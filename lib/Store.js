"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function Store() {
	var _this = this;

	_classCallCheck(this, Store);

	this.styles = {};
	this.tags = {};
	this.mixins = {};
	this.variables = {};
	this.events = {};
	this.tokenIndex = {};
	this.styleIndex = {};
	this.renderStack = {};

	this.setTag = function (id, tag) {
		_this.tags[id] = tag;
	};
	this.updateTag = function (id, content) {
		_this.tags[id].update(content);
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
};