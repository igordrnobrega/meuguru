var favoritos   = [],
    segFav      = [];

angular.module('meuguru.services', [])

.factory('MeuGuruService', ['$http', '$log', '$interval', '$timeout', 'FavoritosService',
    function($http, $log, $interval, $timeout, FavoritosService) {

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
            // segFav          = [],
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
            initFavoritos: function () {
                   FavoritosService.getFavoritosDB(favoritos);
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
                if(favoritos.length == 0) {
                    $timeout(function () {
                        FavoritosService.getFavoritosDB();
                    },5);
                }
            },
            getFavoritos: function($scope) {

                if(
                    eventos.length      != 0 &&
                    fornecedores.length != 0 &&
                    pavilhoes.length    != 0 &&
                    produtos.length     != 0 &&
                    noticias.length     != 0 &&
                    servicos.length     != 0 &&
                    estandes.length     != 0 &&
                    favoritos.length    != 0
                ) {

                    $scope.favoritos = favoritos;
                    $scope.segFav = segFav;

                    var loading = document.getElementById('loading-favoritos');
                    if(loading){
                        loading.style.opacity = 0;
                        loading.style.display = 'none';
                    }
                    $scope.load = false;
                    $scope.moredata = false;

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
        var setTimer;

        return {
            getTabelas: function (route, obj){
                var retorno;
                switch (route) {
                    case 'Evento':
                        retorno = {
                            'tabela' : 'evento',
                            'campos' : [
                                'ID',
                                'guid',
                                'post_title',
                                'dataInicial',
                                'name',
                                'estadoFeira',
                                'cidadeFeira',
                                'promotorFeira',
                                'pavilhaoFeira',
                                'dataFinal',
                                'telefoneFeira',
                                'siteFeira',
                                'post_content',
                                'type'
                            ]
                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj.guid,
                                obj.post_title,
                                obj.dataInicial,
                                obj.name,
                                obj.estadoFeira,
                                obj.cidadeFeira,
                                obj.promotorFeira,
                                obj.pavilhaoFeira,
                                obj.dataFinal,
                                obj.telefoneFeira,
                                obj.siteFeira,
                                obj.post_content,
                                'evento'
                            ]
                        }
                        break;
                    case 'Fornecedor':
                        retorno = {
                            'tabela' : 'fornecedor',
                            'campos' : [
                                'guid',
                                'estado',
                                'post_title',
                                'cidade',
                                '_yoast_wpseo_metadesc',
                                'telefone',
                                'site',
                                'post_content',
                                'isAnunciante',
                                'ID',
                                'endereco',
                                'type'
                            ]
                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.guid,
                                obj.estado,
                                obj.post_title,
                                obj.cidade,
                                obj._yoast_wpseo_metadesc,
                                obj.telefone,
                                obj.site,
                                obj.post_content,
                                obj.isAnunciante,
                                obj.ID,
                                obj.endereco,
                                'fornecedor'
                            ]
                        }

                        break;
                    case 'Pavilhão':
                        retorno = {
                            'tabela' : 'pavilhao',
                            'campos' : [
                                'ID',
                                'guid',
                                'post_title',
                                'estadoPavilhao',
                                'cidadePavilhao',
                                'ruaPavilhao',
                                'bairroPavilhao',
                                'cepPavilhao',
                                'telefonePavilhao',
                                'sitePavilhao',
                                'post_content',
                                'type'
                            ],
                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj.guid,
                                obj.post_title,
                                obj.estadoPavilhao,
                                obj.cidadePavilhao,
                                obj.ruaPavilhao,
                                obj.bairroPavilhao,
                                obj.cepPavilhao,
                                obj.telefonePavilhao,
                                obj.sitePavilhao,
                                obj.post_content,
                                'pavilhao'
                            ]
                        }

                        break;
                    case 'Serviço':
                        retorno = {
                            'tabela' : 'servico',
                            'campos' : [
                                'ID',
                                'guid',
                                'post_title',
                                'ruaServico',
                                'numeroServico',
                                'cepServico',
                                'telefoneServico',
                                'siteServico',
                                'post_content',
                                'bairroServico',
                                'estadoServico',
                                'type'
                            ]
                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj.guid,
                                obj.post_title,
                                obj.ruaServico,
                                obj.numeroServico,
                                obj.cepServico,
                                obj.telefoneServico,
                                obj.siteServico,
                                obj.post_content,
                                obj.bairroServico,
                                obj.estadoServico,
                                'servico'
                            ]
                        }

                        break;
                    case 'Produto':
                        retorno = {
                            'tabela' : 'produto',
                            'campos' : [
                                'ID',
                                'guid',
                                'post_title',
                                'NomedaLoja',
                                'telefoneLoja',
                                'ruaLoja',
                                'cepLoja',
                                'cidadeLoja',
                                'estadoLoja',
                                'siteLoja',
                                'post_content',
                                'type'
                            ]
                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj.guid,
                                obj.post_title,
                                obj.NomedaLoja,
                                obj.telefoneLoja,
                                obj.ruaLoja,
                                obj.cepLoja,
                                obj.cidadeLoja,
                                obj.estadoLoja,
                                obj.siteLoja,
                                obj.post_content,
                                'produto'
                            ]
                        }

                        break;
                    case 'Notícia':
                        retorno = {
                            'tabela' : 'noticia',
                            'campos' : [
                                'ID',
                                '_thumbnail_id',
                                'post_title',
                                'post_date',
                                '_yoast_wpseo_focuskw',
                                'post_content',
                                'type'
                            ],

                        };
                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj._thumbnail_id,
                                obj.post_title,
                                obj.post_date,
                                obj._yoast_wpseo_focuskw,
                                obj.post_content,
                                'noticia'
                            ]
                        }

                        break;
                    case 'Projeto de Estande':
                        retorno = {
                            'tabela' : 'estande',
                            'campos' : [
                                'ID',
                                'guid',
                                'post_title',
                                'arquitetoProjeto',
                                'montadoraProjeto',
                                'ruaProjeto',
                                'numeroProjeto',
                                'cepProjeto',
                                'bairroProjeto',
                                'estadoProjeto',
                                'telefoneProjeto',
                                'siteProjeto',
                                'post_content',
                                'type'
                            ],

                        };

                        if (typeof obj != 'undefined') {
                            retorno['insert'] = [
                                obj.ID,
                                obj.guid,
                                obj.post_title,
                                obj.arquitetoProjeto,
                                obj.montadoraProjeto,
                                obj.ruaProjeto,
                                obj.numeroProjeto,
                                obj.cepProjeto,
                                obj.bairroProjeto,
                                obj.estadoProjeto,
                                obj.telefoneProjeto,
                                obj.siteProjeto,
                                obj.post_content,
                                'estande'
                            ];
                        };

                        break;
                }

                return retorno;
            },
            getFavoritosDB: function(){

                favoritos = [];

                var func = function (tabela) {
                    var query = 'SELECT ';
                    for (var i = tabela['campos'].length - 1; i >= 0; i--) {
                        if (i > 0) {
                            query += tabela['campos'][i] + ',';
                        } else {
                            query += tabela['campos'][i] + '';
                        }
                    };
                    query += ' FROM ' + tabela['tabela'];

                    $cordovaSQLite.execute(db, query).then(function(res) {
                        console.log(tabela);
                        if(res.rows.length > 0) {
                            for (var i = res.rows.length - 1; i >= 0; i--) {
                                favoritos.push(res.rows.item(i));
                            };
                            segFav.push(tabela['tabela']);
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
                };

                var servicos = [
                    'Evento',
                    'Fornecedor',
                    'Pavilhão',
                    'Serviço',
                    'Produto',
                    'Notícia',
                    'Projeto de Estande'
                ];

                for (var i = servicos.length - 1; i >= 0; i--) {
                    tabela = this.getTabelas(servicos[i]);
                    retorna = false;
                    if (i == 0) {
                        retorna = true;
                    }
                    func(tabela);
                };
            },
            setFavorito: function(route, obj) {

                var _popUpFalse = function() {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Já é um favorito.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                }

                tabela = this.getTabelas(route, obj);

                var query = 'SELECT ID FROM ' + tabela['tabela'] + ' WHERE ID like ?';
                $cordovaSQLite.execute(db, query, [obj.ID]).then(function(res) {
                    if(res.rows.length == 0) {

                        var query       = 'INSERT INTO ' + tabela['tabela'] + ' (';
                        var qtdParams   = '';
                        for (var i = 0; i < tabela['campos'].length; i++) {
                            if (i != tabela['campos'].length - 1) {
                                query       += tabela['campos'][i] + ',';
                                qtdParams   += '?,';
                            } else {
                                query       += tabela['campos'][i] + '';
                                qtdParams   += '?';
                            }
                        };
                        query += ') VALUES (' + qtdParams + ')';

                        $cordovaSQLite.execute(db, query, tabela['insert']).then(function(res) {
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
            rmFavorito: function(route, obj) {
                var _popUp = function() {
                    var favoritePopUp = $ionicPopup.show({
                        title: route,
                        template: '<p style="text-align: center ">Já foi removido dos favoritos.</p>',
                    });
                    $timeout(function() {
                        favoritePopUp.close();
                    }, 1500);
                }

                tabela = this.getTabelas(route, obj)

                var query = 'SELECT ID FROM ' + tabela['tabela'] + ' WHERE ID = ?';
                $cordovaSQLite.execute(db, query, [obj.ID]).then(function(res) {
                    if(res.rows.length != 0) {
                        var query = 'DELETE FROM ' + tabela['tabela'] + ' WHERE ID = ?';
                        $cordovaSQLite.execute(db, query, [obj.ID]).then(function(res) {
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
            isFavorito: function(route, obj, $scope) {

                tabela = this.getTabelas(route, obj);

                var query = 'SELECT ID FROM ' + tabela['tabela'] + ' WHERE ID = ?';
                $cordovaSQLite.execute(db, query, [obj.ID]).then(function(res) {
                    $scope.isFavorite = res.rows.length != 0 ? true : false;
                }, function (err) {
                    return  false;
                });
            }
        }
    }
])