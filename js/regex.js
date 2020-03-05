function executa(event) {

	event.preventDefault();

	limparResultados();
	var valores = pegarValoresDoForm();

	var resultados = executarRegex(valores);

	imprimirResultadoNoInput(resultados);
	highlightResultados(resultados, valores.target);
}


function executarRegex(valores) {

	var textoPattern = valores.pattern; //montarPatternDeDataMaisLegivel();
	var textoTarget = valores.target;
	var mostraIndex = valores.mostraIndex;

	var resultados = [];
	var resultado = null;


	var objetoRegex = new RegExp(textoPattern, 'g');

	while (resultado = objetoRegex.exec(textoTarget)) {

		if (resultado[0] === "") {
			throw Error("Regex retornou valor vazio.");
		}

		resultados.push(gerarResultado(resultado[0], resultado.index, objetoRegex.lastIndex, mostraIndex));
	}


	logEmTempoDeExecucao(textoPattern, textoTarget);

	return resultados;
}


function gerarResultado(resultado, index, lastIndex, mostraIndex) {

	var textoIndex = mostraIndex ? " [" + index + "-" + lastIndex + "]" : ""

	return {
		'resultado': resultado + textoIndex,
		'index': index,
		'lastIndex': lastIndex
	};
}


function logEmTempoDeExecucao(textoPattern, textoTarget) {
	var pObjetoRegex = new RegExp(textoPattern, 'g');
	var ini = performance.now();
	pObjetoRegex.test(textoTarget)
	var fim = performance.now();
	console.log("Tempo de execução (ms) " + (fim - ini));
}

function imprimirResultadoNoInput(resultados) {
	var inputResultado = document.querySelector('#resultado');
	var labelResultado = document.querySelector('#labelResultados');

	labelResultado.innerHTML = (resultados.length) + " Matches (resultados)";

	var resultadosComoArray = resultados.map(function (item) {
		return item.resultado;
	});

	labelResultado.innerHTML = (resultadosComoArray.length) + " Matches (resultados)";

	if (resultadosComoArray.length > 0) {
		inputResultado.value = resultadosComoArray.join(' | ');
		inputResultado.style.borderStyle = 'solid';
		inputResultado.style.borderColor = 'lime';//verde
	} else {
		inputResultado.placeholder = 'Sem matches (resultados)';
		inputResultado.value = '';
		inputResultado.style.borderStyle = 'solid';
		inputResultado.style.borderColor = 'red';
	}
}


function highlightResultados(resultados, texto) {
	var item = null;
	var indexBegin = 0;
	var conteudo = "";

	while ((item = resultados.shift()) != null) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, item.index)));
		conteudo += comHighlight(escapeHtml(texto.substring(item.index, item.lastIndex)));
		indexBegin = item.lastIndex;
	}

	//sobrou algum texto?
	if ((texto.length - indexBegin) > 0) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, texto.length)));
	}

	document.querySelector("#highlightText").innerHTML = conteudo;
}

function semHighlight(texto) {
	return texto;
	//return "<s>" + texto + "</s>";
}

function comHighlight(texto) {
	return "<span class='bg-primary'>" + texto + "</span>";
}

function escapeHtml(string) {
	return string.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}


function pegarValoresDoForm() {

	var inputTarget = document.querySelector('#target');
	var inputPattern = document.querySelector('#pattern')
	inputPattern.focus();

	var checkboxIndex = document.querySelector('#mostraIndex');

	_verificarInputs(inputTarget, inputPattern);

	return {
		'target': inputTarget.value.trim(),
		'pattern': inputPattern.value,
		'mostraIndex': checkboxIndex.checked,
	};
}

function _verificarInputs(inputTarget, inputPattern) {
	if (!inputTarget.value) {
		inputTarget.placeholder = 'Digite um target';
	}

	if (!inputPattern.value) {
		inputPattern.placeholder = 'Digite um pattern';
	}

	if (!inputTarget.value || !inputPattern.value) {
		throw Error('Valores invalidos');
	}
}

function limparResultados() {
	console.clear();
	document.querySelector('#labelResultados').innerHTML = '0 Matches (resultados)';
	document.querySelector('#resultado').value = '';
	document.querySelector('#resultado').placeholder = 'sem resultado';
	document.querySelector("#highlightText").innerHTML = '<em>sem resultado</em>';

}

function montarPatternDeDataMaisLegivel() {

	var DIA = "[0123]?\\d";
	var _DE_ = "\\s+(de )?\\s*";
	var MES = "[A-Za-z][a-zç]{3,8}";
	var ANO = "[12]\\d{3}";
	return DIA + _DE_ + MES + _DE_ + ANO;

}
