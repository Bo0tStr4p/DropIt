<?php

            $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
                $email = $_POST['orangeForm-email'];
                $cf = $_POST['orangeForm-codiceFiscale'];
                $q1="select * from myuser where email= $1 or cf=$1";
                $result=pg_query_params($dbconn, $q1, array($email,$cf));
                if($line=pg_fetch_array($result,null,PGSQL_ASSOC)){
                    //header("Location: ../../index.html");
                    //echo "<h1> Sorry, you are already a registered user</h1>";
                    setcookie("err_signup", "err_signup", time() + 3600, "/",  0);
                    echo "false";
                }
                else{
                    $password = md5($_POST['orangeForm-passReg']);
                    $name=$_POST['orangeForm-name'];
                    $birthDate = $_POST['orangeForm-date'];
                    $birthCity = $_POST['orangeForm-cittaNascita'];
                    $comune = $_POST['orangeForm-comune'];
                    $address = $_POST['orangeForm-address'];
                    $q2="insert into myuser values ($1,$2,$3,$4,$5,$6,$7,$8)";
                    $data=pg_query_params($dbconn,$q2,array($email,$password,$cf,$name,$birthDate,
                                                            $birthCity,$comune,$address));
                    if($data){
                        //header("Location: registrationCompleted.html");
                        //header("Location: ../../index.html");
                        echo "true";
                        //echo "<h1> Registration is completed. Start using the website <br/></h1>";
                        /*echo "<a href=../Welcome.php?name=$nome> Premi qui
                        </a>
                        per inziare ad utilizzare il sito web";*/
                    }
                    else{
                        echo "false";
                    }
                }
            

        ?>