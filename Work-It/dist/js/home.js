function caricaSezione(e){
	var directory = 'home_pages/'+e+'.htm #main';
	 $( "#main" ).load(directory);
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