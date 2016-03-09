"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleSheet = exports.StyleSheet = function () {
	function StyleSheet() {
		_classCallCheck(this, StyleSheet);

		this.styles = null;
	}

	_createClass(StyleSheet, [{
		key: "set",
		value: function set(obj) {
			if (!this.styles) this.styles = obj;else {
				for (var selector in obj) {
					if (!this.styles[selector]) this.styles[selector] = obj[selector];else for (var attr in obj[selector]) {
						var existing = this.styles[selector][attr];
						var override = obj[selector][attr];
						if (Array.isArray(override)) {
							if (override[0] == existing) this.styles[selector][attr] = override[1];else this.styles[selector][attr] = override[0];
						} else {
							this.styles[selector][attr] = override;
						}
					}
				}
			}
		}
	}, {
		key: "get",
		value: function get() {
			return this.styles;
		}
	}]);

	return StyleSheet;
}();