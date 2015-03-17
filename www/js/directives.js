angular.module('meuguru.directives', [])

.directive('ios', ['$ionicPlatform',
	function ($ionicPlatform) {
		return {
			restrict: 'A',
			link: function ($scope, $element, $attrs) {
				if(window.plugin) {
					$ionicPlatform.ready(function() {
						if(device.platform == "iOS") {
							$element.addClass('ios');
						}
					});
				}
			}
		}
	}
])
