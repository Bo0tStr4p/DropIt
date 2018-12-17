<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $pass  = $_SESSION['passid'];
    $q2 = "select o.id,o.description,o.orderdate,o.address,o.status from myorder o join makes m on m.id = o.id join myuser u on u.email = m.email where u.email=$1 and u.password=$2 order by o.orderdate desc";
    $result=pg_query_params($dbconn,$q2,array($email,$pass));

    if($line=pg_fetch_all($result)){
    	echo json_encode($line);
    }
    else{
        echo "Error";
    }       
?>