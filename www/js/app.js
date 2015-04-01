var db = null;

angular.module('meuguru', ['ionic', 'meuguru.controllers',  'meuguru.filters',  'meuguru.services', 'meuguru.directives' ,'ngResource', 'pasvaz.bindonce', 'ngCordova'])

.run(['$rootScope', '$timeout', '$ionicPlatform', '$ionicPopup', '$cordovaSQLite', 'MeuGuruService',
	function($rootScope, $timeout, $ionicPlatform, $ionicPopup, $cordovaSQLite, MeuGuruService) {
        $ionicPlatform.ready(function() {
            MeuGuruService.init();
            if(window.Connection) {
                if(
                    navigator.connection.type == Connection.NONE ||
                    navigator.connection.type == Connection.UNKNOWN
                ) {
                    $ionicPopup.confirm({
                        title: "Sem acesso à internet.",
                        content: "Não conseguimos estabelecer uma conexão com Internet. Verifique a conexão."
                    })
                    .then(function(result) {
                        ionic.Platform.exitApp();
                    });
                }
            }

            if(window.StatusBar) {
                StatusBar.overlaysWebView(true);
                StatusBar.backgroundColorByHexString('#1b3d6e');
            }

			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}

            if(window.plugins && window.plugins.AdMob) {
                var admob_key 	= device.platform == "Android" ? "ca-app-pub-9472655871356402/6350910973" : "ca-app-pub-9472655871356402/9304377372";
                var admob 		= window.plugins.AdMob;
                $timeout(function() {
                    admob.createBannerView(
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    },
                    function() {
                        admob.requestAd(
                            {
                                'isTesting': true,
                                'extras': {
                                    'color_bg': 'ECECEC',
                                    'color_bg_top': 'ECECEC',
                                    'color_border': 'ECECEC',
                                    'color_link': 'ECECEC',
                                    'color_text': 'ECECEC',
                                    'color_url': 'ECECEC'
                                },
                            },
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

            db = $cordovaSQLite.openDB("meuguru.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorito (id integer primary key, id_post text, tx_type text)");
		});

		$rootScope.checkImg = function(url) {
			if(
                typeof url != 'undefined' &&
				url.indexOf('.png') > 1 ||
				url.indexOf('.jpg') > 1
			) {
				return true;
			}

			return false;
		};

		$rootScope.estados = [
			'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','SC','RR','SP','SE','TO'
		];
	}
])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
	function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.forwardCache(false);
        $ionicConfigProvider.views.maxCache(0);

		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.backButton.text('');
		$ionicConfigProvider.navBar.alignTitle('center');

		$stateProvider


        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "template/tabs.html",
            controller: "TabsCtrl"
        })

		.state('tab.index', {
			url: '/index',
            views: {
                'tab':{
                    templateUrl: 'template/index.html',
                    controller: 'IndexCtrl'
                }
            }
		})

		.state('tab.eventos', {
			url: '/eventos',
			views: {
				'tab': {
					templateUrl: 'template/agenda.html',
					controller: 'AgendaCtrl'
				}
			}
		})
		.state('tab.evento', {
			url: '/evento/:eventoId',
			views: {
				'tab': {
					templateUrl: 'template/evento-detail.html',
					controller: 'EventoCtrl'
				}
			}
		})

		.state('tab.fornecedores', {
			url: '/fornecedores',
			views: {
				'tab': {
					templateUrl: 'template/fornecedores.html',
					controller: 'FornecedoresCtrl'
				}
			}
		})
		.state('tab.fornecedor', {
			url: '/fornecedor/:fornecedorId',
			views: {
				'tab': {
					templateUrl: 'template/fornecedor-detail.html',
					controller: 'FornecedorCtrl'
				}
			}
		})

		.state('tab.pavilhoes', {
			url: '/pavilhoes',
			views: {
				'tab': {
					templateUrl: 'template/pavilhoes.html',
					controller: 'PavilhoesCtrl'
				}
			}
		})
		.state('tab.pavilhao', {
			url: '/pavilhao/:pavilhaoId',
			views: {
				'tab': {
					templateUrl: 'template/pavilhao-detail.html',
					controller: 'PavilhaoCtrl'
				}
			}
		})

		.state('tab.servicos', {
			url: '/servicos',
			views: {
				'tab': {
					templateUrl: 'template/servicos.html',
					controller: 'ServicosCtrl'
				}
			}
		})
		.state('tab.servico', {
			url: '/servico/:servicoId',
			views: {
				'tab': {
					templateUrl: 'template/servico-detail.html',
					controller: 'ServicoCtrl'
				}
			}
		})

		.state('tab.produtos', {
			url: '/produtos',
			views: {
				'tab': {
					templateUrl: 'template/produtos.html',
					controller: 'ProdutosCtrl'
				}
			}
		})
		.state('tab.produto', {
			url: '/produto/:produtoId',
			views: {
				'tab': {
					templateUrl: 'template/produto-detail.html',
					controller: 'ProdutoCtrl'
				}
			}
		})

		.state('tab.noticias', {
			url: '/noticias',
			views: {
				'tab': {
					templateUrl: 'template/noticias.html',
					controller: 'NoticiasCtrl'
				}
			}
		})
		.state('tab.noticia', {
			url: '/noticia/:noticiaId',
			views: {
				'tab': {
					templateUrl: 'template/noticia-detail.html',
					controller: 'NoticiaCtrl'
				}
			}
		})

		.state('tab.estandes', {
			url: '/estandes',
			views: {
				'tab': {
					templateUrl: 'template/estandes.html',
					controller: 'EstandesCtrl'
				}
			}
		})
		.state('tab.estande', {
			url: '/estande/:estandeId',
			views: {
				'tab': {
					templateUrl: 'template/estande-detail.html',
					controller: 'EstandeCtrl'
				}
			}
		})

        .state('tab.favoritos', {
            url: '/favoritos',
            views: {
                'tab': {
                    templateUrl: 'template/favoritos.html',
                    controller: 'FavoritosCtrl'
                }
            }
        })

		.state('tab.contato', {
			url: '/contato',
			views: {
				'tab': {
					templateUrl: 'template/contato.html',
					controller: 'ContatoCtrl'
				}
			}
		})

	  $urlRouterProvider.otherwise('/tab/index')
	}
])
