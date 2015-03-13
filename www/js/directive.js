angular.module('meuguru.directives', [])

.directive('centerRow', ['$window',
	function ($window) {
		return {
			restrict: 'A',
			link: function ($scope, $element, $attrs) {
				var window = angular.element(window);
				console.log(window.css);
				// $element.css('height', .height());
			}
		}
	}
])