function caricaSezione(e){
	var directory = 'home_pages/'+e+'.htm #main';
	 $( "#main" ).load(directory);
}

function caricaSezioneNuovoOrdine(nome_categoria){
	var directory = 'home_pages/new_order.htm #main';
	 $( "#main" ).load(directory,function(){
	 	var data_string = "category="+nome_categoria;
	 	$.ajax({
          type:"post",
          url:"../dist/php/listServices.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "Error")
              	alert("Problema col database, riprovare");
              else{
              	var obj = JSON.parse(result);
              	var str = "<option value='0"+"'"+" disabled selected>Seleziona attività</option>";
              	for(var i=0;i<obj.length;i++){
              		str += "<option value='"+nome_categoria+": "+obj[i].name+"'>"+obj[i].name+"</option>";
              	}
              	document.getElementById("nome-attivita").innerHTML = str;
              }
          }
      });
	 });
}

function caricaSezioneOrdini(){
	var directory = 'home_pages/orders.htm #main';
	 $( "#main" ).load(directory,function(){
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
	});
}

function generatoreOrdine(){
	var date = new Date();
	var result = date.getDate()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
	return result+getRandomInt(4000);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getToday(){
	var date = new Date();
	return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
}

function inviaOrdine(){
	var id = generatoreOrdine();
    var description = document.getElementById("nome-attivita").value;
    var date =  getToday();
    var address = document.getElementById("indirizzo-ordine").value; 
    var data_string = "id="+id+"&description="+description+"&date="+date+"&address="+address;
	$.ajax({
          type:"post",
          url:"../dist/php/addOrder.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "true")
              	$('#ModalSuccessOrder').modal("show");
              else
              	alert("Si è verificato un errore col database. Riprovare");
          }
      });
}

function verificaFormEInvia(){
	/* L'attività potremmo metterla con una select che prende i negozi dalla tabella shop + alcune 
	attività standard statiche (es. sorveglianza, ...) */
	$("#error-attivita").text("");
	$("#error-indirizzo").text("");
	var debug = 0;
	var attivita = document.getElementById("nome-attivita").value;
	var indirizzo = document.getElementById("indirizzo-ordine").value;
	if(attivita == 0){
		$("#error-attivita").text("Scegliere attività");
		debug = 1;
	}
	if(indirizzo == ""){
		$("#error-ordine").text("Inserire un indirizzo");
		debug = 1;
	}

	if(debug)
		return false;

	inviaOrdine();
}

function validatePassword(){
	var new_password = document.getElementById("orangeForm-pass2Reg");
	if(!samePassword(new_password, document.getElementById("orangeForm-pass3Reg"))) {
        displayErrorOnField("orangeForm-pass3Reg", "control-PasswordReg", "le password non corrispondono");
        return false;
	}
	
	var old_password = document.getElementById("orangeForm-passReg").value;
	var data_string = "orangeForm-passReg="+old_password+"&orangeForm-pass2Reg="+new_password.value;
	$.ajax({
		type:"post",
		url:"../dist/php/changePassword.php",
		data:data_string,
		cache:false,
		success: function(result){
			if(result == "true") {
				$('#control-PasswordReg').html('');
				$('#modalSuccessChangePassword').modal("show");
			}
			else if(result == "false")
				displayErrorOnField("orangeForm-pass3Reg", "control-PasswordReg", "Vecchia password errata");
			else
				displayErrorOnField("orangeForm-pass3Reg", "control-PasswordReg", "Errore imprevisto, riprova");
		}
	});
}
