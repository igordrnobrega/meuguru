angular.module('meuguru', ['ionic', 'meuguru.controllers',  'meuguru.filters',  'meuguru.services', 'meuguru.directives' ,'ngResource', 'pasvaz.bindonce'])

.run(['$rootScope', '$ionicPlatform',
	function($rootScope, $ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
				StatusBar.styleHex('#1b3d6e');
			}
		});

		$rootScope.checkImg = function(url) {
			if(
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

		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.backButton.text('');
		$ionicConfigProvider.navBar.alignTitle('center');

		$stateProvider

		.state('index', {
			url: '/index',
			templateUrl: 'template/index.html',
			controller: 'IndexCtrl'
		})

		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "template/tabs.html",
			controller: "TabsCtrl"
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

		.state('tab.contato', {
			url: '/contato',
			views: {
				'tab': {
					templateUrl: 'template/contato.html',
					controller: 'ContatoCtrl'
				}
			}
		})

	  $urlRouterProvider.otherwise('/index')
	}
])
