/**
 * {@link http://github.com/solarfield/lightship-js}
 * {@license https://github.com/solarfield/lightship-js/blob/master/LICENSE}
 */

define(
	[
		'solarfield/ok-kit-js/src/Solarfield/Ok/StringUtils',
		'solarfield/ok-kit-js/src/Solarfield/Ok/StructUtils'
	],
	function (StringUtils, StructUtils) {
		"use strict";
		
		var InputUtils = function () {
			throw new Error("Class is abstract.");
		};
		
		/**
		 * Normalizes a tree-like structure into something that Url::serializeQuery() will accept.
		 * Changes camelCase keys to dash-case.
		 * Items with keys ending in .<int> or [], will have the suffix removed, and will be merged into an array.
		 * @param {Object} aObject Structure.
		 * @param {string=} aPrefix A string to prepend to all keys. e.g. 'foo' becomes 'prefix.foo'
		 * @returns {Object}
		 */
		InputUtils.objectToQuery = function (aObject, aPrefix) {
			var query = {};
			var prefix = aPrefix != null ? StringUtils.camelToDash(aPrefix) : '';
			var separator = '.';
			var object, k, kk;
			
			if (aObject) {
				object = StructUtils.flatten(aObject, separator);
				
				for (k in object) {
					kk = k.split(/\./)
						.map(function (v) {return StringUtils.camelToDash(v).toLowerCase()})
						.join('.')
						.replace(/\.(\[]|\d+)$/, '');
					
					if (prefix != '') kk = prefix + separator + kk;
					
					StructUtils.pushSet(query, kk, object[k]);
				}
			}
			
			return query;
		};
		
		return InputUtils;
	}
);