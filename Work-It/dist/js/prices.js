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
	var espressione = /^[A-Z][a-z]+(\ [A-Z][a-z']+)+$/;

	if(!espressione.test(intestatario.value)){
		intestatario_error.innerHTML = "* Inserire un intestatario (es. Mario Rossi))";
		debug = 0;	
	}
	if(codice.value.length!=16){
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
		scadenza_error.innerHTML = "* Data futura nel formato mm/aaaa";
		debug = 0;	
	}
	if(cvv.value.length!=3){
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
	var espressione = /^(0[1-9]|1[012])\/[0-9]{4}$/;
	if (!espressione.test(stringa))
	{
	    return false;
	}else{
		/* The substr() method extracts parts of a string,
		 beginning at the character at the specified position,
		 and returns the specified number of characters*/

		/* parseInt: il 2° parametro è The radix that is used to specify
		 which numeral system to be used (10 sta quindi per sistema decimale) */
		anno = parseInt(stringa.substr(3, 4),10);
		mese = parseInt(stringa.substr(0, 2),10);
		giorno = 1;

		/* Controllo se la data di scadenza inserita sia già scaduta */
		var date = new Date();
		if(anno < date.getFullYear() ||
		  (anno == date.getFullYear() && mese < date.getMonth()+1)
		  )
			return false;
		
		var data=new Date(anno, mese-1, giorno);
		if(data.getFullYear()==anno && data.getMonth()+1==mese && data.getDate()==giorno){
			return true;
		}else{
			return false;
		}
	}
}