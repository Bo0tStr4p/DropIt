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
	var debug = 1;

	var intestatario = document.getElementById('cc-name123');
	var intestatario_error = document.getElementById('control-name-card');

	var codice = document.getElementById('cc-number123');
	var codice_error = document.getElementById('control-code-card');

	var scadenza = document.getElementById('cc-expiration123');
	var scadenza_error = document.getElementById('control-expiration-card');

	var cvv = document.getElementById('cc-cvv123');
	var cvv_error = document.getElementById('control-cvv-card');

	intestatario_error.innerHTML = "";
	codice_error.innerHTML = "";
	scadenza_error.innerHTML = "";
	cvv_error.innerHTML = "";

	if(intestatario.value == ""){
		intestatario_error.innerHTML = "* Inserire un intestatario";
		debug = 0;
	}
	var espressione = /^[a-zA-Z]*\ [a-zA-Z]*$/;

	if(!espressione.test(intestatario.value)){
		intestatario_error.innerHTML = "* Inserire un intestatario usando [a-z A-Z]";
		debug = 0;	
	}
	if(codice.value == "" || codice.value.length<16){
		codice_error.innerHTML = "* Inserire un codice carta (16 cifre)";
		debug = 0;
	}
	if(isNaN(codice.value)){
		codice_error.innerHTML = "* Bisogna inserire un numero";
		debug = 0;
	}
	if(scadenza.value == ""){
		scadenza_error.innerHTML = "* Bisogna inserire una scadenza";
		debug = 0;	
	}
	if(!controllo_data(scadenza.value)){
		scadenza_error.innerHTML = "* Bisogna scrivere data nel formato mm/aaaa";
		debug = 0;	
	}
	if(cvv.value == "" || cvv.value.length<3){
		cvv_error.innerHTML = "* Bisogna scrivere un CCV/CVV di 3 cifre";
		debug = 0;	
	}
	if(isNaN(cvv.value)){
		cvv_error.innerHTML = "* CCV/CVV deve essere un numero";
		debug = 0;	
	}

	if(debug){
		viewModal();
		return true;
	}
	else
		return false;
}

function viewModal(){
	$("#centralModalSuccess").modal();
}

function controllo_data(stringa){
	var espressione = /^[0-9]{2}\/[0-9]{4}$/;
	if (!espressione.test(stringa))
	{
	    return false;
	}else{
		anno = parseInt(stringa.substr(3, 4),10);
		mese = parseInt(stringa.substr(0, 2),10);
		giorno = 1;
		
		var data=new Date(anno, mese-1, giorno);
		if(data.getFullYear()==anno && data.getMonth()+1==mese && data.getDate()==giorno){
			return true;
		}else{
			return false;
		}
	}
}