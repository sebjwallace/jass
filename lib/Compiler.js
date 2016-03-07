'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = exports.Compiler = function () {
	function Compiler(Store) {
		_classCallCheck(this, Compiler);

		this.Store = Store;
	}

	_createClass(Compiler, [{
		key: 'isMediaQuery',
		value: function isMediaQuery(check) {
			return check.match(/\@media/);
		}
	}, {
		key: 'isExtend',
		value: function isExtend(check) {
			return check.match(/^\@extend($|[0-9])/);
		}
	}, {
		key: 'isVariable',
		value: function isVariable(check) {
			if (typeof check != 'string') return false;
			return check.match(/^\$[a-z,A-Z]+$/);
		}
	}, {
		key: 'isMixin',
		value: function isMixin(check) {
			return check.match(/^\@mixin\s/);
		}
	}, {
		key: 'isNesting',
		value: function isNesting(check) {
			return check.match(/^\>[^]/);
		}
	}, {
		key: 'isGrouping',
		value: function isGrouping(check) {
			return check.match(/^\#\s[a-z,A-Z]+$/);
		}
	}, {
		key: 'generateSelector',
		value: function generateSelector(selector, scope) {
			var children = '';
			var check = selector.match(/^[^\s]+/)[0];
			var postfixes = selector.replace(/^[^\s]+/, '');
			if (this.Store.styles[check]) for (var child in this.Store.styles[check].children) {
				children += child.replace('&', ' ') + ' ' + postfixes + ', ';
			}
			return (children + ' ' + '.' + scope + ' ' + selector).replace(/\s+\:/, ':').replace('BASE', '');
		}
	}, {
		key: 'generateValue',
		value: function generateValue(value) {
			if (this.isVariable(value)) return this.Store.variables[value];else return value;
		}
	}, {
		key: 'parse',
		value: function parse(obj, scope) {
			var _this = this;

			var parentID = '';
			var parentOBJ = {};
			var groupingID = '';

			var stack = [];
			var sum = "";
			var level = 0;

			var stitch = function stitch(obj) {

				level++;

				for (var props in obj) {

					if (_this.isVariable(props)) continue;

					if (level == 1 && !_this.isMediaQuery(props)) {
						parentID = props;
						parentOBJ = obj[props];
					}

					if (_this.isMixin(props)) {
						var mixin = _this.Store.mixins[props.replace('@mixin ', '')];
						if (typeof obj[props] == 'string') stitch(mixin(obj[props]));else if (Array.isArray(obj[props])) stitch(mixin.apply(_this, obj[props]));else continue;
					} else if (_this.isGrouping(props)) {
						groupingID = props.replace('# ', '') + '-';
						stitch(obj[props]);
						groupingID = '';
					} else if (_this.isNesting(props)) {
						var item = _defineProperty({}, parentID + " " + props.replace('> ', ''), obj[props]);
						stack.push(item);
					} else if (_this.isExtend(props)) continue;else {
						if (_typeof(obj[props]) === 'object') {
							if (_this.isMediaQuery(props)) sum += props;else sum += _this.generateSelector(props, scope);
							sum += "{";
							stitch(obj[props]);
							sum += "}";
						} else {
							sum += groupingID + props;
							sum += ":" + _this.generateValue(obj[props]) + ";";
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
		}
	}]);

	return Compiler;
}();