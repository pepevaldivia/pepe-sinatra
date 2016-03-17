var BASE_URL = "http://127.0.0.1:9393/";

$("#txtDistrito").pepeautocomplete({
	url : BASE_URL+"distrito",
    divSugerencia : "#sugerenciaTxtDistrito",
    destinoIdSugerencia :  "txtIdDistrito",
    destinoValorSugerencia :  "txtDistrito"
});