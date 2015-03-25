angular.module('meuguru.services', [])

.factory('MeuGuruService', ['$http', '$log', 'LoadingService',
    function($http, $log, LoadingService) {

        var LOAD_INICIAL    = 15,
            eventos         = [],
            segEventos      = [],
            fornecedores    = [],
            segFor          = [],
            pavilhoes       = [],
            segPav          = [],
            produtos        = [],
            segProd         = [],
            noticias        = [],
            segNot          = [],
            servicos        = [],
            segSer          = [],
            estandes        = [],
            segEst          = [],
            url = "http://prod.igor-teste.61bits.com.br/";

        return {
            getEventos: function($scope) {
                var _prepareView = function() {
                    $scope.segEventos   = segEventos;
                    $scope.allEventos   = eventos.concat();
                    $scope.eventos      = eventos.concat();

                    if(eventos.length > 15) {
                        $scope.eventos.splice(LOAD_INICIAL, eventos.length);
                    }

                    $scope.load     = false;
                    $scope.moredata = false;
                }

                if(eventos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'eventos', {responseType: 'json'})
                        .success(function(data) {
                            eventos             = data.eventos;
                            segEventos          = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                    return;
                }
            },
            getFornecedores: function($scope) {
                var _prepareView = function() {
                    $scope.segFor           = segFor;
                    $scope.allFornecedores  = fornecedores.concat();
                    $scope.fornecedores     = fornecedores.concat();
                    if(fornecedores.length > 15) {
                        $scope.fornecedores.splice(LOAD_INICIAL, fornecedores.length);
                    }
                    $scope.load = false;
                    $scope.moredata = false;
                }

                if(fornecedores.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'fornecedores', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            fornecedores            = data.fornecedores;
                            segFor                  = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            },
            getPavilhoes: function($scope) {
                var _prepareView = function() {
                    $scope.segPav       = segPav;
                    $scope.allPavilhoes = pavilhoes.concat();
                    $scope.pavilhoes    = pavilhoes.concat();

                    if(pavilhoes.length > 15) {
                        $scope.pavilhoes.splice(LOAD_INICIAL, pavilhoes.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                }

                if(pavilhoes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'locais', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            pavilhoes           = data.locais;
                            segPav              = data.segmentos;

                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            },
            getProdutos: function($scope) {
                var _prepareView = function() {
                    $scope.segProd      = segProd;
                    $scope.allProdutos  = produtos.concat();
                    $scope.produtos     = produtos.concat();

                    if(produtos.length > 15) {
                        $scope.produtos.splice(LOAD_INICIAL, produtos.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                }

                if(produtos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'produtos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            produtos            = data.produtos;
                            segProd             = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            },
            getNoticias: function($scope) {
                var _prepareView = function() {
                    $scope.segNot       = segNot;
                    $scope.allNoticias = noticias.concat();
                    $scope.noticias = noticias.concat();

                    if(noticias.length > 15) {
                        $scope.noticias.splice(LOAD_INICIAL, noticias.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                }

                if(noticias.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'noticias', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            noticias            = data.noticias;
                            segNot              = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            },
            getServicos: function($scope) {
                var _prepareView = function() {
                    $scope.segSer       = segSer;
                    $scope.allServicos  = servicos.concat();
                    $scope.servicos     = servicos.concat();

                    if(servicos.length) {
                        $scope.servicos.splice(LOAD_INICIAL, servicos.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                }

                if(servicos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'servicos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            servicos            = data.servicos;
                            segSer              = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            },
            getEstandes: function($scope) {
                var _prepareView = function() {
                    $scope.segEst       = segEst;
                    $scope.allEstandes  = estandes.concat();
                    $scope.estandes     = estandes.concat();

                    if(estandes.length > 15) {
                        $scope.estandes.splice(LOAD_INICIAL, estandes.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                }
                if(estandes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'estandes', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            estandes            = data.estandes;
                            segEst              = data.segmentos;
                            _prepareView();
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {
                            LoadingService.endLoad();
                        })
                } else {
                    _prepareView();
                }
            }
        }

    }
])

.factory('GeoReverseLocationService', [
    '$resource',
    function($resource) {
        return $resource(
            'https://maps.googleapis.com/maps/api/geocode/json?latlng=:latitude,:longitude&key=AIzaSyCkettxz3Y0bngSTQ5hRtx9PVyKd40D1zk',
            {
                latitude : '@latitude',
                longitude : '@longitude'
            }
        );
    }
])

.factory('LoadingService', [
    '$ionicLoading', '$timeout',
    function($ionicLoading, $timeout) {
        return {
            load: function(img){
                var template = '<img src="img/logo-oculos.png" /><img mustache-animation ng-animate="mustache" class="bigode" src="img/logo-bigode.png" /><p>';

                switch(img) {
                    case 'geo':
                        template += 'Localizando';
                        break;

                    default:
                        template += 'Carregando';
                }

                template += '</p>';

                $ionicLoading.show({
                    template: template,
                    hideOnStateChange: true,
                    noBackdrop: false
                });
                // $timeout(function() {
                //     $ionicLoading.hide();
                // }, 100000);
            },
            endLoad: function() {
                $ionicLoading.hide();
            }
        }
    }
])

.factory('FavoritosService', [
    'LoadingService', '$timeout', '$cordovaSQLite', '$ionicPopup',
    function(LoadingService, $timeout, $cordovaSQLite, $ionicPopup) {
        var favoritos = [];

        return {
            getFavoritos: function(){
                var query = "SELECT id_post, tx_type FROM favorito";
                $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {
                        if(favoritos.length != 0){
                            favoritos = [];
                        }
                        for (var i = res.rows.length - 1; i >= 0; i--) {
                            favoritos.push(res.rows.item(i));
                        };
                    }
                }, function (err) {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Não foi possível recuperar os favoritos. Tente novamente mais tarde.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                });

                return favoritos;
            },
            setFavorito: function(route, id) {
                var query = "INSERT INTO favorito (id_post, tx_type) VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [id, route]).then(function(res) {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Adicionado aos favoritos.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                }, function (err) {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Não foi possível adicionar aos favoritos.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                });
            }
        }
    }
])