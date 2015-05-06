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

.directive('link', ['$ionicPlatform',
 function ($ionicPlatform) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $ionicPlatform.ready(function () {
                    if (window.cordova && window.cordova.plugins) {
                        $element.on('click', function() {
                            var href = $element.attr('href');
                            if($element.attr('href').indexOf('http://') == -1) {
                                href = 'http://' + $element.attr('href');
                            }
                            window.open(href,'_system', 'location=yes');
                        })
                    }
                });
            }
        }
 }
])