'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tag = exports.Tag = function () {
	function Tag(id) {
		_classCallCheck(this, Tag);

		this.tag = this.generateTag('rss-' + id);
	}

	_createClass(Tag, [{
		key: 'generateTag',
		value: function generateTag(id) {
			var el = document.createElement('style');
			el.id = id;
			var container = document.getElementById('rss-container');
			container.appendChild(el);
			return el;
		}
	}, {
		key: 'getTag',
		value: function getTag() {
			return this.tag;
		}
	}, {
		key: 'update',
		value: function update(stringified) {
			this.tag.innerHTML = stringified;
		}
	}]);

	return Tag;
}();