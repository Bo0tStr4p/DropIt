/* Banner Cookies */
function cookies() {
    $('#modalCookie').modal("show");
}

function isAlreadyLoggedInMaster(){
  
}

/* Viene lanciato ogni volta che viene caricata la pagina, se i cookie non sono stati accettati
mostra il banner altrimenti no */
document.addEventListener('DOMContentLoaded', function(event) {
    if(localStorage.getItem("cookie") == null) {
        cookies();
        $("#cookie_button").click(function(){
            localStorage.setItem("cookie", true);
        });
    }
    
    /* Verifico se ho compilato la form di contatto, in caso positivo lancio la modal */
    if(sessionStorage.getItem("showModalSuccessContact") == "true") {
        sessionStorage.removeItem("showModalSuccessContact");
        $("#ModalSuccessContact").modal("show");
    }

    /* Verifico se il login ha generato errori */
    /*if(getCookie("err_login") != "") {
        deleteCookie("err_login");
        $('#modalSignInForm').modal("show");
        $('#modalSignInForm').on('shown.bs.modal', function(){
            displayErrorOnField('defaultForm-emailLogin', 'control-emailLogin', 'errore: email o password non valida');
        }); 
    }*/
    
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
        
        return;
    }

    $(idToOpen).modal("show");
    return modalSwitchHandler(idToClose, idToOpen);
}

/* Evidenzia bordo campo di verde e genera messaggio di ok dinamico */
function displayOkOnField(idField, idFeedback) {
    document.getElementById(idFeedback).style.color="#34ce57";
    document.getElementById(idField).style.borderColor="#34ce57";
    document.getElementById(idField).style.borderWidth="2px";
    document.getElementById(idFeedback).innerHTML="corretto";
}

/* Evidenzia bordo campo di rosso e genera messaggio di errore dinamico */
function displayErrorOnField(idField, idFeedback, err) {
    document.getElementById(idFeedback).style.color="red";
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
    if(!samePassword(document.getElementById("orangeForm-passReg"), 
                     document.getElementById("orangeForm-pass2Reg"))) {
        displayErrorOnField("orangeForm-pass2Reg", "control-PasswordReg", "le password non corrispondono");
        return;
    }

      var email = document.getElementById("orangeForm-email").value;
      var password = document.getElementById("orangeForm-passReg").value;
      var cf = document.getElementById("orangeForm-codiceFiscale").value;
      var name = document.getElementById("orangeForm-name").value;
      var date = document.getElementById("orangeForm-date").value;
      var city = document.getElementById("orangeForm-cittaNascita").value;
      var comune = document.getElementById("orangeForm-comune").value;
      var address = document.getElementById("orangeForm-address").value;
      var data_string = "orangeForm-email="+email+"&orangeForm-codiceFiscale="+cf+"&orangeForm-passReg="+password+"&orangeForm-name="+name+"&orangeForm-date="+date+"&orangeForm-cittaNascita="+city+"&orangeForm-comune="+comune+"&orangeForm-address="+address;

      $.ajax({
          type:"post",
          url:"dist/php/validateRegistration.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "true")
                modalSwitchHandler('modalSignUpForm','ModalSuccessRegistration');
              else{
                $('#error-login-registration').html("Utente già registrato!");
                }
          }
      });
    
}

function validateRegistrationInside() {
    if(!samePassword(document.getElementById("orangeForm-passReg"), 
                     document.getElementById("orangeForm-pass2Reg"))) {
        displayErrorOnField("orangeForm-pass2Reg", "control-PasswordReg", "le password non corrispondono");
        return;
    }

      var email = document.getElementById("orangeForm-email").value;
      var password = document.getElementById("orangeForm-passReg").value;
      var cf = document.getElementById("orangeForm-codiceFiscale").value;
      var name = document.getElementById("orangeForm-name").value;
      var date = document.getElementById("orangeForm-date").value;
      var city = document.getElementById("orangeForm-cittaNascita").value;
      var comune = document.getElementById("orangeForm-comune").value;
      var address = document.getElementById("orangeForm-address").value;
      var data_string = "orangeForm-email="+email+"&orangeForm-codiceFiscale="+cf+"&orangeForm-passReg="+password+"&orangeForm-name="+name+"&orangeForm-date="+date+"&orangeForm-cittaNascita="+city+"&orangeForm-comune="+comune+"&orangeForm-address="+address;

      $.ajax({
          type:"post",
          url:"../dist/php/validateRegistration.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "true")
                modalSwitchHandler('modalSignUpForm','ModalSuccessRegistration');
              else{
                $('#error-login-registration').html("Utente già registrato!");
                }
          }
      });
    
}

function birthdateStatus() {
    var s = validateBirthDate(document.getElementById("orangeForm-date").value);
    if(s == -1) displayErrorOnField("orangeForm-date", "control-dateReg", "errore");
    else if(s > 0) displayErrorOnField("orangeForm-date", "control-dateReg", "errore: utente minorenne di anni "+s);
    else displayOkOnField("orangeForm-date", "control-dateReg");
}

function validateBirthDate(input) {
    var r = new RegExp("([1-9]|(0[1-9]|1[0-9]|2[0-9]|3[01]))/([1-9]|0[1-9]|1[012])/(19|20)[0-9]{2}");
    if(!r.test(input))
        return -1;

    /* The substr() method extracts parts of a string,
	beginning at the character at the specified position,
	and returns the specified number of characters*/

	/* parseInt: il 2° parametro è The radix that is used to specify
    which numeral system to be used (10 sta quindi per sistema decimale) */
    var i = 0; // uso l'indice per muovermi nella stringa a seconda dell'input dell'utente
    var day = 0;
    var month = 0;
    var year = 0;
    var str = input.substr(0, 2);

    if(isNaN(str)) {
        day = parseInt(str.charAt(0), 10);
        i = 2;
    }
    else {
        day = parseInt(str, 10);
        i = 3;
    }

    str = input.substr(i, 2);
    

    if(isNaN(str)) {
        month = parseInt(str.charAt(0), 10) - 1;
        i += 2;
    }
    else {
        month = parseInt(str, 10) - 1;
        i += 3;
    }
    
    year = parseInt(input.substr(i, 4), 10);

    /* Controllo se l'utente abbia almeno 18 anni */
    var birthday = new Date(year, month, day);
    var today = new Date();
    
    var years = today.getFullYear() - birthday.getFullYear();

    /* Controllo se l'utente ha inserito una data successiva all'anno corrente */
    if(years < 0)
        return -1;

    /* Imposto il compleanno all'anno corrente per quanto detto a riga 97 */
    birthday.setFullYear(today.getFullYear());

    /* Se l'utente non ha ancora compiuto gli anni devo sottrarre uno */
    if(today < birthday) 
        years--;

    if(years >= 18) return 0;
    else return years;
}

function samePassword(id1, id2) {
    return id1.value == (id2.value);
}

/* Per mostrare la modal al caricamento successivo della pagina (causata dalla action della form)
, setto un parametro nel sessionStorage che andrò a verificare ad ogni caricamento della pagina */
function validateContact(idModalSuccess) {
    var s = "show"+idModalSuccess;
    sessionStorage.setItem(s, true);
    return true;
}

/* Ritorna il cookie nome se presente altrimenti la stringa vuota */
function getCookie(nome) {
    var name = nome + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  function deleteCookie(name){
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function validateLogin() {
      var email = document.getElementById("defaultForm-emailLogin").value;
      var password = document.getElementById("defaultForm-passLogin").value;
      var data_string = "defaultForm-emailLogin="+email+"&defaultForm-passLogin="+password;

      $.ajax({
          type:"post",
          url:"dist/php/validateLogin.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "true")
                window.location.replace("views/home.html");
              else
                $("#error-login").html(result);
          }
      });
    }



    function validateLoginInside() {
      var email = document.getElementById("defaultForm-emailLogin").value;
      var password = document.getElementById("defaultForm-passLogin").value;
      var data_string = "defaultForm-emailLogin="+email+"&defaultForm-passLogin="+password;

      $.ajax({
          type:"post",
          url:"../dist/php/validateLogin.php",
          data:data_string,
          cache:false,
          success: function(result){
              if(result == "true")
                window.location.replace("home.html");
              else
                $("#error-login").html(result);
          }
      });
    }


function alreadyLoggedIn(){
  $.ajax({
  type:"post",
  url:"dist/php/validateLoggedIn.php",
  cache:false,
  success: function(result){
  if(result == "true") {
    window.location.replace("views/home.html");
  }
  else
    $('#modalSignInForm').modal("show");
  }
  });
}

function alreadyLoggedInInside(){
  $.ajax({
  type:"post",
  url:"../dist/php/validateLoggedIn.php",
  cache:false,
  success: function(result){
    if(result == "true") {
      window.location.replace("home.html");
    }
    else
      $('#modalSignInForm').modal("show");
    }
  });
}