"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = exports.Style = function Style(token, selector, body) {
	_classCallCheck(this, Style);

	this.token = token;
	this.selector = selector;
	this.body = body;
	this.parents = {};
	this.children = {};
};