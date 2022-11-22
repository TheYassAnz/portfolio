<?php
session_start();
require_once("library/function/required_function.php");

if ($_POST) {
    if (!est_vide($_POST['_FirstName']) && !est_vide($_POST['_LastName']) && !est_vide($_POST['_Email']) && !est_vide($_POST['_Object']) && !est_vide($_POST['_Text']) && !est_vide($_POST['g-recaptcha-response'])) {
        $_SESSION = array(
            '_FirstName' => $_POST['_FirstName'],
            '_LastName' => $_POST['_LastName'],
            '_Email' => $_POST['_Email'],
            '_Object' => $_POST['_Object'],
            '_Text' => $_POST['_Text']);
        # CAPTCHA AREA
        $captcha = $_POST['g-recaptcha-response'];
        $secretKey = "6LfbkVwiAAAAAJcLuFfJ4XIFHohPXHjckHaj03zU";
        $ip = $_SERVER['REMOTE_ADDR'];
        // post request to server
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
        $response = file_get_contents($url);
        $responseKeys = json_decode($response, true);
        // should return JSON with success as true
        if ($responseKeys["success"]) {
            echo "Le captcha est valide \n";
            # Vérifie si champs = mail
            if (!filter_var($_POST['_Email'], FILTER_VALIDATE_EMAIL)) {
                echo "L'adresse mail n'est pas valide \n";
                header('Location: ./index.php?err=2#contact');
            } else {
                # Si il est present
                // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
                $headers[] = 'MIME-Version: 1.0';
                $headers[] = 'Content-type: text/html; charset=iso-8859-1';
                $headers[] = 'From: <'.$_POST['_Email'].'>';
                $message =
                "
                <html>
                    <body>
                        <p>Nouveau message de". $_POST['_LastName']." ".$_POST['_FirstName']."</p>
                        <p>Société : " . $_POST['_Society']."</p>
                        <p>".$_POST['_Text']."</p>
                    </body>
                </html>
                ";
                if (mail('yassanz.contact@gmail.com', $_POST['_Object'], $message, implode("\r\n", $headers))) {
                    session_destroy();
                    echo "Le mail a correctement été envoyé \n";
                    header('Location: ./index.php?err=sent#contact');
                } else { // Si retour = false
                    echo "Le mail n'a pas pu être envoyé \n";
                    header('Location: ./index.php?err=1#contact');
                }
            }
        }
    } else {
        echo "Le formulaire n'a pas été rempli correctement \n";
        header('Location: ./index.php?err=3#contact');
    }
} else {
    echo "Aucune méthode POST n'a été détecté \n";
    header('Location: ./index.php');
}
