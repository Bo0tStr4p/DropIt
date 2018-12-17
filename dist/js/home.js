function caricaSezione(e){
	var directory = 'home_pages/'+e+'.htm #main';
	 $( "#main" ).load(directory);
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
	var attivita = $("#nome-attivita");
	var indirizzo = $("indirizzo-ordine");

	if(attivita.val() == ""){
		$("#error-attivita").text("Inserire nome attività");
	}

	if(indirizzo.val() == ""){
		$("#error-indirizzo").text("Inserire un indirizzo");
	}

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