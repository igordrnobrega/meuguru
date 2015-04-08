angular.module('meuguru.services', [])

.factory('MeuGuruService', ['$http', '$log', '$interval', 'FavoritosService',
    function($http, $log, $interval, FavoritosService) {

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
            posiEst         = [],
            // favoritos       = [],
            segFav          = [],
            url = "http://api.meuguru.com.br/";

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
                },
                    timer;

                $scope.segEventos = segEventos;
                timer = $interval(function() {
                    $scope.segEventos = segEventos;
                }, 1000);


                $scope.$watch('segEventos', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-eventos');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
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
                },
                    timer;

                $scope.segFor = segFor;
                timer = $interval(function() {
                    $scope.segFor = segFor;
                }, 1000);

                $scope.$watch('segFor', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-fornecedores');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
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
                },
                    timer;

                $scope.segPav = segPav;
                timer = $interval(function() {
                    $scope.segPav = segPav;
                }, 1000);

                $scope.$watch('segPav', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-pavilhoes');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
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
                },
                    timer;

                $scope.segProd = segProd;
                timer = $interval(function() {
                    $scope.segProd = segProd;
                }, 1000);

                $scope.$watch('segProd', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-produtos');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
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
                },
                    timer;

                $scope.segNot = segNot;
                timer = $interval(function() {
                    $scope.segNot = segNot;
                }, 1000);

                $scope.$watch('segNot', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-noticias');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
            },
            getServicos: function($scope) {
                var _prepareView = function() {
                    $scope.segSer       = segSer;
                    $scope.allServicos  = servicos.concat();
                    $scope.allEventos   = eventos.concat();
                    $scope.servicos     = servicos.concat();

                    if(servicos.length) {
                        $scope.servicos.splice(LOAD_INICIAL, servicos.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                },
                    timer;

                $scope.segSer = segSer;
                timer = $interval(function() {
                    $scope.segSer = segSer;
                }, 1000);

                $scope.$watch('segSer', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-servicos');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
            },
            getEstandes: function($scope) {
                var _prepareView = function() {
                    $scope.segEst       = segEst;
                    $scope.posiEst      = posiEst;
                    $scope.allEstandes  = estandes.concat();
                    $scope.estandes     = estandes.concat();

                    if(estandes.length > 15) {
                        $scope.estandes.splice(LOAD_INICIAL, estandes.length);
                    }

                    $scope.load = false;
                    $scope.moredata = false;
                },
                    timer;

                $scope.segEst = segEst;
                timer = $interval(function() {
                    $scope.segEst = segEst;
                }, 1000);

                $scope.$watch('segEst', function(n, o) {
                    if(typeof n != 'undefined') {
                        if(n.length != 0) {
                            var loading = document.getElementById('loading-estandes');
                            if(loading){
                                loading.style.opacity = 0;
                                loading.style.display = 'none';
                            }
                            _prepareView($scope);
                            $interval.cancel(timer);
                        }
                    }
                })
            },
            init: function(){
                if(eventos.length == 0) {
                    $http.get(url + 'eventos', {responseType: 'json'}).
                        then(function(resp) {
                            eventos             = resp.data.eventos;
                            segEventos          = resp.data.segmentos;
                            return;
                        });
                }
                if(fornecedores.length == 0) {
                    $http.get(url + 'fornecedores', {responseType: 'json'}).
                        then(function(resp) {
                            fornecedores    = resp.data.fornecedores;
                            segFor          = resp.data.segmentos;
                            return;
                        });
                }
                if(pavilhoes.length == 0) {
                    $http.get(url + 'locais', {responseType: 'json'}).
                        then(function(resp) {
                            pavilhoes       = resp.data.locais;
                            segPav          = resp.data.segmentos;
                            return;
                        });
                }
                if(produtos.length == 0) {
                    $http.get(url + 'produtos', {responseType: 'json'}).
                        then(function(resp) {
                            produtos        = resp.data.produtos;
                            segProd         = resp.data.segmentos;
                            return;
                        });
                }
                if(noticias.length == 0) {
                    $http.get(url + 'noticias', {responseType: 'json'}).
                        then(function(resp) {
                            noticias        = resp.data.noticias;
                            segNot          = resp.data.segmentos;
                            return;
                        });
                }
                if(servicos.length == 0) {
                    $http.get(url + 'servicos', {responseType: 'json'}).
                        then(function(resp) {
                            servicos        = resp.data.servicos;
                            segSer          = resp.data.segmentos;
                            return;
                        });
                }
                if(estandes.length == 0) {
                    $http.get(url + 'estandes', {responseType: 'json'}).
                        then(function(resp) {
                            estandes        = resp.data.estandes;
                            segEst          = resp.data.segmentos;
                            return;
                        });
                }
            },
            getFavoritos: function($scope) {

                var resetFavoritos = function() {
                    for (var j = eventos.length - 1; j >= 0; j--) {
                        eventos[j]['isFavorito'] = false;
                    };
                    for (var j = estandes.length - 1; j >= 0; j--) {
                        estandes[j]['isFavorito'] = false;
                    };
                    for (var j = fornecedores.length - 1; j >= 0; j--) {
                        fornecedores[j]['isFavorito'] = false;
                    };
                    for (var j = noticias.length - 1; j >= 0; j--) {
                        noticias[j]['isFavorito'] = false;
                    };
                    for (var j = pavilhoes.length - 1; j >= 0; j--) {
                        pavilhoes[j]['isFavorito'] = false;
                    };
                    for (var j = produtos.length - 1; j >= 0; j--) {
                        produtos[j]['isFavorito'] = false;
                    };
                    for (var j = servicos.length - 1; j >= 0; j--) {
                        servicos[j]['isFavorito'] = false;
                    };
                }

                favoritos = FavoritosService.getFavoritos();

                if(
                    eventos.length != 0 &&
                    fornecedores.length != 0 &&
                    pavilhoes.length != 0 &&
                    produtos.length != 0 &&
                    noticias.length != 0 &&
                    servicos.length != 0 &&
                    estandes.length != 0
                ) {
                    var fgEvento        = false,
                        fgEstande       = false,
                        fgFornecedor    = false,
                        fgNoticia       = false,
                        fgPavilhao      = false,
                        fgProduto       = false,
                        fgServico       = false;

                    $scope.segFav = [];
                    resetFavoritos();

                    for (var i = favoritos.length - 1; i >= 0; i--) {
                        switch(favoritos[i]['tx_type']) {
                            case 'Evento':
                                if(!fgEvento) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgEvento = true;
                                }
                                for (var j = eventos.length - 1; j >= 0; j--) {
                                    eventos[j]['isFavorito'] = false;
                                    if(eventos[j]['ID'] == favoritos[i]['id_post']) {
                                        eventos[j]['isFavorito'] = true;
                                        favoritos[i]['evento'] = eventos[j];
                                    }
                                };
                                break;
                            case 'Projeto de Estande':
                                if(!fgEstande) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgEstande = true;
                                }
                                for (var j = estandes.length - 1; j >= 0; j--) {
                                    if(estandes[j]['ID'] == favoritos[i]['id_post']) {
                                        estandes[j]['isFavorito'] = true;
                                        favoritos[i]['estande'] = estandes[j];
                                    }
                                };
                                break;
                            case 'Fornecedor':
                                if(!fgFornecedor) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgFornecedor = true;
                                }
                                for (var j = fornecedores.length - 1; j >= 0; j--) {
                                    if(fornecedores[j]['ID'] == favoritos[i]['id_post']) {
                                        fornecedores[j]['isFavorito'] = true;
                                        favoritos[i]['fornecedor'] = fornecedores[j];
                                    }
                                };
                                break;
                            case 'Notícia':
                                if(!fgNoticia) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgNoticia = true;
                                }
                                for (var j = noticias.length - 1; j >= 0; j--) {
                                    if(noticias[j]['ID'] == favoritos[i]['id_post']) {
                                        noticias[j]['isFavorito'] = true;
                                        favoritos[i]['noticia'] = noticias[j];
                                    }
                                };
                                break;
                            case 'Pavilhão':
                                if(!fgPavilhao) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgPavilhao = true;
                                }
                                for (var j = pavilhoes.length - 1; j >= 0; j--) {
                                    if(pavilhoes[j]['ID'] == favoritos[i]['id_post']) {
                                        pavilhoes[j]['isFavorito'] = true;
                                        favoritos[i]['pavilhao'] = pavilhoes[j];
                                    }
                                };
                                break;
                            case 'Produto':
                                if(!fgProduto) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgProduto = true;
                                }
                                for (var j = produtos.length - 1; j >= 0; j--) {
                                    if(produtos[j]['ID'] == favoritos[i]['id_post']) {
                                        produtos[j]['isFavorito'] = true;
                                        favoritos[i]['produto'] = produtos[j];
                                    }
                                };
                                break;
                            case 'Serviço':
                                if(!fgServico) {
                                    $scope.segFav.push(favoritos[i]['tx_type']);
                                    fgServico = true;
                                }
                                for (var j = servicos.length - 1; j >= 0; j--) {
                                    if(servicos[j]['ID'] == favoritos[i]['id_post']) {
                                        servicos[j]['isFavorito'] = true;
                                        favoritos[i]['servico'] = servicos[j];
                                    }
                                };
                                break;
                        }
                    };
                    $scope.favoritos = favoritos;
                    var loading = document.getElementById('loading-favoritos');
                    if(loading){
                        loading.style.opacity = 0;
                        loading.style.display = 'none';
                    }
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

            },
            endLoad: function() {
                $ionicLoading.hide();
            }
        }
    }
])

.factory('FavoritosService', [
    '$rootScope', '$timeout', '$cordovaSQLite', '$ionicPopup',
    function($rootScope, $timeout, $cordovaSQLite, $ionicPopup) {
        var favoritos = [],
            setTimer;

        return {
            getFavoritos: function(){
                var query = 'SELECT id_post, tx_type FROM favorito';
                $cordovaSQLite.execute(db, query).then(function(res) {
                    favoritos = [];
                    if(res.rows.length > 0) {
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

                var _popUpFalse = function() {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Já é um favorito.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                }

                var query = 'SELECT id FROM favorito WHERE id_post = ?';
                $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                    if(res.rows.length == 0) {
                        var query = 'INSERT INTO favorito (id_post, tx_type) VALUES (?,?)';
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
                    } else {
                        _popUpFalse();
                    }
                }, function (err) {
                    _popUpFalse();
                });

            },
            rmFavorito: function(route, id) {
                var _popUp = function() {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Já foi removido dos favorito.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                }

                var query = 'SELECT id FROM favorito WHERE id_post = ?';
                $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                    if(res.rows.length != 0) {
                        var query = 'DELETE FROM favorito WHERE id_post = ?';
                        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                            var favoritePopUp = $ionicPopup.show({
                                title: route,
                                template: '<p style="text-align: center ">Removido dos favoritos.</p>',
                            });
                            $timeout(function() {
                                favoritePopUp.close();
                            }, 1500);
                        }, function (err) {
                            var favoritePopUp = $ionicPopup.show({
                                title: route,
                                template: '<p style="text-align: center ">Não foi possível remover dos favoritos.</p>',
                            });
                            $timeout(function() {
                                favoritePopUp.close();
                            }, 1500);
                        });
                    } else {
                        _popUp();
                    }
                }, function (err) {
                    _popUp();
                });
            },
            checkFavorite: function(id) {
                var query = 'SELECT id FROM favorito WHERE id_post = ?';
                $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                    alert(res.rows.length);
                    return res.rows.length != 0 ? false : true;
                }, function (err) {
                    return  false;
                });
            }
        }
    }
])