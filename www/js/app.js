angular.module('meuguru', ['ionic', 'meuguru.controllers',  'meuguru.filters',  'meuguru.services' ,'ngResource'])

.run(['$ionicPlatform',
	function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}
])

.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'template/home.html',
			controller: 'HomeCtrl'
		})

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
				}
			}
		})

		.state('tab.estandes', {
			url: '/estandes',
			views: {
				'tab': {
					templateUrl: 'template/estandes.html',
				}
			}
		})

		.state('tab.contato', {
			url: '/contato',
			views: {
				'tab': {
					templateUrl: 'template/contato.html',
				}
			}
		})

	  $urlRouterProvider.otherwise('/')
	}
])
