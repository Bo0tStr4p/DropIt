<?php
        session_start();
        if(isset($_SESSION['userid']) && isset($_SESSION['passid']))
            echo "true"; 
        else
            echo "false";
?>