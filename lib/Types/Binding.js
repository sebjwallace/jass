'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binding = exports.Binding = function () {
	function Binding(selector, key, name, fn) {
		_classCallCheck(this, Binding);

		this.el = null;
		if (selector == 'BASE') {
			this.el = document.getElementByClassName(key)[0];
		} else {
			this.el = document.getElementById(selector.replace('#', ''));
		}

		this.domEvent = name.replace(/^\@bind\s+/, '');
		this.createEvent(fn);
	}

	_createClass(Binding, [{
		key: 'createEvent',
		value: function createEvent(fn) {
			var _this = this;

			if (typeof fn == 'string') {
				(function () {
					var eventId = fn.replace(/^\@event\s+/, '');
					_this.fn = function () {
						RSS.Event(eventId);
					};
				})();
			} else this.fn = fn;
			this.el[this.domEvent] = this.fn;
		}
	}], [{
		key: 'isBinding',
		value: function isBinding(check) {
			if (check.match(/^\@bind\s+[^]+$/)) return true;else return false;
		}
	}]);

	return Binding;
}();