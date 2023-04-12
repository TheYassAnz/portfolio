<?php
$servername = "localhost";
$username = "public_user";
$password = "Wokpef93@";
$basedd = "yassanz_2304";
$charset = "utf8";
// Create connection
try {
    $conn = new PDO(
        "mysql:host=$servername;dbname=$basedd;charset=$charset",
        $username,
        $password
    );
} catch (Exception $e) {
    $string = '
    <div class="alert alert-danger m-5" role="alert">
        <h4 class="alert-heading">Oups !</h4>
        <p>Il semblerait que nous rencontrons un problème pour se connecter à la base de donnée. Contactez-moi directement à cette adresse mail : <a class="fw-bold" href="mailto:yassanz.webmaster@gmail.com">yassanz.webmaster@gmail.com</a></p>
        <hr>
        <p class="mb-0">Message de contrôle intermédiaire : ' . $e->getMessage() . '</p>
    </div>';
    die($string);
}
