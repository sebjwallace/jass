'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PreCompiler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module = require('./Types/Module');

var Types = _interopRequireWildcard(_Module);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
						_this.Store.addStyle(key, selector, obj[selector]);
						activeStyle = _this.Store.getStyle(selector);
						_this.Store.registerToken(key, activeStyle.selector, activeStyle);
						_this.Store.registerStyle(key, activeStyle.selector, activeStyle.body);
					}

					if (Types.Extend.isExtend(prop)) {
						var parent = _this.Store.getStyle(obj[prop]);
						if (parent) {
							activeStyle.addParent(obj[prop]);
							var signature = '.' + activeStyle.token + '&' + activeStyle.selector.replace('BASE', '');
							if (!parent.hasChild(signature)) parent.addChild(signature);
							_this.Store.addToRenderStack(parent.token);
						}
					} else if (Types.Variable.isVariable(prop)) {
						_this.Store.addVariable(prop, obj[prop]);
					} else if (Types.Mixin.isMixin(prop) && typeof obj[prop] === 'function') {
						_this.Store.addMixin(Types.Mixin.format(prop), obj[prop]);
					} else if (Types.Event.isEvent(prop)) {
						var id = Types.Event.format(prop);
						var event = { component: _this.component, selector: selector, styles: obj[prop] };
						_this.Store.addEvent(id, selector, event);
					} else if (Types.Binding.isBinding(prop)) {
						var binding = new Types.Binding(selector, key, prop, obj[prop]);
						_this.Store.addBinding(binding);
					}

					if (_typeof(obj[prop]) === 'object') {
						extract(obj[prop]);
					}
				}
				level--;
			};
			extract(obj);
			this.Store.addToRenderStack(key);
		}
	}]);

	return PreCompiler;
}();