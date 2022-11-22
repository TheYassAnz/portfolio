<?php
session_start();
require_once('library/includes/global_variables.php'); // Inclut les variables globales (SESSION)
require_once('library/includes/connexionPDO.php'); // Inclut le script de connexion à la BDD
require_once('library/function/required_function.php'); // Inclut les fonctions utiles
?>
<!-- ®2022 YassAnz Corporation. Tout droit réservé/All rights reserved -->
<!-- Using Bootstrap 5.1 -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_SESSION['WEBSITE_TITLE'] ?></title>
    <?php
    include_once('library/includes/template.php');
    ?>
</head>

<body>
    <header>
        <!-- TOP TITLE -->
        <div class="container-fluid text-center">
            <div class="p-5">
                <a class="text-dark text-decoration-none display-4" href="#"><?= $_SESSION['WEBSITE_TITLE'] ?></a>
            </div>
        </div>
        <?php
        include_once('library/includes/navbar.php');
        ?>
    </header>
    <!-- MENU -->
    <main class="text-justify">
        <!-- QUI SUIS-JE -->
        <div id="qui-suis-je">
            <div class="container-fluid bg-light rounded rounded-3">
                <div class="p-5">
                    <span class="display-3">A propos</span>
                    <p class="lead">Mon profil</p>
                    <hr class="my-4">
                    <p style="text-align:justify;">Tout au long de mon parcours, j'ai essayé de donner le meilleur de moi-même. Je ne suis pas toujours parvenu mais ça n'a en aucun cas éteint ma motivation car je fais preuve d'une détermination sans faille. Si vous souhaitez en savoir plus sur mon parcours, poursuivez votre lecture, ou <a class="text-decoration-none text-dark fw-bold" href="#contact">contactez-moi</a> directement.</p>
                </div>
            </div>
        </div>
        <!-- EXPÉRIENCES PROFESSIONNELLES -->
        <div id="experiences">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Expériences professionnelles</span>
                    <p class="lead">Mon parcours</p>
                </div>
            </div>
            <div class="container-fluid">
                <div class="p-5 accordion" id="accordionExperiences">
                    <div class="">
                        <?php
                        $res = $conn->prepare("SELECT * FROM experience ORDER BY exp_id DESC"); // Préparation de la requête
                        try {
                            $res->execute();
                        } catch (PDOException $e) {
                            echo "Execution Error";
                        }
                        // Exécution de la requête
                        $tab = $res->fetchAll(); // Enregistrement du résultat sous forme de tableau
                        if ($tab) {
                            foreach ($tab as $key => $row) {

                                // <div class=\"d-flex my-2\">
                                //         <div class=\"flex-grow-1 w-75\">
                                //             <h4 class=\"mt-0 mb-1\">" . $row["exp_libelle"] . ", " . $row["exp_societe"] . ", " . $row["exp_lieu"] . "</h4>
                                //             <p class=\"lead\">
                                //                 <span class=\"small\">" . $row["exp_debut_mois"] . ". " . $row["exp_debut_annee"] . " - " . $row["exp_fin_mois"] . ". " . $row["exp_fin_annee"] . " (" . $row["exp_duree"] . ")" . "</span>
                                //             </p>
                                //             <p>" . $row["exp_description"] . " <a data-bs-toggle=\"collapse\" href=\"#collapseExp" . $row["exp_id"] . "\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExp" . $row["exp_id"] . "\">Missions réalisées
                                //         </a>
                                //         <div class=\"collapse\" id=\"collapseExp" . $row["exp_id"] . "\">
                                //             <div class=\"card card-body\">" . $row["exp_missions"] . "</div>
                                //         </div>
                                //         </p>
                                //         </div>
                                // </div>
                                // ";
                                echo "
                                <div class=\"accordion-item\">
                                <h2 class=\"accordion-header\" id=\"heading$key\">
                                    <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapse$key\" aria-expanded=\"true\" aria-controls=\"collapse$key\">
                                    <div class=\"d-flex my-2\">
                                    <div class=\"flex-grow-1 w-75\">
                                        <h4 class=\"mt-0 mb-1\">" . $row["exp_libelle"] . ", " . $row["exp_societe"] . ", " . $row["exp_lieu"] . "</h4>
                                        <p class=\"lead\">
                                            <span class=\"small\">" . $row["exp_debut_mois"] . ". " . $row["exp_debut_annee"] . " - " . $row["exp_fin_mois"] . ". " . $row["exp_fin_annee"] . " (" . $row["exp_duree"] . ")" . "</span>
                                        </p>
                                        <p>" . $row["exp_description"] . "</p>
                                    </button>
                                </h2>";
                                if ($row["exp_missions"]) {
                                    echo "<div id=\"collapse$key\" class=\"accordion-collapse collapse\" \"aria-labelledby=\"heading$key\" data-bs-parent=\"#accordionExperiences\">
                                    <div class=\"accordion-body\">
                                        <strong>Missions réalisées</strong> " . $row["exp_missions"] . "
                                    </div>
                                </div>
                            </div>";
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <!-- FORMATIONS -->
        <div id="formations">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Formations académiques</span>
                    <p class="lead">Mon parcours</p>
                </div>
            </div>
            <div class="container-fluid bg-light">
                <div class="p-5">
                    <?php
                    $res = $conn->prepare("SELECT * FROM education ORDER BY edu_annee DESC; "); // Préparation de la requête
                    $res->execute(); // Exécution de la requête
                    $tab = $res->fetchAll(); // Initialisation du résultat sous forme de tableau
                    if ($tab) {
                        foreach ($tab as $row) {
                            echo "
                        <div class=\"d-flex m-2\">
                            <div class=\"flex-grow-1\">
                                <h4 class=\"mt-0 mb-1\">" . $row["edu_libelle"] . ", " . $row["edu_etablissement"] . ", " . $row["edu_lieu"] . "</h4>
                                <p class=\"lead\">
                                    <span class=\"small\">" . $row["edu_annee"] . "<br>" . $row["edu_mention"] . "</span>
                                </p>
                                <hr>
                            </div>
                        </div>
                        ";
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
        <!-- CONTACT -->
        <div id="contact">
            <div class="container-fluid">
                <div class="p-5 row row-cols-lg-2 row-cols-md-1 row-cols-sm-1 bg-light d-flex">
                    <!-- COORDONNÉES -->
                    <div class="col">
                        <h1 class="display-4">Me contacter</h1>
                        <p class="lead">Je serais ravi d'échanger avec vous.</p>
                        <hr class="my-4">
                        <a data-toggle="tooltip" data-placement="right" title="yassanz.contact@gmail.com" href="mailto:yassanz.contact@gmail.com">
                            <span class="bi bi-envelope m-2" style="font-size: 1.5rem; color: black;"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="right" title="07 52 70 17 42" href="tel:+33752701742">
                            <span class="bi bi-telephone-fill m-2" style="font-size: 1.5rem; color: black;"></span>
                        </a>
                    </div>
                    <!-- FORMULAIRE -->
                    <div class="col">
                        <form class="needs-validation" method="<?= $_SESSION["FORM_METHOD"] ?>" action="<?= $_SESSION["FORM_ACTION"] ?>" novalidate>
                            <div class="row g-2 py-2">
                                <div class="col">
                                    <label class="form-label" for="_LastName">Nom : </label>
                                    <input type="text" value="<?php show_if_defined($_SESSION['_LastName']); ?>" class="text-uppercase form-control" name="_LastName" id="_LastName" required>
                                    <div class="invalid-feedback">
                                        Merci de renseigner votre nom.
                                    </div>
                                </div>
                                <div class="col">
                                    <label class="form-label" for="_FirstName">Prénom : </label>
                                    <input type="text" value="<?php show_if_defined($_SESSION['_FirstName']); ?>" class="form-control" name="_FirstName" id="_FirstName" required>
                                    <div class="invalid-feedback">
                                        Merci de renseigner votre prénom.
                                    </div>
                                </div>
                            </div>
                            <div class="row g-1 py-2">
                                <label class="form-label" for="_Society">Société : <small class="text-muted">(facultatif)</small></label>
                                <input type="text" class="form-control" name="_Society" id="_Society" novalidate />
                            </div>
                            <div class="row g-1 py-2">
                                <label class="form-label" for="_Email">E-mail : </label>
                                <input type="email" value="<?php show_if_defined($_SESSION['_Email']); ?>" class="text-lowercase form-control" name="_Email" id="_Email" required>
                                <small id="emailHelp" class="form-text text-muted">Favoriser votre adresse mail professionnelle.</small>
                                <div class="invalid-feedback">
                                    Merci de renseigner une adresse mail valide.
                                </div>
                            </div>
                            <div class="row g-1 py-2">
                                <label class="form-label" for="_Object">Objet : </label>
                                <input type="text" value="<?php show_if_defined($_SESSION['_Object']); ?>" class="form-control" name="_Object" id="_Object" required>
                                <div class="invalid-feedback">
                                    Merci de renseigner l'objet de votre mail.
                                </div>
                            </div>
                            <div class="row g-1 py-2">
                                <label class="form-label" for="_Text">Votre message : </label>
                                <textarea class="form-control" value="<?php show_if_defined($_SESSION['_Text']); ?>" name="_Text" id="_Text" rows="3" required></textarea>
                                <div class="invalid-feedback">
                                    Votre mail doit contenir un message.
                                </div>
                            </div>
                            <div class="row g-1 py-2">
                                <div class="g-recaptcha " data-sitekey="6LfbkVwiAAAAAPtNwsE5A2awWv2jvaNEhsSM7EmA"></div>
                            </div>
                            <button type="submit" class="btn btn-primary">Envoyer</button>
                        </form>
                    </div>
                </div>
                <script>
                    // Example starter JavaScript for disabling form submissions if there are invalid fields
                    (function() {
                        'use strict';
                        window.addEventListener('load', function() {
                            // Fetch all the forms we want to apply custom Bootstrap validation styles to
                            var forms = document.getElementsByClassName('needs-validation');
                            // Loop over them and prevent submission
                            var validation = Array.prototype.filter.call(forms, function(form) {
                                form.addEventListener('submit', function(event) {
                                    if (form.checkValidity() === false) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                    form.classList.add('was-validated');
                                }, false);
                            });
                        }, false);
                    })();
                </script>
            </div>
        </div>
        <!-- Modal -->
        <?php
        if ($_GET) {
            if ($_GET['err'] == 'sent') {
                echo '
            <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Message intermédiaire : </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            Votre message a été envoyé avec succès.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
    ';
            } elseif ($_GET['err'] == 1) {
                echo '
            <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Message intermédiaire : </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        Désolé, votre message n\'as pas pu être envoyé.<br>
                        Essayez d\'envoyer directement un mail à cette adresse : <strong><a href="mailto:yassanz.contact@gmail.com">yassanz.contact@gmail.com</a></strong>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    ';
            } elseif ($_GET['err'] == 2) {
                echo '
            <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Message intermédiaire : </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        Merci de renseigner une adresse mail valide (exemple<strong>@</strong>domain.fr).
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    ';
            } elseif ($_GET['err'] == 3) {
                echo '
            <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Message intermédiaire : </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        Merci de remplir les champs du formulaire.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    ';
            }
        }
        ?>
    </main>
    <!-- FOOTER -->
    <footer>
            <nav class="nav flex-column p-5">
                <h5>Sommaire</h5>
                <a href="#accueil" class="nav-link text-muted">Accueil</a>
                <a href="#qui-suis-je" class="nav-link text-muted">Qui-suis-je ?</a>
                <a href="#experiences" class="nav-link text-muted">Expériences</a>
                <a href="#formations" class="nav-link text-muted">Formations</a>
                <a href="<?= $_SESSION['LINKEDIN_SRC'] ?>" class=" nav-link text-muted" target="_blank">LinkedIn</a></li>
                <a href="#contact" class="nav-link text-muted">Contact</a></li>
            </nav>
        </div>
        <div class="d-flex justify-content-between p-5 border-top">
            <p>&copy;<?= date('Y') . ' YassAnz Corporation. Tout droit réservé.' ?></p>
            <ul class="list-unstyled d-flex">
                <li class="ms-3">
                    <a class="link-dark" href="<?= $_SESSION['LINKEDIN_SRC'] ?>">
                        <span class="bi bi-linkedin"></span>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</body>
<!-- JS -->

</html>
<script>
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: false
    });
    myModal.show(myModal)
</script>
<?php
$conn = null;
session_destroy();
?>
<!-- ®2022 YassAnz Corporation. Tout droit réservé/All rights reserved -->