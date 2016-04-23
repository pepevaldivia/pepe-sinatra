$.fn.pepeautocomplete = function(parametros) {
autocomplete = $.fn.pepeautocomplete;
//console.log(parametros);

$(this).keydown(function(k){
    var tempValue = $(this).val();
    var tempString = String.fromCharCode(event.keyCode);       
    $(this).text(tempValue+tempString) ;
    var data = new Object();
    data.textoBuscar=$(this).text();
    //console.log(data);
    $.ajax({
        type: "POST",
        //url: parametros['url'] + "?distrito=" + JSON.stringify(data) ,
        url: parametros['url'] + "?distrito=" + JSON.stringify($(this).text()) ,
        data:"",
        async: false,
        success: function(data) {
            // return false;
            data = JSON.parse(data);
            if(jQuery.isEmptyObject(data)){
               $(parametros['divSugerencia']).addClass('oculto');
            }else{
                var rptaHtml = autocomplete.crearLabels(data);
                $(parametros['divSugerencia']).removeClass('oculto');
                $(parametros['divSugerencia']).html(rptaHtml);
            }                                           
            //return false;
            //Al hacer click en algua de las sugerencias
            $(".fila-sugerencia").live('click', function(){
                var destinoIdSugerencia =  parametros['destinoIdSugerencia']
                var destinoValorSugerencia =  parametros['destinoValorSugerencia'];
                var idSugerencia = $(this).children().eq(0).html();
                var valorSugerencia = $(this).children().eq(1).html();
                autocomplete.clickSugerencia(idSugerencia,valorSugerencia,destinoIdSugerencia,destinoValorSugerencia);
                $(parametros['divSugerencia']).addClass('oculto');
            });
        }
    });
});

$.fn.pepeautocomplete.crearLabels = function(rptaQuery){
    var tempRpta = "";
    for(var i=0;i<rptaQuery.length;i++){
        var rpta = JSON.parse(rptaQuery[i]);

        var temp = "<div class='fila-sugerencia'><label class='id-sugerencia oculto'> " + rpta["id"]+ "</label> <label class=' sugerencia-label'>" + rpta["nombre"]+ "</label></div>"; 
        tempRpta = tempRpta + temp;
    }
    return tempRpta;
}

$.fn.pepeautocomplete.clickSugerencia = function(idSugerencia,valorSugerencia,destinoIdSugerencia,destinoValorSugerencia){
    //console.log("ajdkfjksda auto normal");
    destinoIdSugerencia = "#" + destinoIdSugerencia.toString();
    destinoValorSugerencia = "#" + destinoValorSugerencia.toString();
    $(destinoValorSugerencia).val(valorSugerencia);
    $(destinoIdSugerencia).html(idSugerencia);
    }
};
