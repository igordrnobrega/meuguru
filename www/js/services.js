angular.module('meuguru.services', [])

.factory('MeuGuruService', ['$http', '$log', '$resource',
    function($http, $log, $resource) {
        var LOAD_INICIAL = 15;

        var eventos         = [],
            fornecedores    = [],
            pavilhoes       = [],
            produtos        = [];
        var url = "http://prod.igor-teste.61bits.com.br/";
        return {
            getEventos: function($scope) {

                if(eventos.length == 0) {
                    $http.get(url + 'eventos', {responseType: 'json'})
                        .success(function(data) {
                            eventos = data;
                            $scope.allEventos = data;
                            $scope.eventos = data.splice(0,LOAD_INICIAL);
                            for (var i = $scope.eventos.length - 1; i >= 0; i--) {
                                $scope.allEventos.unshift($scope.eventos[i]);
                            };
                            $scope.load = false;
                            $scope.moredata = false;
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.eventos = eventos;
            },
            getFornecedores: function($scope) {

                if(fornecedores.length == 0) {
                    $http.get(url + 'fornecedores', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            fornecedores = data;
                            $scope.allFornecedores = data;
                            $scope.fornecedores = data.splice(0,LOAD_INICIAL);
                            for (var i = $scope.fornecedores.length - 1; i >= 0; i--) {
                                $scope.allFornecedores.unshift($scope.fornecedores[i]);
                            };
                            $scope.load = false;
                            $scope.moredata = false;
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.fornecedores = fornecedores;
            },
            getPavilhoes: function($scope) {

                if(pavilhoes.length == 0) {
                    $http.get(url + 'locais', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            pavilhoes = data;
                            $scope.allPavilhoes = data;
                            $scope.pavilhoes = data.splice(0,15);
                            for (var i = $scope.pavilhoes.length - 1; i >= 0; i--) {
                                $scope.allPavilhoes.unshift($scope.pavilhoes[i]);
                            };
                            $scope.load = false;
                            $scope.moredata = false;
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.pavilhoes = pavilhoes;
            },
            getProdutos: function($scope) {

                if(produtos.length == 0) {
                    $http.get(url + 'produtos', {responseType: 'json'})
                        .success(function(data, status, headers, config) {
                            produtos = data;
                            $scope.allProdutos = data;
                            $scope.produtos = data.splice(0,15);
                            for (var i = $scope.produtos.length - 1; i >= 0; i--) {
                                $scope.allProdutos.unshift($scope.produtos[i]);
                            };
                            $scope.load = false;
                            $scope.moredata = false;
                            return;
                        })
                        .error(function() {

                        })
                }
                $scope.produtos = produtos;
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