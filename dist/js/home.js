function caricaSezione(e){
	var directory = 'home_pages/'+e+'.htm #main';
	 $( "#main" ).load(directory);
}

function caricaSezioneOrdini(){
	var directory = 'home_pages/orders.htm #main';
	 $( "#main" ).load(directory);
	$.ajax({
          type:"post",
          url:"../dist/php/getOrderList.php",
          cache:false,
          success: function(result){
              if(result == "Error")
              	alert("Problema col database, riprovare");
              else{
              	var obj = JSON.parse(result);
              	var str = "";
              	for(var i=0;i<obj.length;i++){
              		str+="<tr><th scope="+'row'+">"+obj[i].id+"</th><td>"+obj[i].description+"</td><td>"+obj[i].orderdate+"</td><td>"+obj[i].address+"</td>";
              		if(obj[i].status == 1)
              			str += "<td><span style='"+"background-color: green !important; font-style: bold;'"+" class='"+"badge badge-primary'"+">Completato</span></td></tr>";
              		else
              			str += "<td><span style='"+"color: black !important; background-color: yellow !important; font-style: bold;'"+" class='"+"badge badge-primary'"+">In Corso</span></td></tr>";
              	}
              	document.getElementById("OrTBody").innerHTML = str;
              }
          }
      });

}

function verificaForm(){
	var attivita = $("#nome-attivita");
	var data = $("#data-ordine");
	var indirizzo = $("indirizzo-ordine");

	if(attivita.val() == ""){
		$("#error-attivita").text("Inserire nome attività");
	}

	if(data.val() == ""){
		$("#error-data").text("Inserire una data");
	}

	if(indirizzo.val() == ""){
		$("#error-indirizzo").text("Inserire un indirizzo");
	}
}