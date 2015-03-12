angular.module('meuguru.filters', [])

.filter('filtraNome', function () {
	return function (items, nome) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('post_title')){
				if (item['post_title'].indexOf(nome) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof nome == 'undefined'){
			filtered = items;
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
	return function (items, cidade, tipo) {

		var property;
		switch(tipo) {
			case 2:
				property = 'cidadePavilhao';
				break;
			default:
				property = 'estado';
				break;
		}

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty(property)){
				if (item[property].indexOf(cidade) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof cidade == 'undefined'){
			filtered = items;
		}

		return filtered;
	};
})

.filter('filtraSegmento', function () {
	return function (items, segmento) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('name')){
				if (item['name'].indexOf(segmento) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof segmento == 'undefined'){
			filtered = items;
		}

		return filtered;
	};
})

.filter('filtraPromotor', function () {
	return function (items, promotor) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('promotorFeira')){
				if (item['promotorFeira'].indexOf(promotor) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof promotor == 'undefined'){
			filtered = items;
		}

		return filtered;
	};
})

.filter('filtraPavilhao', function () {
	return function (items, pavilhao) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('pavilhaoFeira')){
				if (item['pavilhaoFeira'].indexOf(pavilhao) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof pavilhao == 'undefined'){
			filtered = items;
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
	return function (items, palavra) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('_yoast_wpseo_metadesc')){
				if (
				item['_yoast_wpseo_metadesc'].indexOf(palavra) > -1 ||
				item['post_title'].indexOf(palavra) > -1
				) {
					filtered.push(item);
				}
			} else if (item['post_title'].indexOf(palavra) > -1) {
					filtered.push(item);
			}
		}

		if(typeof palavra == 'undefined') {
			filtered = items;
		}

		return filtered;
	};
})

.filter('filtraCategoria', function () {
	return function (items, categoria) {

		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('name')){
				if (item['name'].indexOf(categoria) > -1) {
					filtered.push(item);
				}
			}
		}

		if(typeof categoria == 'undefined') {
			filtered = items;
		}

		return filtered;
	};
})