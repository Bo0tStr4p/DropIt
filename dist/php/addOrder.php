<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $pass  = $_SESSION['passid'];
    $id = $_POST['id'];
    $description = $_POST['description'];
    $date = $_POST['date'];
    $address = $_POST['address'];
    $status = "0";

    pg_query("BEGIN") or die("Culd not connect");
    $q1 = "insert into myorder values($1,$2,$3,$4,$5)";
    $q2 = " insert into makes values($1,$2)";
    $result1=pg_query_params($dbconn,$q1,array($id,$description,$date,$address,$status));
    $result2=pg_query_params($dbconn,$q2,array($id,$email));
    if(!pg_fetch_array($result1,null,PGSQL_ASSOC) && !pg_fetch_array($result2,null,PGSQL_ASSOC)){
    	pg_query("END") or die("not completed transation");
    	echo "true";
    }
    else{
    	pg_query("END") or die("not completed transation");
        echo "false";
    }       
?>