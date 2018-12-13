<!DOCTYPE html>
<html>
    <head><meta charset="UTF-8"></head>
    <body>

        <?php

            $dbconn = pg_connect("host=localhost port=49987 dbname=DropIt_DB user=postgres") or die('Could not connect: ' . pg_last_error());
            if(!(isset($_POST['registrationButton']))){
                header("Location: ../../index.html");
            }
            else{
                $email = $_POST['orangeForm-email'];
                /* $q1="select * from user where email= $1"; */
                $select = "select *";
                $from = "from myuser";
                $where = "where email=$1";
                $q1 = $select + $from + $where;
                $result=pg_query_params($dbconn, $q1, array($email));
                if($line=pg_fetch_array($result,null,PGSQL_ASSOC)){
                    //header("Location: alreadyRegistered.html");
                    header("Location: ../../index.html");
                    echo "<h1> Sorry, you are already a registered user</h1>";
                    setcookie("err_signup", "err_signup", time() + 3600, "/",  0);
                }
                else{
                    $password = md5($_POST['orangeForm-passReg']);
                    $cf = $_POST['orangeForm-codiceFiscale'];
                    $name=$_POST['orangeForm-name'];
                    $birthDate = $_POST['orangeForm-date'];
                    $birthCity = $_POST['orangeForm-cittaNascita'];
                    $comune = $_POST['orangeForm-comune'];
                    $address = $_POST['orangeForm-address'];
                    $q2="insert into user values ($1,$2,$3,$4,$5,$6,$7,$8)";
                    $data=pg_query_params($dbconn,$q2,array($email,$password,$cf,$name,$birthDate,
                                                            $birthCity,$comune,$address));
                    if($data){
                        //header("Location: registrationCompleted.html");
                        header("Location: ../../index.html");
                        echo "<h1> Registration is completed. Start using the website <br/></h1>";
                        /*echo "<a href=../Welcome.php?name=$nome> Premi qui
                        </a>
                        per inziare ad utilizzare il sito web";*/
                    }
                }
            }

        ?>

    </body>
</html>