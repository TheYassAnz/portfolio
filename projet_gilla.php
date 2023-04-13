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
                            <a class="nav-link" href="./index.php#qui-suis-je">Qui suis-je ?</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#experiences">Expériences</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#formations">Formations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#competences">Compétences</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#stages">Stages</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#projets">Projets</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./veille-technologique">Veille technologique</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./index.php#contact">Contact</a>
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
    <main>
        <div class="container-fluid bg-light rounded rounded-3 row">
            <div class="p-5 col-sm-6">
                <h3>Projet GILLA</h3>
                <h4></h4>
                <h5 class="fw-light">Date : 5 septembre 2022 au 17 décembre 2022</5>

                    <hr class="my-4">
                    <p style="text-align:justify;">Développement d'une application web de gestion d'incidents du lycée Louis Armand utilisant le framework Joomla 4</p>
                    <p>
                    <ul>
                        <a href="#c-1">
                            <li>Gérer le patrimoine informatique</li>
                        </a>
                        <a href="#c-2">
                            <li>Travailler en mode projet</li>
                        </a>
                        <a href="#c-3">
                            <li>Développer la présence en ligne de l’organisation</li>
                        </a>
                        <a href="#c-4">
                            <li>Mettre à disposition des utilisateurs un service informatique</li>
                        </a>
                    </ul>
                    </p>
            </div>
            <div class="col-sm-6 text-center">
                <img src="./img/gilla-logo.png" class="w-50 m-5" />
            </div>
        </div>

        <div id="c-1" class="container-fluid p-5">
            <div class="container-fluid rounded-3 ">
                <h3>1. Analyse de l'existant</h3>
                <h4 class="text-muted">Compétence : Gérer le patrimoine informatique</h4>
                <p>La gestion des incidents au lycée se fait actuellement de façon désordonnée par email ou oralement à divers personnels responsables au lycée. Les incidents ne sont pas gérés de façon centralisée pour pouvoir les traiter efficacement en fonction des ressources de maintenance disponibles, selon leurs expertises.</p>

                <p>Une application gérée par la région permet de signaler des problèmes informatiques qui sont traités toutes les deux ou trois semaines par un intervenant technique de la région. Elle est en pratique très peu utilisée au lycée.
                </p>
            </div>
            <div class="container-fluid p-5">
                <img class="img-responsive" src="./img/projet/gilla/analyse-de-l-existant.png" />
            </div>
        </div>
        <div id="c-2" class="container-fluid p-5">
            <div class="container-fluid rounded-3">
                <h3>2. Organisation du projet GILLA</h3>
                <h4 class="text-muted">Compétence : Travailler en mode projet</h4>
                <div class="container-fluid px-3">
                    <h5>A. Organisation générale du projet</h5>
                    <p>Le développement s’est fait selon la méthodologie du cycle de vie des logiciels (cycle en « V »)</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
                <div class="container-fluid px-3">
                    <h5>B. Planning</h5>
                    <p>Le planning général du projet GILLA et de ses trois sous-projets (BE : Backend, FE : Frontend, AM : Application Mobile) s’est inscrit dans le calendrier (progression pédagogique) mis en place sur l’année scolaire 2022-2023 comme suit :</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/planning.png" />
                    </div>
                </div>
                <div class="container-fluid px-3">
                    <h5>C. Gestion du projet</h5>
                    <p>Des groupes de travail ont été constitués pour faciliter le partage de connaissance et la collaboration entre les étudiants mis en situation professionnelle lors des travaux pratiques. Des contributions individuelles au projet ont été aussi demandées à chaque étudiant pour permettre à chacun de développer son autonomie.
                    </p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/repartition-du-travail.png" />
                    </div>
                </div>
            </div>

        </div>
        <div id="c-3" class="container-fluid p-5">
            <div class="container-fluid rounded-3">
                <h3>2. Développement du site GILLA</h3>
                <h4 class="text-muted">Compétence : Développer la présence en ligne de l’organisation</h4>
                <p>
                    Ci-dessous, quelques captures du code et de l'aspect du site GILLA.</br>
                    Vous pouvez aussi retrouver la documentation de la création du site GILLA <strong><a href="./files/tp_installer_joomla4_et_creer_le_site_gilla.pdf" target="_blank">ici</a></strong>
                </p>
            </div>
            <div class="container-fluid p-5">
                <div id="carousel-1" class="carousel carousel-dark slide " data-bs-ride="carousel-1">
                    <div class="carousel-inner">
                        <?php
                        $dir = "./img/projet/gilla/developpement"; // Remplacez "chemin/vers/le/dossier" par le chemin absolu de votre dossier contenant les images.
                        $files = scandir($dir); // Scan du dossier pour récupérer les fichiers.
                        $i = 0;
                        foreach ($files as $key => $file) {
                            if ($key == 2) {
                                $active = 'active';
                            } else {
                                $active = '';
                            }
                            $file_info = pathinfo($file); // Récupère les informations du fichier.

                            // Si le fichier est une image, on l'affiche.
                            if (in_array($file_info['extension'], array('jpg', 'jpeg', 'png', 'gif'))) {
                                // echo '<a href="' . $dir . '/' . $file . '"><img class="p-2" width="600px" src="' . $dir . '/' . $file . '"/></a>';
                                echo '
                                <div class="carousel-item ' . $active . '">
                                    <img src="' . $dir . '/' . $file . '" class="d-block w-100" alt="...">
                                </div>';
                            }
                        }


                        ?>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-1" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-1" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="c-4" class="container-fluid p-5">
            <div class="container-fluid rounded-3">
                <h3>3. Réalisation de fiches de tests</h3>
                <h4 class="text-muted">Compétence : Mettre à disposition des utilisateurs un service informatique</h4>
                <p>
                    Ci-dessous, quelques captures des fiches de tests</br>
                </p>
            </div>
            <div class="container-fluid p-5">
                <div class="row">
                    <div class="col-sm-6 px-2 text-center">
                        <iframe src="./files/fiche_de_test_incidents-a-gerer_consulter.pdf" width="400" height="600"></iframe>
                    </div>
                    <div class="col-sm-6 px-2 text-center">
                        <iframe src="./files/fiche_de_test_01.pdf" width="400" height="600"></iframe>
                    </div>
                    <div class="col-sm-6 px-2 text-center">
                        <a href="./files/fiche_de_test_01.pdf" target="_blank"><button type="button" class="btn btn-secondary">Ouvrir le fichier PDF</button></a>
                    </div>
                    <div class="col-sm-6 px-2 text-center">
                        <a href="./files/fiche_de_test_01.pdf" target="_blank" class="mt-2">
                            <button type="button" class="btn btn-secondary">Ouvrir le fichier PDF</button>
                        </a>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-6 px-2 text-center">

                            <iframe src="./files/fiche_de_test_02.pdf" width="400" height="600"></iframe>
                        </div>
                        <div class="col-sm-6 px-2 text-center">

                            <iframe src="./files/fiche_de_test_03.pdf" width="400" height="600"></iframe>
                        </div>
                        <div class="col-sm-6 px-2 text-center">
                            <a href="./files/fiche_de_test_02.pdf" target="_blank" class="mt-2">
                                <button type="button" class="btn btn-secondary">Ouvrir le fichier PDF</button>
                            </a>
                        </div>
                        <div class="col-sm-6 px-2 text-center">
                            <a href="./files/fiche_de_test_03.pdf" target="_blank" class="mt-2">
                                <button type="button" class="btn btn-secondary">Ouvrir le fichier PDF</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                function handleClick() {
                    console.log("click");
                }
            </script>
    </main>
    <!-- FOOTER -->
    <footer>
        <nav class=" nav flex-column p-5">
            <h5>Sommaire</h5>
            <a href="./index.php#contact#" class="nav-link text-muted">Accueil</a>
            <a href="./index.php#contact#qui-suis-je" class="nav-link text-muted">Qui-suis-je ?</a>
            <a href="./index.php#contact#experiences" class="nav-link text-muted">Expériences</a>
            <a href="./index.php#contact#formations" class="nav-link text-muted">Formations</a>
            <a href="<?= $_SESSION['LINKEDIN_SRC'] ?>" class=" nav-link text-muted" target="_blank">LinkedIn</a></li>
            <a href="./index.php#contact#contact" class="nav-link text-muted">Contact</a></li>
            </li>
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