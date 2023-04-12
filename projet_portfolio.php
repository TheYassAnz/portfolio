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
            <div class="p-5">
                <h3>Portfolio</h3>
                <h4></h4>
                <h5 class="fw-light">Actuellement en développement</5>

                    <hr class="my-4">
                    <p style="text-align:justify;">Développement d'un portfolio utilisant la librairie Bootstrap</p>
                    <p>
                    <ul>
                        <a href="#c-1">
                            <li>Organiser son développement professionnel</li>
                        </a>
                        <a href="#c-2">
                            <li>Développer la présence en ligne de l’organisation</li>
                        </a>
                        <a href="#c-3">
                            <li>Mettre à disposition des utilisateurs un service informatique</li>
                        </a>
                    </ul>
                    </p>
            </div>
        </div>

        <div id="c-1" class="container-fluid p-5">
            <div class="container-fluid rounded-3 ">
                <h3>1. Formation à Bootstrap</h3>
                <h4 class="text-muted">Compétence : Organiser son développement professionnel</h4>
                <p>Pour développer mon site web, j'ai décidé d'utiliser la librairie Bootstrap. Je me suis donc familiariser à l'utilisation de la librairie avant de commencer le développement.</p>
                </p>
            </div>
            <div class="container-fluid p-5">
                <img class="img-responsive" src="./img/projet/gilla/analyse-de-l-existant.png" />
            </div>
        </div>
        <div id="c-2" class="container-fluid p-5">
            <div class="container-fluid rounded-3 ">
                <h3>2. Développement du portfolio</h3>
                <h4 class="text-muted">Compétence : Développer la présence en ligne de l’organisation</h4>
                <div class="container-fluid px-3">
                    <h5>A. Création de la base de données</h5>
                    <p>Le site utilise une base de données MySQL accessible avec phpmyadmin</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
                <div class="container-fluid px-3">
                    <h5>B. Développement du site</h5>
                    <p>Le site utilise le langage HTML, JavaScript, et PHP pour envoyer les requêtes à la base de données</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
            </div>
        </div>
        <div id="c-3" class="container-fluid p-5">
            <div class="container-fluid rounded-3 ">
                <h3>3. Déploiement du site</h3>
                <h4 class="text-muted">Compétence : Mettre à disposition des utilisateurs un service informatique</h4>
                <div class="container-fluid px-3">
                    <h5>A. Configuration d'un serveur Apache</h5>
                    <p>J'ai décidé d'héberger mon portfolio sur un serveur virtuel privé OVH</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
                <div class="container-fluid px-3">
                    <h5>B. Importation du site sur GitHub</h5>
                    <p>Afin de mieux gérer les versions du site, j'utilise git et github</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
                <div class="container-fluid px-3">
                    <h5>B. Importation du repository sur le serveur Apache</h5>
                    <p>Grace a git, nous pouvons facilement importer les fichiers du site sur le serveur Apache</p>
                    <div class="container-fluid p-5">
                        <img class="img-responsive" src="./img/projet/gilla/cycle-en-v.png" />
                    </div>
                </div>
            </div>
        </div>

    </main>
    <!-- FOOTER -->
    <footer>
        <nav class=" nav flex-column p-5">
            <h5>Sommaire</h5>
            <a href="#accueil" class="nav-link text-muted">Accueil</a>
            <a href="#qui-suis-je" class="nav-link text-muted">Qui-suis-je ?</a>
            <a href="#experiences" class="nav-link text-muted">Expériences</a>
            <a href="#formations" class="nav-link text-muted">Formations</a>
            <a href="<?= $_SESSION['LINKEDIN_SRC'] ?>" class=" nav-link text-muted" target="_blank">LinkedIn</a>
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