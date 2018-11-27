var bottone = document.getElementsByName("checkout_pay");
	for(var i=0;i<bottone.length;i++){
		bottone[i].onclick = caricaPagamento;
		bottone[i].posizione = i+1;
	}

function caricaPagamento(e){
	var directory = 'checkout_steps/checkout_pay_'+e.target.posizione+'.htm #main';
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