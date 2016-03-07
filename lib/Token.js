"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function () {
	function Token() {
		_classCallCheck(this, Token);

		this.key = this.generateKey(4);
		this.current = false;
	}

	_createClass(Token, [{
		key: "generateKey",
		value: function generateKey(length) {
			var key = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			for (var i = 0; i < length; i++) {
				key += possible.charAt(Math.floor(Math.random() * possible.length));
			}return key;
		}
	}]);

	return Token;
}();