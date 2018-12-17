<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $img = $_POST['changeImage'];
    $q2 = "update myuser set picture=$1 where email=$2";
    $result=pg_query_params($dbconn,$q2,array($img, $email));

    if($result)     echo "true";
    else            echo "Error";    
?>