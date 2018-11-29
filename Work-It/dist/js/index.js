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
        if(input == ""){
            document.getElementById('defaultForm-emailLogin').style.borderColor="red";
            document.getElementById('control-emailLogin').innerHTML="errore";
            
            window.alert("Inserisci una email");
        }
        
        //document.getElementById('labelEmailEntra')
        return; //new Effects().fade('labelEmailEntra', down, 4000);
    }

    return modalSwitchHandler(idToClose, idToOpen);
}

function validateRegistration() {
    if(!validateCity(document.getElementById('orangeForm-cittaNascita'))) {
        window.alert("Inserire città di nascita corretta");
        return false;
    }

    if(!validateAddress(document.getElementById("orangeForm-address"))) {
        window.alert("Inserire indirizzo corretto");
        return false;
    }

    if(!samePassword(document.getElementById("orangeForm-passReg"), 
                     document.getElementById("orangeForm-pass2Reg"))) {
        window.alert("Password diverse");
        return false;
    }
    
    return true;
}

function validateCity(id) {
    var v = id.value;
    window.alert("valore città: "+v);
    if(!isNaN(v)) return false;
    return true;
}

function validateAddress(id) {
    return validateCity(id);
}

function samePassword(id1, id2) {
    return id1.value.equals(id2.value);
}