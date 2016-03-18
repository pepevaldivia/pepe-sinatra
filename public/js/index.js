var BASE_URL = "http://pepis-sinatra.mybluemix.net/";

$("#txtDistrito").pepeautocomplete({
	url : BASE_URL+"distrito",
    divSugerencia : "#sugerenciaTxtDistrito",
    destinoIdSugerencia :  "txtIdDistrito",
    destinoValorSugerencia :  "txtDistrito"
});
