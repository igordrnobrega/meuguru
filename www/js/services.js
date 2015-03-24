angular.module('meuguru.services', [])

.factory('MeuGuruService', ['$http', '$log', 'LoadingService',
    function($http, $log, LoadingService) {

        var LOAD_INICIAL    = 15,
            eventos         = [],
            fornecedores    = [],
            pavilhoes       = [],
            produtos        = [],
            noticias        = [],
            servicos        = [],
            estandes        = [],
            url = "http://prod.igor-teste.61bits.com.br/";

        return {
            getEventos: function($scope) {

                if(eventos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'eventos', {responseType: 'json'})
                        .success(function(data) {
                            eventos = data;
                            $scope.allEventos = data.concat();
                            $scope.eventos = data.concat();
                            if(data.length > 15) {
                                $scope.eventos.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.eventos = eventos;
            },
            getFornecedores: function($scope) {

                if(fornecedores.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'fornecedores', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            fornecedores = data;
                            $scope.allFornecedores = data.concat();
                            $scope.fornecedores = data.concat();
                            if(data.length > 15) {
                                $scope.fornecedores.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.fornecedores = fornecedores;
            },
            getPavilhoes: function($scope) {

                if(pavilhoes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'locais', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            pavilhoes = data;
                            $scope.allPavilhoes = data.concat();
                            $scope.pavilhoes = data.concat();
                            if(data.length > 15) {
                                $scope.pavilhoes.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.pavilhoes = pavilhoes;
            },
            getProdutos: function($scope) {

                if(produtos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'produtos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            produtos = data;
                            $scope.allProdutos = data.concat();
                            $scope.produtos = data.concat();
                            if(data.length > 15) {
                                $scope.produtos.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.produtos = produtos;
            },
            getNoticias: function($scope) {

                if(noticias.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'noticias', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            noticias = data;
                            $scope.allNoticias = data.concat();
                            $scope.noticias = data.concat();
                            if(data.length > 15) {
                                $scope.noticias.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.noticias = noticias;
            },
            getServicos: function($scope) {

                if(servicos.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'servicos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            servicos = data;
                            $scope.allServicos = data.concat();
                            $scope.servicos = data.concat();
                            if(data.length) {
                                $scope.servicos.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.servicos = servicos;
            },
            getEstandes: function($scope) {

                if(estandes.length == 0) {
                    LoadingService.load();
                    $http.get(url + 'estandes', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            estandes = data;
                            $scope.allEstandes = data.concat();
                            $scope.estandes = data.concat();
                            if(data.length > 15) {
                                $scope.estandes.splice(LOAD_INICIAL, data.length);
                            }
                            $scope.load = false;
                            $scope.moredata = false;
                            LoadingService.endLoad();
                            return;
                        })
                        .error(function() {

                        })
                }
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
                $timeout(function() {
                    $ionicLoading.hide();
                }, 100000);
            },
            endLoad: function() {
                $ionicLoading.hide();
            }
        }
    }
])