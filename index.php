<?php
session_start();
require_once('library/includes/global_variables.php'); // Inclut les variables globales (SESSION)
require_once('library/includes/connexionPDO.php'); // Inclut le script de connexion à la BDD
require_once('library/function/required_function.php'); // Inclut les fonctions utiles
?>
<!-- ®2024 Yassine ANZAR BASHA. Tout droit réservé/All rights reserved -->
<!-- Using Bootstrap 5.3.2 -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_SESSION['WEBSITE_TITLE'] ?></title>
    <!-- Online Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Online Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Online Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body>
    <header class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-white mx-5 my-2">
            <a class="navbar-brand" href="#">Yassine ANZAR BASHA</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#a-propos">A propos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#experiences">Expériences</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#formations">Formations</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#competences">Compétences</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-outline-primary" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <body>
        <!-- MAIN -->
        <main class="text-justify">
            <!-- QUI SUIS-JE -->
            <div id="a-propos">
                <div class="m-5">
                    <div class="mb-3">
                        <div class="row g-5">
                            <img src="./img/main-page.svg" class="img-fluid col-lg-4" alt="...">
                            <div class="col-lg-8 pt-3">
                                <h1 class="display-4 mb-5">Développer le monde de demain, <strong>ensemble</strong>.</h1>
                                <h2 class="display-6 mb-5">Passionné par les <strong>nouvelles technologies</strong>, je vous aide à propulser l'activité de votre entreprise grâce à des sites web dynamiques, sobres et accessibles.
                                </h2>
                                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                    <strong>Information :</strong> Vous cherchez un alternant dans le domaine de l'IT ? Si oui, <a class="text-decoration-none" href="mailto:yassanz.contact@gmail.com"><strong>contactez-moi</strong></a> !
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                <div class="d-flex my-5">
                                    <a class="me-3 text-dark" target="blank" href="<?= $_SESSION['LINKEDIN_SRC'] ?>">
                                        <span class="bi bi-linkedin fs-1"></span>
                                    </a>
                                    <a class="me-3 text-dark" target="blank" href="<?= $_SESSION['GITHUB_SRC'] ?>">
                                        <span class="bi bi-github fs-1"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- EXPÉRIENCES PROFESSIONNELLES -->
            <div id="experiences">
                <div class="row g-0 m-5">
                    <div class="col-lg-4 mb-5">
                        <span class=" display-4">Expériences professionnelles</span>
                    </div>
                    <!-- ACCORDION SECTION -->
                    <div class="col-lg-8 accordion" id="accordionExperience">
                        <?php
                        $res = $conn->prepare("SELECT * FROM experiences ORDER BY exp_id DESC"); // Préparation de la requête
                        try {
                            $res->execute();
                        } catch (PDOException $e) {
                            echo "Execution Error";
                        }
                        // Exécution de la requête
                        $tab = $res->fetchAll(); // Enregistrement du résultat sous forme de tableau
                        if ($tab) {
                            foreach ($tab as $key => $row) {

                                if ($row['exp_missions']) {
                                    echo '
                        <div class="accordion-item mb-4 border border-0">
                            <h2 class="accordion-header" id="heading' . $row["exp_id"] . '">
                            <button class="accordion-button collapsed p-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' . $row["exp_id"] . '" aria-expanded="true" aria-controls="collapse' . $row["exp_id"] . '">
                                <div>
                                    <h4 class="mt-0 mb-1">' . $row["exp_libelle"] . ', ' . $row["exp_societe"] . ', ' . $row["exp_lieu"] . '</h4>
                                    <p class="lead">
                                        <span class="small">' . $row["exp_debut_mois"] . '. ' . $row["exp_debut_annee"] . ' - ' . $row["exp_fin_mois"] . '. ' . $row["exp_fin_annee"] . ' (' . $row["exp_duree"] . ')' . '</span>
                                    </p>
                                    <p>' . $row["exp_description"] . '</p>
                           

                                </div>
                            </button>
                            </h2>
                            <div id="collapse' . $row["exp_id"] . '" class="accordion-collapse collapse" aria-labelledby="heading' . $row["exp_id"] . '" data-bs-parent="#accordionExperience">
                                <div class="accordion-body">
                                    <strong>Missions réalisées</strong>
                                    <p>' . $row["exp_missions"] . '</p>
                                </div>
                                
                            </div>
                        </div>
                        ';
                                } else {
                                    echo '
                        <div class="mb-4">
                            <div class="p-1">
                                <h4 class="mt-0 mb-1">' . $row["exp_libelle"] . ', ' . $row["exp_societe"] . ', ' . $row["exp_lieu"] . '</h4>
                                <p class="lead">
                                    <span class="small">' . $row["exp_debut_mois"] . '. ' . $row["exp_debut_annee"] . ' - ' . $row["exp_fin_mois"] . '. ' . $row["exp_fin_annee"] . ' (' . $row["exp_duree"] . ')' . '</span>
                                </p>
                                <p>' . $row["exp_description"] .  '</p>
                            </div>
                        </div>
                                ';
                                }
                                if (isset($tab[$key + 1])) {
                                    echo '<hr class="mb-3 m-auto w-50"/>';;
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
            <hr class="m-auto w-75" />
            <!-- FORMATIONS -->
            <div id="formations">
                <div class="row g-0 m-5">
                    <div class="col-lg-4 mb-5">
                        <span class=" display-4">Formations</span>
                    </div>
                    <div class="col-lg-8">
                        <?php
                        $res = $conn->prepare("SELECT * FROM formations ORDER BY for_annee DESC"); // Préparation de la requête
                        try {
                            $res->execute();
                        } catch (PDOException $e) {
                            echo "Execution Error";
                        }
                        // Exécution de la requête
                        $tab = $res->fetchAll(); // Enregistrement du résultat sous forme de tableau
                        if ($tab) {
                            foreach ($tab as $key => $row) {
                                echo '
                        <div class="d-flex m-2">
                            <div class="flex-grow-1">
                                <h4 class="mt-0 mb-1">' . $row["for_libelle"] . ', ' . $row["for_etablissement"] . ', ' . $row["for_lieu"] . '</h4>
                                <p class="lead">
                                    <span class="small">' . $row["for_annee"] . '<br>' . $row["for_mention"] . '</span>
                                </p>
                            </div>
                        </div>';
                                if (isset($tab[$key + 1])) {
                                    echo '<hr class="mb-3 m-auto w-50"/>';
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
            <hr class="m-auto w-75" />
            <!-- COMPÉTENCES -->
            <div id="competences">
                <div class="row g-0 m-5">
                    <div class="col-lg-4 mb-5">
                        <span class="display-4">Compétences</span>
                    </div>
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-3 col-md-6">
                                <div class="mb-3">
                                    <h5 class="mb-3">Langages</h5>
                                    <ul>
                                        <li>HTML</li>
                                        <li>CSS</li>
                                        <li>JS</li>
                                        <li>PHP</li>
                                        <li>SQL</li>
                                        <li>Java</li>
                                        <li>C#</li>
                                        <li>Python</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="mb-3">
                                    <h5 class="mb-3">Framworks</h5>
                                    <ul>
                                        <li>Django</li>
                                        <li>React.js</li>
                                        <li>Joomla</li>
                                        <li>React Native</li>
                                    </ul>

                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="mb-3">
                                    <h5 class="mb-3">Outils</h5>
                                    <ul>
                                        <li>Bash</li>
                                        <li>Git</li>
                                        <li>GitHub</li>
                                        <li>API REST</li>
                                        <li>Postman</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="mb-3">
                                    <h5 class="mb-3">Design</h5>
                                    <ul>
                                        <li>Bootstrap</li>
                                        <li>TailwindCSS</li>
                                        <li>Figma</li>
                                        <li>Canva</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CONTACT -->
                <div id="contact">
                    <div class="container-fluid bg-light border">
                        <div class="p-5 row">
                            <!-- COORDONNÉES -->
                            <div class="col-md-4">
                                <h1 class="display-4">Me contacter</h1>
                                <p class="lead">Je serais ravi d'échanger avec vous.</p>
                                <hr class="my-4">
                                <div class="row g-5">
                                    <a class="col-1" data-toggle="tooltip" data-placement="right" title="yassanz.contact@gmail.com" href="mailto:yassanz.contact@gmail.com">
                                        <i class="bi bi-envelope-open fs-4 text-dark"></i>
                                    </a>
                                    <a class="col-1" data-toggle="tooltip" data-placement="right" title="07 52 70 17 42" href="tel:+33752701742">
                                        <span class="bi bi-telephone-fill fs-4 text-dark"></span>
                                    </a>
                                </div>
                            </div>
                            <!-- FORMULAIRE -->
                            <div class="col-md-8">
                                <form class="needs-validation" method="<?= $_SESSION["FORM_METHOD"] ?>" action="<?= $_SESSION["FORM_ACTION"] ?>" novalidate>
                                    <div class="row row-cols-1 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-2 py-2">
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
                                    <div class="col py-2">
                                        <label class="form-label" for="_Society">Société :</label>
                                        <input type="text" class="form-control" name="_Society" id="_Society" novalidate />
                                    </div>
                                    <div class="col py-2">
                                        <label class="form-label" for="_Email">E-mail : </label>
                                        <input type="email" value="<?php show_if_defined($_SESSION['_Email']); ?>" class="text-lowercase form-control" name="_Email" id="_Email" required>
                                        <small id="emailHelp" class="form-text text-muted">Favoriser votre adresse mail professionnelle.</small>
                                        <div class="invalid-feedback">
                                            Merci de renseigner une adresse mail valide.
                                        </div>
                                    </div>
                                    <div class="col py-2">
                                        <label class="form-label" for="_Object">Objet : </label>
                                        <input type="text" value="<?php show_if_defined($_SESSION['_Object']); ?>" class="form-control" name="_Object" id="_Object" required>
                                        <div class="invalid-feedback">
                                            Merci de renseigner l'objet de votre mail.
                                        </div>
                                    </div>
                                    <div class="col py-2">
                                        <label class="form-label" for="_Text">Votre message : </label>
                                        <textarea class="form-control" value="<?php show_if_defined($_SESSION['_Text']); ?>" name="_Text" id="_Text" rows="3" required></textarea>
                                        <div class="invalid-feedback">
                                            Votre mail doit contenir un message.
                                        </div>
                                    </div>
                                    <div class="col py-2">
                                        <div style="width:10px;" class="g-recaptcha" data-sitekey="6LeLe2MpAAAAAIHEgtKpC-t97TgALP_oKFL7t8MB"></div>
                                    </div>
                                    <button type="submit" class="btn btn-primary fs-5">Envoyer</button>
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
                <!-- MODAL -->
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
            <nav class="nav flex-column m-5">
                <h5>Plan du site</h5>
                <a href="#a-propos" class="nav-link text-muted">À propos</a>
                <a href="#experiences" class="nav-link text-muted">Expériences</a>
                <a href="#formations" class="nav-link text-muted">Formations</a>
                <a href="#competences" class="nav-link text-muted">Compétences</a>
                <a href="#contact" class="nav-link text-muted">Contact</a></li>
            </nav>
            </div>
            <div class="d-flex justify-content-between mx-5">
                <p>&copy;<?= date('Y') . ' Yassine ANZAR BASHA. Tout droit réservé.' ?></p>
                <div class="row g-2">
                    <a class="col-6 link-dark" target="_blank" href="<?= $_SESSION['LINKEDIN_SRC'] ?>">
                        <span class="text-dark fs-3 bi bi-linkedin"></span>
                    </a>
                    <a class="col-6 link-dark" target="_blank" href="<?= $_SESSION['GITHUB_SRC'] ?>">
                        <span class="text-dark fs-3 bi bi-github"></span>
                    </a>
                </div>
            </div>
        </footer>
    </body>
    <!-- JS -->
    <script>
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            keyboard: false
        });
        myModal.show(myModal)
    </script>

</html>
<?php
$conn = null;
session_destroy();
?>
<!-- ®2024 Yassine ANZAR BASHA. Tout droit réservé/All rights reserved -->