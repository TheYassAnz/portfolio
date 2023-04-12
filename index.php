<?php
session_start();
require_once('library/includes/global_variables.php'); // Inclut les variables globales (SESSION)
require_once('library/includes/connexionPDO.php'); // Inclut le script de connexion à la BDD
require_once('library/function/required_function.php'); // Inclut les fonctions utiles
?>
<!-- ®2023 YassAnz Corporation. Tout droit réservé/All rights reserved -->
<!-- Using Bootstrap 5.2.2 -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_SESSION['WEBSITE_TITLE'] ?></title>
    <!-- Local Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- Local Personalized Bootstrap CSS -->
    <link href="css/add_style.css" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="16x16" href="./img/icon.svg">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style type="text/css">
        .accordion-item,
        .card {
            border: none;
        }
    </style>
</head>

<body>
    <header>
        <!-- TOP TITLE -->
        <div id="website-title" class="container-fluid text-center">
            <div class="p-5">
                <a class="text-dark text-decoration-none display-4" href="#"><?= $_SESSION['WEBSITE_TITLE'] ?></a>
            </div>
        </div>
        <!-- NAV -->
        <nav id="navbar_top" aria-label="Menu principal" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a id="navbar-brand" class="navbar-brand" href="#"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#qui-suis-je">Qui suis-je ?</a>
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
                            <a class="nav-link" href="#stages">Stages</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./veille-technologique">Veille technologique</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    <div class="d-flex my-2 my-lg-0">
                        <a class="navbar-brand" target="blank" href="<?= $_SESSION['LINKEDIN_SRC'] ?>">
                            <span class="bi bi-linkedin" style="font-size: 1.5rem; color: black;"></span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", function() {
                window.addEventListener('scroll', function() {
                    let height = document.getElementById('website-title').offsetHeight;
                    if (window.scrollY > height) {
                        document.getElementById('navbar_top').classList.add('fixed-top');
                        // add padding top to show content behind navbar
                        navbar_height = document.querySelector('.navbar').offsetHeight;
                        document.body.style.paddingTop = navbar_height + 'px';
                        document.getElementById('navbar-brand').innerText = '';
                    } else {
                        document.getElementById('navbar_top').classList.remove('fixed-top');
                        // remove padding top from body
                        document.body.style.paddingTop = '0';
                        document.getElementById('navbar-brand').innerText = '';
                    }
                });
            });
        </script>
    </header>
    <!-- MAIN -->
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
                    <!-- <p class="lead">Mon parcours</p> -->
                </div>
            </div>
            <div class="container-fluid">
                <!-- ACCORDION SECTION -->
                <div class="accordion p-5" id="accordionExperience">
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
                        <div class="accordion-item">
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
                        </div>';
                            } else {
                                echo '
                        <div class="card">
                            <div class="card-body p-1">
                                <h4 class="mt-0 mb-1">' . $row["exp_libelle"] . ', ' . $row["exp_societe"] . ', ' . $row["exp_lieu"] . '</h4>
                                <p class="lead">
                                    <span class="small">' . $row["exp_debut_mois"] . '. ' . $row["exp_debut_annee"] . ' - ' . $row["exp_fin_mois"] . '. ' . $row["exp_fin_annee"] . ' (' . $row["exp_duree"] . ')' . '</span>
                                </p>
                                <p class="card-text">' . $row["exp_description"] .  '</p>
                            </div>
                        </div>
                                ';
                            }
                            echo '<hr class="my-3 m-auto w-50"/>';
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
        <!-- FORMATIONS -->
        <div id="formations">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Formations académiques</span>
                </div>
            </div>
            <div class="container-fluid">
                <div class="p-5">
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
                            echo '<hr class="my-3 m-auto w-50"/>';
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
        <!-- COMPÉTENCES -->
        <div id="competences">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Mes compétences</span>
                    <p class="lead">Mes acquis</p>
                </div>
            </div>
            <div class="container-fluid p-5">
                <div class="row">
                    <?php
                    $res = $conn->prepare("SELECT * FROM competences ORDER BY com_id DESC"); // Préparation de la requête
                    try {
                        $res->execute();
                    } catch (PDOException $e) {
                        echo "Execution Error";
                    }
                    // Exécution de la requête
                    $tab = $res->fetchAll(); // Enregistrement du résultat sous forme de tableau
                    // var_dump($tab);
                    foreach ($tab as $key => $row) {
                        echo '<div class="col-sm-3">
                        <div class="card mb-3 bg-light border">
                            <div class="card-body">
                                <h5 class="card-title">' . $row["com_libelle"] . '</h5>
                                <p class="card-text">' . $row["com_des"] . '</p>
                            </div>
                        </div>
                    </div>';
                    }
                    ?>

                </div>
            </div>
        </div>
        <!-- STAGES -->
        <div id="stages">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Mes stages</span>
                </div>
            </div>
            <div class="container-fluid p-5 bg-light">
                <div class="row">
                    <div class="col-sm-6 ">
                        <div class="card text-center border p-3 bg-light">
                            <div class="card-body">
                                <h5 class="card-title text-center">Développeur Full-Stack</h5>
                                <p class="card-text">CEOS Tech</p>
                                <p class="card-text">Notions : ReactJS, Django</p>

                                <a href="stage_02.php" class="btn btn-primary">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 ">
                        <div class="card text-center border p-3 bg-light">
                            <div class="card-body">
                                <h5 class="card-title text-center">Technicien support informatique</h5>
                                <p class="card-text">DHL Aviation France</p>
                                <p class="card-text">Notions : Support, Masterisation</p>
                                <a href="stage_01.php" class="btn btn-primary">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="projets">
            <div class="container-fluid bg-light">
                <div class="text-center p-5">
                    <span class="display-4">Mes projets</span>
                </div>
            </div>
            <div class="container-fluid p-5 bg-light">
                <div class="row">
                    <div class="col-sm-6 ">
                        <div class="card text-center border p-3 bg-light">
                            <div class="card-body">
                                <h5 class="card-title text-center">Projet GILLA</h5>
                                <p class="card-text">5 septembre 2022 au 17 décembre 2022</p>
                                <p class="card-text">Notions : Joomla, PHP</p>

                                <a href="projet_gilla.php" class="btn btn-primary">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 ">
                        <div class="card text-center border p-3 bg-light">
                            <div class="card-body">
                                <h5 class="card-title text-center">Portfolio</h5>
                                <p class="card-text">Actuellement en développement</p>
                                <p class="card-text">Notions : PHP, JS, SQL, Bootstrap</p>
                                <a href="projet_portfolio.php" class="btn btn-primary">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- CONTACT -->
        <div id="contact">
            <div class="container-fluid">
                <div class="p-5 row row-cols-1 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 bg-light d-flex">
                    <!-- COORDONNÉES -->
                    <div class="col">
                        <h1 class="display-4">Me contacter</h1>
                        <p class="lead">Je serais ravi d'échanger avec vous.</p>
                        <hr class="my-4">
                        <div class="row g-5">
                            <a class="col-1" data-toggle="tooltip" data-placement="right" title="yassanz.contact@gmail.com" href="mailto:yassanz.contact@gmail.com">
                                <span class="bi bi-envelope m-2" style="font-size: 1.5rem; color: black;"></span>
                            </a>
                            <a class="col-1" data-toggle="tooltip" data-placement="right" title="07 52 70 17 42" href="tel:+33752701742">
                                <span class="bi bi-telephone-fill m-2" style="font-size: 1.5rem; color: black;"></span>
                            </a>
                        </div>
                    </div>
                    <!-- FORMULAIRE -->
                    <div class="col">
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
                                <label class="form-label" for="_Society">Société : <small class="text-muted">(facultatif)</small></label>
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
                                <div style="width:10px;" class="g-recaptcha" data-sitekey="6LfbkVwiAAAAAPtNwsE5A2awWv2jvaNEhsSM7EmA"></div>
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
        <nav class="nav flex-column p-5">
            <h5>Sommaire</h5>
            <a href="#" class="nav-link text-muted">Accueil</a>
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
                        <span class="bi bi-linkedin" style="font-size: 1.5rem; color: black;"></span>
                    </a>
                </li>
            </ul>
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
<!-- ®2022 YassAnz Corporation. Tout droit réservé/All rights reserved -->