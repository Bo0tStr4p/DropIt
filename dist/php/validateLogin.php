<!DOCTYPE html>
<html>
    <head><meta charset="UTF-8"></head>
    <body>
        <?php

            $dbconn = pg_connect("host=localhost port=5432 dbname=DropItDatabase user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            //if(!(isset($_POST['loginButton']))){
            //    header("Location: ../../index.html");

                $email = $_POST['defaultForm-emailLogin'];
                $password = $_POST['defaultForm-passLogin'];
                $q1="select name from myuser where email=$1 and password=$2";
                /*$select = "select name";
                $from = "from myuser";
                $where = "where email=$1 and password=$2";
                $q1 = $select + $from + $where;*/
                $result=pg_query_params($dbconn,$q1,array($email,md5($password)));
                if($line=pg_fetch_array($result,null,PGSQL_ASSOC)){
                    $nome=$line['name'];
                    header("Location: ../../views/home.html");
                }
                else{

                    /* setcookie(name, value, expire, path, domain, security);
                    Name − This sets the name of the cookie and is stored in an environment variable 
                    called HTTP_COOKIE_VARS. This variable is used while accessing cookies.

                    Value − This sets the value of the named variable and is the content that you 
                    actually want to store.

                    Expiry − This specify a future time in seconds since 00:00:00 GMT on 1st Jan 1970. 
                    After this time cookie will become inaccessible. If this parameter is not set then 
                    cookie will automatically expire when the Web Browser is closed.

                    Path − This specifies the directories for which the cookie is valid. A single forward
                    slash character permits the cookie to be valid for all directories.

                    Domain − This can be used to specify the domain name in very large domains and must 
                    contain at least two periods to be valid. All cookies are only valid for the host and 
                    domain which created them.

                    Security − This can be set to 1 to specify that the cookie should only be sent by 
                    secure transmission using HTTPS otherwise set to 0 which mean cookie can be sent by 
                    regular HTTP. */
                    setcookie("err_login", "err_login", time() + 3600, "/",  0);
                    header("Location: ../../index.html");

                    //$data = $dom->getElementById("myElement");
                    //$html = $dom->saveHTML($data); QUESTO E' PER ESTRARRE

                    //echo "Error, not registred";
                } 
            
        ?>
    </body>
</html>