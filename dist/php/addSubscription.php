<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $sub = $_POST['plan'];
    $subDate = $_POST['SubscriptionDate'];

    $q2 = "update myuser set subscription=$1, subscriptiondate=$2 where email=$3";
    $result=pg_query_params($dbconn,$q2,array($sub, $subDate, $email));

    if($result)     echo "true";
    else            echo "Error";    
?>