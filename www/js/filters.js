angular.module('meuguru.filters', [])

.filter('filtraNome', function () {
	return function (items, nome, all) {
		var filtered = [];

		var _filtra = function(items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty('post_title') &&
					typeof nome != 'undefined'
				){
					var post_title = item['post_title'].toLowerCase();
					if (post_title.indexOf(nome.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		_filtra(items);

		if(typeof nome == 'undefined'){
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			console.log('this');
			_filtra(all);
		}

		return filtered;
	};
})

.filter('filtraEstado', function () {
	return function (items, sigla, tipo, all) {
		var property,
			filtered = [];

		var _filtra = function(property, items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty(property) &&
					typeof sigla != 'undefined'
				){
					if (item[property].indexOf(sigla.toUpperCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		switch(tipo) {
			case 1:
				property = 'estadoFeira';
				break;
			case 2:
				property = 'estadoPavilhao';
				break;
			case 3:
				property = 'estadoServico';
				break;
			default:
				property = 'estado';
				break;
		}

		_filtra(property, items);

		if(typeof sigla == 'undefined'){
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(property, all);
		}

		return filtered;
	};
})

.filter('filtraCidade', function () {
	return function (items, cidade, tipo, all) {
		var property,
			filtered = [];

		var _filtra = function(property, items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty(property) &&
					typeof cidade != 'undefined'
				){
					var city = item[property].toLowerCase();
					if (city.indexOf(cidade.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		switch(tipo) {
			case 2:
				property = 'cidadePavilhao';
				break;
			case 3:
				property = 'cidadeServico';
				break;
			default:
				property = 'cidade';
				break;
		}

		_filtra(property, items);


		if(typeof cidade == 'undefined'){
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(property, all);
		}

		return filtered;
	};
})

.filter('filtraPromotor', function () {
	return function (items, promotor, all) {
		var filtered = [];

		var _filtra = function(items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty('promotorFeira') &&
					typeof promotor != 'undefined'
				){
					var prom = item['promotorFeira'].toLowerCase();
					if (prom.indexOf(promotor.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		_filtra(items);

		if(typeof promotor == 'undefined'){
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(all);
		}

		return filtered;
	};
})

.filter('filtraPavilhao', function () {
	return function (items, pavilhao, all) {
		var filtered = [];

		var _filtra = function(items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty('pavilhaoFeira') &&
					typeof pavilhao != 'undefined'
				){
					var pav = item['pavilhaoFeira'].toLowerCase()
					if (pav.indexOf(pavilhao.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		_filtra(items);

		if(typeof pavilhao == 'undefined'){
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(all);
		}

		return filtered;
	};
})

.filter('filtraData', function () {
	return function (items, date) {

		var filtered = [];
		if(typeof date != 'undefined') {
			var data = ( date.getDate() > 10 ? date.getDate() : '0' + date.getDate() ) + '/' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '/' + date.getFullYear();
		} else {
			filtered = items;
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('dataInicial')){
				if (item['dataInicial'].indexOf(data) > -1) {
					filtered.push(item);
				}
			}
		}

		return filtered;
	};
})

.filter('filtraPalavraChave', function () {
	return function (items, palavra, all) {
		var filtered = [];

		var _filtra = function(items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(typeof palavra != 'undefined') {
					if(item.hasOwnProperty('_yoast_wpseo_metadesc')){
						var meta = item['_yoast_wpseo_metadesc'].toLowerCase();
						var title = item['post_title'].toLowerCase();
						if (
							meta.indexOf(palavra.toLowerCase()) > -1 ||
							title.indexOf(palavra.toLowerCase()) > -1
						) {
							filtered.push(item);
						}
					} else if(item.hasOwnProperty('post_content')) {
						var content = item['post_content'].toLowerCase();
						var title = item['post_title'].toLowerCase();
						if (
							content.indexOf(palavra.toLowerCase()) > -1 ||
							title.indexOf(palavra.toLowerCase()) > -1
						) {
							filtered.push(item);
						}
					} else if(item.hasOwnProperty('post_title')) {
						var title = item['post_title'].toLowerCase();
						if (title.indexOf(palavra.toLowerCase()) > -1) {
							filtered.push(item);
						}
					}
				}
			}
		}

		if(typeof palavra == 'undefined') {
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(all);
		}

		return filtered;
	};
})

.filter('filtraCategoria', function () {
	return function (items, categoria, all) {
		var filtered = [];

		var _filtra = function(items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(
					item.hasOwnProperty('name') &&
					typeof categoria != 'undefined'
				){
					var name = item['name'].toLowerCase();
					if (name.indexOf(categoria.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}

		_filtra(items);

		if(typeof categoria == 'undefined') {
			filtered = items;
		}

		if(
			filtered.length == 0 &&
			typeof all != 'undefined'
		) {
			_filtra(all);
		}

		return filtered;
	};
})