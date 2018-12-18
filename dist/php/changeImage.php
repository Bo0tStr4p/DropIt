<?php  
    // Percorso della cartella dove mettere i file caricati dagli utenti
    $uploaddir = 'myuploads/';

    // Recupero il percorso temporaneo del file
    $userfile_tmp = $_FILES['changeImage']['tmp_name'];

    // Controllo se il file è un'immagine
    if (!getimagesize($userfile_tmp)) {
        echo 'Puoi inviare solo immagini';
        exit;    
    }

    session_start();

    unlink($uploaddir.$_SESSION['userid'].'.png');
    
    // Recupero il nome originale del file caricato
    $userfile_name = $_FILES['changeImage']['name'];

    // Prendo l'estensione del file
    $extension = end(explode(".", $userfile_name));

    // Creo nuovo nome per l'immagine con l'email dell'utente (primary key)
    $newfilename = $_SESSION['userid'] .".".$extension;

    // Copio il file dalla sua posizione temporanea alla mia cartella upload
    if(move_uploaded_file($userfile_tmp, $uploaddir . $newfilename))
       echo "Ok";// header("Location: ../../views/home.html");     //echo "true";
    else    echo "Error";  
?>