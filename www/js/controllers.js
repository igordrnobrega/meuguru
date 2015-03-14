angular.module('meuguru.controllers', [])

.controller('IndexCtrl', ['$timeout', '$rootScope', '$ionicPlatform', '$ionicPopup',
    function($timeout, $rootScope, $ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "Não possui conexão com Internet."
                    })
                    .then(function(result) {
                        ionic.Platform.exitApp();
                    });
                }
            }
        });

        if(window.plugins && window.plugins.AdMob) {
            $timeout(function() {
                $rootScope.ios = device.platform == "Android" ? false : true;
                //Fazer o reconhecimento pra Android, IOS e Windows
                var admob_key = device.platform == "Android" ? "ca-app-pub-5683228122499508/2527360279" : "IOS_PUBLISHER_KEY";
                var admob = window.plugins.AdMob;
                admob.createBannerView(
                {
                    'publisherId': admob_key,
                    'adSize': admob.AD_SIZE.BANNER,
                    'bannerAtTop': false
                },
                function() {
                    admob.requestAd(
                        { 'isTesting': true },
                        function() {
                            admob.showAd(true);
                        },
                        function() { console.log('failed to request ad'); }
                    );
                },
                function() { console.log('failed to create banner view'); }
                );
            }, 2000);
        }
    }
])

.controller('TabsCtrl', ['$scope','$location','$timeout','$ionicPopup','$ionicSideMenuDelegate',
    function($scope, $location, $timeout, $ionicPopup, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.addFavorite = function(route, id) {
            var favoritePopUp = $ionicPopup.show({
                title: route,
                template: '<p style="text-align: center ">Adicionado aos favoritos.</p>',
            });
            $timeout(function() {
                favoritePopUp.close();
            }, 1500);
        };
    }
])

.controller('AgendaCtrl', ['$scope', '$ionicPopup', '$timeout' ,'MeuGuruService', 'GeoReverseLocationService', 'LoadingService',
        function($scope, $ionicPopup, $timeout, MeuGuruService, GeoReverseLocationService, LoadingService) {
            $scope.load = true;
            $scope.moredata = true;
            $scope.GeoReverseLocationService = GeoReverseLocationService;
            var currentStart = 15;
            MeuGuruService.getEventos($scope);

            $scope.filtro = {}
            $scope.showPopup = function() {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-evento.html',
                    title: 'Filtrar Eventos',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function(e) {
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function() {
                if($scope.eventos.length !== $scope.allEventos.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.eventos.push($scope.allEventos[i]);
                    };
                    currentStart+=15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            $scope.getUserPostion = function() {
                LoadingService.load('geo');
                var posOptions = {timeout: 10000, enableHighAccuracy: true};
                navigator.geolocation.getCurrentPosition(_success, _error, posOptions);
            }

            var _success = function(pos) {
                var coords = pos.coords;
                var img = "https://maps.googleapis.com/maps/api/staticmap?center=" + coords.latitude + "," + coords.longitude + "&zoom=13&size=300x300&sensor=false";
                LoadingService.endLoad();
                var successPopUp = $ionicPopup.show({
                    title: 'Localizado',
                    template: '<img src="' + img + '" />',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancelar'
                        },
                        {
                            text: 'Filtrar eventos próximos',
                            type: 'button-positive',
                            onTap: function(e) {
                                var GeoReverseLocationService = new $scope.GeoReverseLocationService({
                                    latitude: coords.latitude,
                                    longitude: coords.longitude
                                });

                                GeoReverseLocationService.$get()
                                    .then(function(response) {
                                        var places = response.results,
                                            estado = false;

                                        for (var i = places.length - 1; i >= 0; i--) {
                                            var adresses = places[i]['address_components'];
                                            for (var j = adresses.length - 1; j >= 0; j--) {
                                                if(
                                                    adresses[j]['short_name'].length == 2 &&
                                                    adresses[j]['short_name'] != 'BR'
                                                ) {
                                                    estado = adresses[j]['short_name'];
                                                    break;
                                                }
                                            };
                                            if(estado) {
                                                break;
                                            }
                                        };
                                        $scope.filtro.estado = estado;
                                    });

                                return $scope.filtro.sqEstado;
                            }
                        }
                    ]
                });
            }

            var _error = function() {
                LoadingService.endLoad();
                var errorPopUp = $ionicPopup.show({
                    title: 'Error',
                    template: '<p style="text-align: center ">Não foi possível localizá-lo.</p>',
                });
                $timeout(function() {
                    errorPopUp.close();
                }, 1500);
            }
        }
])
.controller('EventoCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function($scope, $stateParams, MeuGuruService) {
        var id = $stateParams.eventoId;
        MeuGuruService.getEventos($scope);

        $scope.$watch('eventos', function() {
            for (var i = $scope.eventos.length - 1; i >= 0; i--) {
                if($scope.eventos[i]['ID'] == id) {
                    $scope.evento = $scope.eventos[i];
                }
            };
        });
    }
])

.controller('FornecedoresCtrl', ['$scope', '$ionicPopup', 'MeuGuruService',
        function($scope, $ionicPopup, MeuGuruService) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getFornecedores($scope);

            $scope.filtro = {}
            $scope.showPopup = function() {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-fornecedor.html',
                    title: 'Filtrar Fornecedor',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function(e) {
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function() {
                if($scope.fornecedores.length !== $scope.allFornecedores.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.fornecedores.push($scope.allFornecedores[i]);
                    };
                    currentStart+=15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
.controller('FornecedorCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function($scope, $stateParams, MeuGuruService) {
        var id = $stateParams.fornecedorId;
        MeuGuruService.getFornecedores($scope);

        $scope.$watch('fornecedores', function() {
            for (var i = $scope.fornecedores.length - 1; i >= 0; i--) {
                if($scope.fornecedores[i]['ID'] == id) {
                    $scope.fornecedor = $scope.fornecedores[i];
                }
            };
        });
    }
])

.controller('PavilhoesCtrl', ['$scope', '$ionicPopup', 'MeuGuruService',
        function($scope, $ionicPopup, MeuGuruService) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getPavilhoes($scope);

            $scope.filtro = {}
            $scope.showPopup = function() {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-pavilhao.html',
                    title: 'Filtrar Pavilhões',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function(e) {
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function() {
                if($scope.pavilhoes.length !== $scope.allPavilhoes.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        console.log($scope.allPavilhoes[i]);
                        $scope.pavilhoes.push($scope.allPavilhoes[i]);
                    };
                    currentStart+=15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
.controller('PavilhaoCtrl',  ['$scope', '$stateParams', 'MeuGuruService',
    function($scope, $stateParams, MeuGuruService) {
        var id = $stateParams.pavilhaoId;
        MeuGuruService.getPavilhoes($scope);

        $scope.$watch('pavilhoes', function() {
            for (var i = $scope.pavilhoes.length - 1; i >= 0; i--) {
                if($scope.pavilhoes[i]['ID'] == id) {
                    $scope.pavilhao = $scope.pavilhoes[i];
                }
            };
        });
    }
])

.controller('ProdutosCtrl', ['$scope', '$ionicPopup', 'MeuGuruService',
        function($scope, $ionicPopup, MeuGuruService) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getProdutos($scope);

            $scope.filtro = {}
            $scope.showPopup = function() {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-produto.html',
                    title: 'Filtrar Produtos',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function(e) {
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function() {
                if($scope.produtos.length !== $scope.allProdutos.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.produtos.push($scope.allProdutos[i]);
                    };
                    currentStart+=15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
.controller('ProdutoCtrl',  ['$scope', '$stateParams', 'MeuGuruService',
    function($scope, $stateParams, MeuGuruService) {
        var id = $stateParams.produtoId;
        MeuGuruService.getProdutos($scope);

        $scope.$watch('produtos', function() {
            for (var i = $scope.produtos.length - 1; i >= 0; i--) {
                if($scope.produtos[i]['ID'] == id) {
                    $scope.produto = $scope.produtos[i];
                }
            };
        });
    }
])

.controller('ContatoCtrl',  ['$scope',
    function($scope) {
        $scope.imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=-23.307688,-51.178091&zoom=17&size=300x300&sensor=false&markers=color:red%7Clabel:Aqui%7C-23.307688,-51.178091';

        $scope.openMaps = function() {
            launchnavigator.navigate(
              [-23.307688, -51.178091]);
        };

    }
])