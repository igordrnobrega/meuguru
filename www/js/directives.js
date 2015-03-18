angular.module('meuguru.directives', [])

.directive('ios', ['$ionicPlatform',
	function ($ionicPlatform) {
		return {
			restrict: 'A',
			link: function ($scope, $element, $attrs) {
				$ionicPlatform.ready(function() {
					if(window.plugin) {
						if(device.platform == "iOS") {
							$element.addClass('ios');
						}
					}
				});
			}
		}
	}
])
