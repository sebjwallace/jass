'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PreCompiler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Style = require('./Style');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreCompiler = exports.PreCompiler = function () {
	function PreCompiler(Store, component) {
		_classCallCheck(this, PreCompiler);

		this.Store = Store;
		this.component = component;
	}

	_createClass(PreCompiler, [{
		key: 'parse',
		value: function parse(obj, key) {
			var _this = this;

			var level = 0;
			var activeStyle = {};
			var selector = null;

			var extract = function extract(obj) {
				level++;

				for (var prop in obj) {

					if (level == 1) {
						selector = prop;
						_this.Store.styles[selector] = new _Style.Style(key, selector, obj[selector]);
						activeStyle = _this.Store.styles[selector];
						if (!_this.Store.tokenIndex[key]) _this.Store.tokenIndex[key] = {};
						_this.Store.tokenIndex[key][activeStyle.selector] = activeStyle;
						if (!_this.Store.styleIndex[key]) _this.Store.styleIndex[key] = {};
						_this.Store.styleIndex[key][activeStyle.selector] = activeStyle.body;
					}

					if (prop.match(/^\@extend($|[0-9])/)) {
						var parent = _this.Store.styles[obj[prop]];
						if (!parent) console.log('\'' + obj[prop] + '\' cannot be extended because it does not exist!');else {
							activeStyle.parents[obj[prop]] = obj[prop];
							parent.children['.' + activeStyle.token + '&' + activeStyle.selector] = true;
							_this.Store.renderStack[parent.token] = parent.token;
						}
					} else if (prop.match(/^\$[a-z,A-Z]+$/)) {
						_this.Store.variables[prop] = obj[prop];
					} else if (prop.match(/^\@mixin\s+[^]+$/) && typeof obj[prop] === 'function') {
						_this.Store.mixins[prop.replace(/^\@mixin\s/, '')] = obj[prop];
					} else if (prop.match(/^\@event\s+[^]+$/)) {
						var event = prop.replace(/^\@event\s+/, '');
						_this.Store.events[event] = { component: _this.component, selector: selector, styles: obj[prop] };
					}

					if (_typeof(obj[prop]) === 'object') {
						extract(obj[prop]);
					}
				}
				level--;
			};
			extract(obj);
			this.Store.renderStack[key] = key;
			//console.log(this);
		}
	}]);

	return PreCompiler;
}();