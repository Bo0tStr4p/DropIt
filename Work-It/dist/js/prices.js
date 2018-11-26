function choose_paypal(){
  var r = document.getElementById('print_choose');
  r.innerHTML = " \
  <hr style='margin-top:4%; margin-bottom: 4%;' class='col-5'>\
            <button style='max-width: 50%; margin: auto;' class='btn btn-primary btn-lg btn-block' type='submit'>Acquista con PayPal <i style='margin-left: 2%;' class='fa fa-paypal' aria-hidden='true'></i></button>";
}

function choose_bitcoin(){
  var r = document.getElementById('print_choose');
  r.innerHTML = " \
  <h2 style='margin-top: 4%; margin-bottom: 4%;'' class='text-center'>Wallet: 1XXXXSLRHtKNngkdXEeobR76b53LXXXXXX</h2>\
          <hr class='col-5'>\
            <button style='max-width: 50%; margin: auto;' class='btn btn-primary btn-lg btn-block' type='submit'>Acquista con Bitcoin <i style='margin-left: 2%;'' class='fa fa-bitcoin' aria-hidden='true'></i></button>\
  ";
}

function choose_credit_card(){
  var r = document.getElementById('print_choose');
  r.innerHTML = " \
<div style='margin-top: 5%;'class='row'> \
              <div class='col-md-6 mb-3'> \
                <label for='cc-name123'>Proprietario Carta</label> \
                <input type='text' class='form-control' id='cc-name123' placeholder='' required> \
                <small class='text-muted'>Proprietario scritto sulla carta</small> \
                <div class='invalid-feedback'>\
                  Name on card is required\
                </div>\
              </div>\
              <div class='col-md-6 mb-3'>\
                <label for='cc-number123'>Numero carta di credito</label>\
                <input type='text' class='form-control' id='cc-number123' placeholder='' required>\
                <div class='invalid-feedback'>\
                  Credit card number is required\
                </div>\
              </div>\
            </div>\
            <div class='row'>\
              <div class='col-md-3 mb-3'>\
                <label for='cc-expiration123'>Scadenza</label>\
                <input type='text' class='form-control' id='cc-expiration123' placeholder='' required>\
                <div class='invalid-feedback'>\
                  Expiration date required\
                </div>\
              </div>\
              <div class='col-md-3 mb-3'>\
                <label for='cc-cvv123'>CCV/CVV</label>\
                <input type='text' class='form-control' id='cc-cvv123' placeholder='' required>\
                <div class='invalid-feedback'>\
                  Security code required\
                </div>\
              </div>\
            </div>\
\
            <hr class='mb-4'>\
\
            <button style='max-width: 50%; margin: auto;' class='btn btn-primary btn-lg btn-block' type='submit'>Acquista con Carta <i style='margin-left: 2%;' class='fa fa-credit-card' aria-hidden='true'></i></button>\
";
}
