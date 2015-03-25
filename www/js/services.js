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

                if(eventos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'eventos', {responseType: 'json'})
                        .success(function(data) {
                            eventos             = data.eventos;
                            segEventos          = data.segmentos;
                            $scope.segEventos   = segEventos;
                            $scope.allEventos   = eventos.concat();
                            $scope.eventos      = eventos.concat();

                            if(eventos.length > 15) {
                                $scope.eventos.splice(LOAD_INICIAL, eventos.length);
                            }

                            $scope.load     = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segEventos   = segEventos;
                $scope.eventos      = eventos;
            },
            getFornecedores: function($scope) {

                if(fornecedores.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'fornecedores', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            fornecedores            = data.fornecedores;
                            segFor                  = data.segmentos;
                            $scope.segFor           = segFor;
                            $scope.allFornecedores  = fornecedores.concat();
                            $scope.fornecedores     = fornecedores.concat();
                            if(fornecedores.length > 15) {
                                $scope.fornecedores.splice(LOAD_INICIAL, fornecedores.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segFor       = segFor;
                $scope.fornecedores = fornecedores;
            },
            getPavilhoes: function($scope) {

                if(pavilhoes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'locais', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            pavilhoes           = data.locais;
                            segPav              = data.segmentos;
                            $scope.segPav       = segPav;
                            $scope.allPavilhoes = pavilhoes.concat();
                            $scope.pavilhoes    = pavilhoes.concat();

                            if(pavilhoes.length > 15) {
                                $scope.pavilhoes.splice(LOAD_INICIAL, pavilhoes.length);
                            }

                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segPav    = segPav;
                $scope.pavilhoes = pavilhoes;
            },
            getProdutos: function($scope) {

                if(produtos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'produtos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            produtos            = data.produtos;
                            segProd             = data.segmentos;
                            $scope.segProd      = segProd;
                            $scope.allProdutos  = produtos.concat();
                            $scope.produtos     = produtos.concat();

                            if(produtos.length > 15) {
                                $scope.produtos.splice(LOAD_INICIAL, produtos.length);
                            }

                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segProd  = segProd;
                $scope.produtos = produtos;
            },
            getNoticias: function($scope) {

                if(noticias.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'noticias', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            noticias            = data.noticias;
                            segNot              = data.segmentos;
                            $scope.segNot       = segNot;
                            $scope.allNoticias = noticias.concat();
                            $scope.noticias = noticias.concat();

                            if(noticias.length > 15) {
                                $scope.noticias.splice(LOAD_INICIAL, noticias.length);
                            }

                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segNot   = segNot;
                $scope.noticias = noticias;
            },
            getServicos: function($scope) {

                if(servicos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'servicos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            servicos            = data.servicos;
                            segSer              = data.segmentos;
                            $scope.segSer       = segSer;
                            $scope.allServicos  = servicos.concat();
                            $scope.servicos     = servicos.concat();

                            if(servicos.length) {
                                $scope.servicos.splice(LOAD_INICIAL, servicos.length);
                            }

                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segSer   = segSer;
                $scope.servicos = servicos;
            },
            getEstandes: function($scope) {

                if(estandes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'estandes', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            estandes            = data.estandes;
                            segEst              = data.segmentos;
                            $scope.segEst       = segEst;
                            $scope.allEstandes  = estandes.concat();
                            $scope.estandes     = estandes.concat();

                            if(estandes.length > 15) {
                                $scope.estandes.splice(LOAD_INICIAL, estandes.length);
                            }

                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.segEst   = segEst;
                $scope.estandes = estandes;
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