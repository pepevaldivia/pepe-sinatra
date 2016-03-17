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
                              url: parametros['url'],
                             data:{
                                            data:JSON.stringify(data),
                            },
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
                  var temp = "<div class='fila-sugerencia'><label class='id-sugerencia oculto'> " + rptaQuery[i]["id"]+ "</label> <label class=' sugerencia-label'>" + rptaQuery[i]["nombre"]+ "</label></div>"; 
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

$.fn.gridpepeautocomplete = function(parametros) {
      gridpepeautocomplete = $.fn.gridpepeautocomplete;
      //console.log(parametros);

  $(this).live("keydown",function(k){
          var tempValue = $(this).val();
          var tempString = String.fromCharCode(event.keyCode);       
          $(this).text(tempValue+tempString) ;
          var data = new Object();
          data.textoBuscar=$(this).text();
               //console.log(data.textoBuscar);
               $.ajax({
                              type: "POST",
                              url: parametros['url'],
                             data:{
                                            data:JSON.stringify(data),
                            },
                             async: false,
                             success: function(data) {
                                           // return false;
                                            data = JSON.parse(data);
                                            if(jQuery.isEmptyObject(data)){
                                                   $(parametros['divSugerencia']).addClass('oculto');
                                            }else{
                                                   var rptaHtml = gridpepeautocomplete.crearLabels(data);
                                                    $(parametros['divSugerencia']).removeClass('oculto');
                                                    $(parametros['divSugerencia']).html(rptaHtml);
                                            }                                           
                                            //return false;
                                             //Al hacer click en algua de las sugerencias
                                            $(".fila-sugerencia-pepegrid").die('click');
                                            $(".fila-sugerencia-pepegrid").live('click', function(){
                                                       var destinoIdSugerencia =  parametros['destinoIdSugerencia']
                                                       var destinoValorSugerencia =  parametros['destinoValorSugerencia'];
                                                       var idSugerencia = $(this).children().eq(0).html();
                                                       var valorSugerencia = $(this).children().eq(1).html();
                                                       destinoIdSugerencia = destinoIdSugerencia.toString();
                                                       destinoValorSugerencia = destinoValorSugerencia.toString();
                                                       $(destinoValorSugerencia).val(valorSugerencia);
                                                       $(destinoIdSugerencia).html(idSugerencia);
                                                      // gridpepeautocomplete.clickSugerencia(idSugerencia,valorSugerencia,destinoIdSugerencia,destinoValorSugerencia);
                                                       $(parametros['divSugerencia']).addClass('oculto');
                                                       var id_fila = $(this).parent().parent().parent().parent().children().children().html();
                                                       var id_tabla = $(this).parent().parent().parent().parent().parent().parent().attr('id');
                                                       if(typeof id_fila==='undefined'){
                                                              var x = Math.floor((Math.random() * 1000) + 1);
                                                              id_fila= id_tabla + "_" + x.toString();
                                                       }

                                                       var dom_id_fila = $(this).parent().parent().parent().parent().children().eq(0).children();
                                                       dom_id_fila.html(id_fila);
                                                       //console.log(id_tabla);console.log(id_fila);console.log(dom_id_fila);return false;
                                                       $().pepegridediciontabla(id_fila,id_tabla,dom_id_fila); 
                                            });
                                          
                             }
               });

    });

      $.fn.gridpepeautocomplete.crearLabels = function(rptaQuery){
              var tempRpta = "";
              for(var i=0;i<rptaQuery.length;i++){
                  var temp = "<div class='fila-sugerencia-pepegrid'><label class='id-sugerencia-pepegrid oculto'> " + rptaQuery[i]["id"]+ "</label> <label class=' sugerencia-label-pepegrid'>" + rptaQuery[i]["nombre"]+ "</label></div>"; 
                  tempRpta = tempRpta + temp;
              }
              return tempRpta;
    }

};