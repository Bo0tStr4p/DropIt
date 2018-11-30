/* Script Cookies */
/* Viene lanciato ogni volta che viene caricata la pagina */
function cookies(){$('#modalCookie').modal("show");}

document.addEventListener('DOMContentLoaded', function(event) {        
    cookies();
});

/* Script per passare da un modal form all'altro.
Chiude e distrugge il modal in cui è stato cliccato il bottone e lancia la nuova modal */
function modalSwitchHandler(idToClose, idToOpen){ // Singleton
    var fired=false;
    var modal_idToClose = "#"+idToClose
    var modal_idToOpen = "#"+idToOpen
    $(modal_idToClose).modal("hide");
    $(modal_idToClose).on('hidden.bs.modal', function(){
    /* Quando il modal in cui è stato cliccato il bottone viene chiuso, controllo
    la variabile fired perchè altrimenti ogni volta che un modal verrebbe
    chiuso lancerebbe l'altro*/

    $(modal_idToClose).modal("dispose");
    if(fired) return;

    fired=true;
    $(modal_idToOpen).modal("show");
    }); 
}

/* Verifico se l'email rispetta il formato con l'espressione regolare
se l'email non è stata inserita mando alert altrimenti uso la label di errore di default*/
function activateModalPassword(idToClose, idToOpen, idToValidate) {
    var r = new RegExp(".@.");
    var input = document.getElementById(idToValidate).value;
    if(!r.test(input)) {
        if(input == "")
            displayErrorOnField('defaultForm-emailLogin', 'control-emailLogin','errore');
        
        
        //document.getElementById('labelEmailEntra')
        return; //new Effects().fade('labelEmailEntra', down, 4000);
    }

    return modalSwitchHandler(idToClose, idToOpen);
}

/* Evidenzia bordo campo di rosso e genera messaggio di errore dinamico */
function displayErrorOnField(idField, idFeedback, err) {
    document.getElementById(idField).style.borderColor="red";
    document.getElementById(idField).style.borderWidth="2px";
    document.getElementById(idFeedback).innerHTML=err;
}

/* Reimposta i valori di default del campo e del messaggio di errore dinamico generato */
function resetField(idField, idFeedback) {
    document.getElementById(idField).style.borderColor=null;
    document.getElementById(idField).style.borderWidth=null;
    document.getElementById(idFeedback).innerHTML="";
}

function validateRegistration() {
    if(!validateBirthDate()) {
        return false;
    }

    if(!samePassword(document.getElementById("orangeForm-passReg"), 
                     document.getElementById("orangeForm-pass2Reg"))) {
        window.alert("Password diverse");
        displayErrorOnField("orangeForm-pass2Reg", "control-PasswordReg", "le password non corrispondono");
        return false;
    }
    
    return true;
}

function validateBirthDate() {
    /* The substr() method extracts parts of a string,
	beginning at the character at the specified position,
	and returns the specified number of characters*/

	/* parseInt: il 2° parametro è The radix that is used to specify
	which numeral system to be used (10 sta quindi per sistema decimale) */
    giorno = parseInt(stringa.substr(0, 2), 10);
    mese = parseInt(stringa.substr(3, 2), 10);
    anno = parseInt(stringa.substr(6, 4), 10);

	/* Controllo se la data di nascita inserita sia nel passato */
	var date = new Date();
	if(anno < date.getFullYear() ||
      (anno == date.getFullYear() && mese < date.getMonth()+1) ||
      (anno == date.getFullYear() && mese == date.getMonth()+1 && giorno < date.getDate())
	)
        return true;
    
    else return false;
}

function samePassword(id1, id2) {
    return id1.value.equals(id2.value);
}