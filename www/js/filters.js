var _filtraNome = function(items, nome) {
	var filtered = [];

	if(
		typeof nome != 'undefined' &&
		nome.length > 3
	) {

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined') {
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
	} else {
		filtered = items;
	}


	return filtered;
};

var _filtraEstado = function(items, sigla, tipo) {
	var property,
		filtered = [];

	if(
		typeof sigla != 'undefined' &&
		sigla.length == 2
	) {
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

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined') {
				if(item.hasOwnProperty(property)){
					if (item[property].indexOf(sigla.toUpperCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}
	}else {
		filtered = items;
	}

	return filtered;
};

var _filtraCategoria = function(items, categoria, tipo) {
	var property,
		filtered = [];

	if(
		typeof categoria != 'undefined' &&
		categoria != null
	) {

		switch(tipo) {
			case 5:
				property = 'categoria';
				break;
			case 6:
				property = 'posicao';
				break;
			default:
				property = 'name';
				break;
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined') {
				if(
					item.hasOwnProperty(property) &&
					typeof categoria != 'undefined'
				){
					var name = item[property].toLowerCase();
					if (name.indexOf(categoria.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}
	} else {
		filtered = items;
	}

	return filtered;
};

var _filtraPavilhao = function(items, pavilhao) {
	var filtered = [];

	if(
		typeof pavilhao != 'undefined' &&
		pavilhao.length >3
	) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined') {
				if(item.hasOwnProperty('pavilhaoFeira')){
					var pav = item['pavilhaoFeira'].toLowerCase()
					if (pav.indexOf(pavilhao.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}
	} else {
		filtered = items;
	}

	return filtered;
};

var _filtraPromotor = function(items, promotor) {
	var filtered = [];


	if(
		typeof promotor != 'undefined' &&
		promotor.length > 3
	) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined') {
				if(item.hasOwnProperty('promotorFeira')){
					var prom = item['promotorFeira'].toLowerCase();
					if (prom.indexOf(promotor.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}
	} else {
		filtered = items;
	}

	return filtered;
};

var _filtraCidade = function(items, cidade, tipo) {
	var property,
		filtered = [];

	if(
		typeof cidade != 'undefined' &&
		cidade.length > 3
	) {
		switch(tipo) {
			case 1:
				property = 'cidadeFeira';
				break;
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

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(typeof item != 'undefined'){
				if(item.hasOwnProperty(property)){
					var city = item[property].toLowerCase();
					if (city.indexOf(cidade.toLowerCase()) > -1) {
						filtered.push(item);
					}
				}
			}
		}
	} else {
		filtered = items;
	}

	return filtered;
}

var _filtraPalavraChave = function(items, palavra) {
	var filtered = [];
	if(
		typeof palavra != 'undefined' &&
		palavra.length > 3
	) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
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
	} else {
		filtered = items;
	}

	return filtered;
}

var _filtraData = function(items, date) {
	var filtered = [];

	if(typeof date != 'undefined') {

		var data = ( date.getDate() > 10 ? date.getDate() : '0' + date.getDate() ) + '/' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '/' + date.getFullYear();
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item.hasOwnProperty('dataInicial')){
				if (item['dataInicial'].indexOf(data) > -1) {
					filtered.push(item);
				}
			}
		}

	} else {
		filtered = items;
	}


	return filtered;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] != "") size++;
    }
    return size;
};

angular.module('meuguru.filters', [])

.filter('filtrarEvento', function() {
	return function(items, filtro, all) {
		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoNome 		= [],
				retornoEstado 		= [],
				retornoCidade 		= [],
				retornoCategoria 	= [],
				retornoPavilhao 	= [],
				retornoPromotor 	= [],
				retornoData			= [];

			retornoNome 		= _filtraNome(collection, filtro.nome);
			retornoEstado 		= _filtraEstado(retornoNome, filtro.estado, 1);
			retornoCidade 		= _filtraCidade(retornoEstado, filtro.cidade, 1);
			retornoCategoria 	= _filtraCategoria(retornoCidade, filtro.categoria);
			retornoPavilhao 	= _filtraPavilhao(retornoCategoria, filtro.pavilhao);
			retornoPromotor 	= _filtraPromotor(retornoPavilhao, filtro.promotor);
			retornoData			= _filtraData(retornoPromotor, filtro.data);

			return retornoData;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarFornecedor', function() {
	return function(items, filtro, all) {

		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoPalavraChave = [],
				retornoEstado 		= [],
				retornoCidade 		= [],
				retornoCategoria 	= [],
				retornoPavilhao 	= [],
				retornoPromotor 	= [];

			retornoPalavraChave = _filtraPalavraChave(collection, filtro.palavra);
			retornoEstado 		= _filtraEstado(retornoPalavraChave, filtro.estado, 4);
			retornoCidade 		= _filtraCidade(retornoEstado, filtro.cidade, 4);
			retornoCategoria 	= _filtraCategoria(retornoCidade, filtro.categoria);

			return retornoCategoria;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarPavilhao', function() {
	return function(items, filtro, all) {

		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoNome			= [],
				retornoEstado 		= [],
				retornoCidade 		= [],
				retornoCategoria 	= [];

			retornoNome 		= _filtraNome(collection, filtro.nome);
			retornoEstado 		= _filtraEstado(retornoNome, filtro.estado, 2);
			retornoCidade 		= _filtraCidade(retornoEstado, filtro.cidade, 2);
			retornoCategoria 	= _filtraCategoria(retornoCidade, filtro.categoria);

			return retornoCategoria;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarProduto', function() {
	return function(items, filtro, all) {

		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoPalavraChave = [],
				retornoCategoria 	= [];

			retornoPalavraChave = _filtraPalavraChave(collection, filtro.palavra);
			retornoCategoria 	= _filtraCategoria(retornoPalavraChave, filtro.categoria);

			return retornoCategoria;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarServico', function() {
	return function(items, filtro, all) {

		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoEstado 		= [],
				retornoCidade 		= [],
				retornoCategoria 	= [];

			retornoEstado 		= _filtraEstado(collection, filtro.estado, 3);
			retornoCidade 		= _filtraCidade(retornoEstado, filtro.cidade, 3);
			retornoCategoria 	= _filtraCategoria(retornoCidade, filtro.categoria);

			return retornoCategoria;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarEstande', function() {
	return function(items, filtro, all) {

		var collection = items,
			retorno;

		var _filtra = function(collection) {

			var retornoPalavraChave = [],
				retornoPosicao 		= [],
				retornoCategoria 	= [];

			retornoPalavraChave = _filtraPalavraChave(collection, filtro.palavra);
			retornoPosicao 		= _filtraCategoria(retornoPalavraChave, filtro.posicao, 6);
			retornoCategoria 	= _filtraCategoria(retornoPosicao, filtro.categoria, 5);

			return retornoCategoria;
		}

		retorno = _filtra(collection);

		if(
			// Object.size(filtro) == 1 &&
			retorno.length == 0
		) {
			collection = all;
			retorno = _filtra(collection);
		}

		return retorno;
	}
})

.filter('filtrarFavorito', function() {
	return function(items, categoria) {
		var filtered = [];

		if(
			typeof categoria != 'undefined' &&
			categoria != null
		) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(typeof item != 'undefined') {
					if(item.hasOwnProperty('tx_type')){
						var tx_type = item['tx_type'].toLowerCase();
						if (tx_type.indexOf(categoria.toLowerCase()) > -1) {
							filtered.push(item);
						}
					}
				}
			}
		} else {
			filtered = items;
		}


		return filtered;
	}
})