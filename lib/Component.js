'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Token = require('./Token');

var _Tag = require('./Tag');

var _Compiler = require('./Compiler');

var _PreCompiler = require('./PreCompiler');

var _StyleSheet = require('./StyleSheet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
	function Component(Store, styles) {
		_classCallCheck(this, Component);

		this.token = new _Token.Token();
		this.tag = new _Tag.Tag(this.token.key);
		this.stylesheet = new _StyleSheet.StyleSheet();

		this.Store = Store;
		this.Store.registerTag(this.token.key, this.tag);
		if (styles) this.setStyles(styles);
	}

	_createClass(Component, [{
		key: 'setStyles',
		value: function setStyles(obj) {
			this.stylesheet.set(obj);

			var preCompiler = new _PreCompiler.PreCompiler(this.Store, this);
			var compiler = new _Compiler.Compiler(this.Store);
			preCompiler.parse(this.stylesheet.get(), this.token.key);

			var renderStack = this.Store.getRenderStack();
			var styleIndex = this.Store.getStyleIndex();

			for (var item in renderStack) {
				var result = compiler.parse(styleIndex[item], item);
				this.Store.updateTag(item, result);
			}

			this.Store.emptyRenderStack();
		}
	}, {
		key: 'set',
		value: function set(obj) {
			this.setStyles(obj);
		}
	}, {
		key: 'getStyleTag',
		value: function getStyleTag() {
			return this.tag.getTag();
		}
	}, {
		key: 'scope',
		value: function scope() {
			return '.' + this.token.key + ' ';
		}
	}, {
		key: 'className',
		value: function className() {
			return this.token.key;
		}
	}]);

	return Component;
}();