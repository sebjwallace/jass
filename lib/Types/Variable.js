'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Variable = exports.Variable = function () {
	function Variable() {
		_classCallCheck(this, Variable);
	}

	_createClass(Variable, null, [{
		key: 'isVariable',
		value: function isVariable(check) {
			if (typeof check != 'string') return false;
			if (check.match(/^\$[a-z,A-Z,-]+$/)) return true;
			return false;
		}
	}, {
		key: 'retrieve',
		value: function retrieve(isString) {
			if (typeof isString != 'string') return false;
			var match = isString.match(/\$[a-z,A-Z,-]+/);
			if (match) return match[0];
		}
	}]);

	return Variable;
}();