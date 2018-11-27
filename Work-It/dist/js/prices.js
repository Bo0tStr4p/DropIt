function caricaPagamento(e){
	var directory = 'checkout_steps/'+e+'.htm #main';
	 $( "#main" ).load(directory);
}

function caricaSceltaPiano(e){
	var directory = 'checkout_steps/'+e+'.htm #main';
	 $( "#main" ).load(directory);
}

function caricaMetodoPagamento(e){
	var directory = 'checkout_steps/'+e+'.htm #divv';
	 $( "#print_choose" ).load(directory);
}

function verificaPagamentoCarta(){
	var intestatario = document.getElementById('cc-name123');
	var intestatario_error = document.getElementById('control-name-card');
	var codice = document.getElementById('cc-number123');
	var codice_error = document.getElementById('control-code-card');
	intestatario_error.innerHTML = "";
	codice_error.innerHTML = "";
	if(intestatario.value == ""){
		intestatario_error.innerHTML = "* Inserire un intestatario";
		return false;
	}
	if(codice.value == "" || codice.length<16){
		codice_error.innerHTML = "* Inserire un codice carta (16 cifre)";
		return false;
	}
	if(isNaN(codice.value)){
		codice_error.innerHTML = "* Bisogna inserire un numero";
		return false;
	}
	$("#centralModalSuccess").modal();
	return true;
}