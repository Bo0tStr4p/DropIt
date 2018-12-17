<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $pass  = $_SESSION['passid'];
    $category = $_POST['category'];
    $q2 = "select name from shop where category = $1";
    $result=pg_query_params($dbconn,$q2,array($category));

    if($line=pg_fetch_all($result)){
    	echo json_encode($line);
    }
    else{
        echo "Error";
    }       
?>