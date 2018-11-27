var bottone = document.getElementsByName("checkout_pay");
	for(var i=0;i<bottone.length;i++){
		bottone[i].onclick = caricaPagamento;
		bottone[i].posizione = i+1;
	}

function caricaPagamento(e){
	var directory = 'checkout_steps_tmp/checkout_pay_'+e.target.posizione+'.htm #main';
	 $( "#main" ).load(directory);
}