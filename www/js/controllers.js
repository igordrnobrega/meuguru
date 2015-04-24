var rollPageTop = function () {
    window.scrollTo(0, 0);
};

angular.module('meuguru.controllers', [])

.controller('IndexCtrl', ['$scope', 'MeuGuruService',
    function ($scope, MeuGuruService) {
        var favoritos = [
            {
                'id_post': '44029',
                'tx_type': 'Fornecedor'
            },
            {
                'id_post': '51934',
                'tx_type': 'Evento'
            }
        ];

    }
])

.controller('TabsCtrl', ['$scope', '$location', '$timeout', '$ionicPopup', '$ionicSideMenuDelegate', '$cordovaSQLite', 'FavoritosService',
    function ($scope, $location, $timeout, $ionicPopup, $ionicSideMenuDelegate, $cordovaSQLite, FavoritosService) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.addFavorite = function (route, id) {
            FavoritosService.setFavorito(route, id);
        };

        $scope.rmFavorite = function (route, id) {
            FavoritosService.rmFavorito(route, id);
        };
    }
])

.controller('AgendaCtrl', ['$scope', '$ionicPopup', '$timeout', 'MeuGuruService', 'GeoReverseLocationService', 'LoadingService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, $timeout, MeuGuruService, GeoReverseLocationService, LoadingService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            $scope.GeoReverseLocationService = GeoReverseLocationService;
            var currentStart = 15;
            MeuGuruService.getEventos($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {
                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-evento.html',
                    title: 'Filtrar Eventos',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.eventos.length > 15) {
                                    $scope.eventos.splice(15, $scope.eventos.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {};
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.eventos.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.eventos.length !== $scope.allEventos.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.eventos.push($scope.allEventos[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            $scope.getUserPostion = function () {
                LoadingService.load('geo');
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: true
                };
                navigator.geolocation.getCurrentPosition(_success, _error, posOptions);
            }

            var _success = function (pos, b, c, d, e) {
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
                            onTap: function (e) {
                                var GeoReverseLocationService = new $scope.GeoReverseLocationService({
                                    latitude: coords.latitude,
                                    longitude: coords.longitude
                                });

                                GeoReverseLocationService.$get()
                                    .then(function (response) {
                                        var places = response.results,
                                            estado = false;

                                        for (var i = places.length - 1; i >= 0; i--) {
                                            var adresses = places[i]['address_components'];
                                            for (var j = adresses.length - 1; j >= 0; j--) {
                                                if (
                                                    adresses[j]['short_name'].length == 2 &&
                                                    adresses[j]['short_name'] != 'BR'
                                                ) {
                                                    estado = adresses[j]['short_name'];
                                                    break;
                                                }
                                            };
                                            if (estado) {
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

            var _error = function () {
                LoadingService.endLoad();
                var errorPopUp = $ionicPopup.show({
                    title: 'Erro',
                    template: '<p style="text-align: center ">Não foi possível localizá-lo.</p>',
                });
                $timeout(function () {
                    errorPopUp.close();
                }, 1500);
            }
        }
])
    .controller('EventoCtrl', ['$scope', '$rootScope', '$stateParams', 'MeuGuruService',
    function ($scope, $rootScope, $stateParams, MeuGuruService) {
            var id = $stateParams.eventoId;
            MeuGuruService.getEventos($scope);


            $scope.$watch('allEventos', function () {
                for (var i = $scope.allEventos.length - 1; i >= 0; i--) {
                    if ($scope.allEventos[i]['ID'] == id) {
                        $scope.evento = $scope.allEventos[i];
                    }
                };
            });
    }
])

.controller('FornecedoresCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getFornecedores($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-fornecedor.html',
                    title: 'Filtrar Fornecedor',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.fornecedores.length > 15) {
                                    $scope.fornecedores.splice(15, $scope.fornecedores.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.fornecedores.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.fornecedores.length !== $scope.allFornecedores.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.fornecedores.push($scope.allFornecedores[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('FornecedorCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.fornecedorId;
            MeuGuruService.getFornecedores($scope);

            $scope.$watch('allFornecedores', function () {
                for (var i = $scope.allFornecedores.length - 1; i >= 0; i--) {
                    if ($scope.allFornecedores[i]['ID'] == id) {
                        $scope.fornecedor = $scope.allFornecedores[i];
                    }
                };
            });
    }
])

.controller('PavilhoesCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getPavilhoes($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-pavilhao.html',
                    title: 'Filtrar Pavilhões',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.pavilhoes.length > 15) {
                                    $scope.pavilhoes.splice(15, $scope.pavilhoes.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.pavilhoes.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.pavilhoes.length !== $scope.allPavilhoes.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.pavilhoes.push($scope.allPavilhoes[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('PavilhaoCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.pavilhaoId;
            MeuGuruService.getPavilhoes($scope);

            $scope.$watch('allPavilhoes', function () {
                for (var i = $scope.allPavilhoes.length - 1; i >= 0; i--) {
                    if ($scope.allPavilhoes[i]['ID'] == id) {
                        $scope.pavilhao = $scope.allPavilhoes[i];
                    }
                };
            });
    }
])

.controller('ProdutosCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getProdutos($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-produto.html',
                    title: 'Filtrar Produtos',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.produtos.length > 15) {
                                    $scope.produtos.splice(15, $scope.produtos.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.produtos.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.produtos.length !== $scope.allProdutos.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.produtos.push($scope.allProdutos[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('ProdutoCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.produtoId;
            MeuGuruService.getProdutos($scope);

            $scope.$watch('allProdutos', function () {
                for (var i = $scope.allProdutos.length - 1; i >= 0; i--) {
                    if ($scope.allProdutos[i]['ID'] == id) {
                        $scope.produto = $scope.allProdutos[i];
                    }
                };
            });
    }
])

.controller('ServicosCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getServicos($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-servico.html',
                    title: 'Filtrar Serviços',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.servicos.length > 15) {
                                    $scope.servicos.splice(15, $scope.servicos.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.servicos.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.servicos.length !== $scope.allServicos.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.servicos.push($scope.allServicos[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('ServicoCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.servicoId;
            MeuGuruService.getServicos($scope);

            $scope.$watch('allServicos', function () {
                for (var i = $scope.allServicos.length - 1; i >= 0; i--) {
                    if ($scope.allServicos[i]['ID'] == id) {
                        $scope.servico = $scope.allServicos[i];
                    }
                };
            });
    }
])

.controller('NoticiasCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getNoticias($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-noticia.html',
                    title: 'Filtrar Notícias',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.noticias.length > 15) {
                                    $scope.noticias.splice(15, $scope.noticias.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.noticias.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.noticias.length !== $scope.allNoticias.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.noticias.push($scope.allNoticias[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('NoticiaCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.noticiaId;
            MeuGuruService.getNoticias($scope);

            $scope.$watch('allNoticias', function () {
                for (var i = $scope.allNoticias.length - 1; i >= 0; i--) {
                    if ($scope.allNoticias[i]['ID'] == id) {
                        $scope.noticia = $scope.allNoticias[i];
                    }
                };
            });
    }
])

.controller('EstandesCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
            $scope.load = true;
            $scope.moredata = true;
            var currentStart = 15;
            MeuGuruService.getEstandes($scope);

            $scope.filtro = {}
            $scope.showPopup = function () {

                var myPopup = $ionicPopup.show({
                    templateUrl: 'template/modal/filtro-estande.html',
                    title: 'Filtrar Estandes',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Limpar filtros',
                            onTap: function (e) {
                                if ($scope.estandes.length > 15) {
                                    $scope.estandes.splice(15, $scope.estandes.length);
                                }

                                $scope.moredata = false;
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro = {}
                            }
                        },
                        {
                            text: '<b>Aplicar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.moredata = false;
                                if ($scope.estandes.length > 15) {
                                    $scope.moredata = true;
                                }
                                $ionicScrollDelegate.scrollTop();
                                return $scope.filtro;
                            }
                        }
                    ]
                });
            };

            $scope.loadMore = function () {
                if ($scope.estandes.length !== $scope.allEstandes.length) {
                    for (var i = currentStart; i < currentStart + 15; i++) {
                        $scope.estandes.push($scope.allEstandes[i]);
                    };
                    currentStart += 15;
                } else {
                    $scope.moredata = true;
                }
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }
])
    .controller('EstandeCtrl', ['$scope', '$stateParams', 'MeuGuruService',
    function ($scope, $stateParams, MeuGuruService) {
            var id = $stateParams.estandeId;
            MeuGuruService.getEstandes($scope);

            $scope.$watch('allEstandes', function () {
                for (var i = $scope.allEstandes.length - 1; i >= 0; i--) {
                    if ($scope.allEstandes[i]['ID'] == id) {
                        $scope.estande = $scope.allEstandes[i];
                    }
                };
            });
    }
])

.controller('FavoritosCtrl', ['$scope', '$ionicPopup', 'MeuGuruService', '$ionicScrollDelegate',
        function ($scope, $ionicPopup, MeuGuruService, $ionicScrollDelegate) {
        $scope.favoritos = [];
        $scope.load = false;

        MeuGuruService.getFavoritos($scope);

        $scope.doRefresh = function () {
            MeuGuruService.getFavoritos($scope);
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.filtro = {}
        $scope.showPopup = function () {

            var myPopup = $ionicPopup.show({
                templateUrl: 'template/modal/filtro-favorito.html',
                title: 'Filtrar Favoritos',
                scope: $scope,
                buttons: [
                    {
                        text: 'Limpar filtros',
                        onTap: function (e) {
                            $ionicScrollDelegate.scrollTop();
                            return $scope.filtro = {}
                        }
                        },
                    {
                        text: '<b>Aplicar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicScrollDelegate.scrollTop();
                            return $scope.filtro;
                        }
                        }
                    ]
            });
        };

        }
])

.controller('ContatoCtrl', ['$scope',
    function ($scope) {
        $scope.imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=-23.307688,-51.178091&zoom=17&size=300x300&sensor=false&markers=color:red%7Clabel:Aqui%7C-23.307688,-51.178091';

        $scope.openMaps = function () {
            launchnavigator.navigate(
              [-23.307688, -51.178091]);
        };

    }
])