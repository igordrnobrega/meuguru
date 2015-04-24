angular.module('meuguru.directives', [])

.directive('ios', ['$ionicPlatform',
 function ($ionicPlatform) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $ionicPlatform.ready(function () {
                    if (window.cordova && window.cordova.plugins) {
                        if (device.platform == "iOS") {
                            $element.addClass('ios');
                        }
                    }
                });
            }
        }
 }
])

.directive('loading', [
 function () {
        return {
            restrict: 'E',
            scope: {
                text: '=text',
                id: '=id'
            },
            templateUrl: 'template/modal/loading.html'
        }
 }
])