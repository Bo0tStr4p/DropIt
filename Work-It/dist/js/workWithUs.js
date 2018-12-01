/* JQuery per caricare form a seconda della card cliccata */
function caricaHTM(doc) {
    var file = "form/"+doc+".htm";
    $("#dynamic-form").load(file);
}