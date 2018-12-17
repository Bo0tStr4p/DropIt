<?php
            
    $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            
    session_start();
    $email = $_SESSION['userid'];
    $pass  = $_SESSION['passid'];
    $old_password = md5($_POST['orangeForm-passReg']);

    if($pass != $old_password)
        echo "false";

    else {
        $new_password = md5($_POST['orangeForm-pass2Reg']);
        /*$q1="select password from myuser where email= $1";
        $result=pg_query_params($dbconn, $q1, array($email));
        $line=pg_fetch_array($result,null,PGSQL_ASSOC);*/

        $q2 = "update myuser set password=$1 where email=$2";
        $result=pg_query_params($dbconn,$q2,array($new_password, $email));

        if($result)     echo "true";
        else            echo "Error";
    }    
?>