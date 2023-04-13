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
        <main class="text-justify">
            <div class="container-fluid bg-light rounded rounded-3">
                <div class="p-5">
                    <p class="display-4">Les NFTs</p>
                    <hr class="my-4">
                    <p style="text-align:justify;">Les NFTs (Non-Fungible Tokens) sont des jetons numériques uniques qui sont utilisés pour représenter des actifs numériques tels que des œuvres d'art, des vidéos, des musiques, des articles de presse, des tweets, etc. Les NFTs sont créés à l'aide de la technologie de la blockchain, qui permet de créer des jetons uniques et vérifiables pour chaque actif numérique.
                        Ces derniers mois, les NFTs ont connu une explosion de popularité, avec des ventes record d'œuvres d'art numériques et de vidéos virales vendues sous forme de NFTs. Voici quelques développements récents dans le domaine des NFTs :
                    <ul>
                        <li>
                            Augmentation de l'utilisation des NFTs : Les NFTs ont gagné en popularité dans des secteurs tels que l'art, la musique, les jeux vidéo et même les sports. Les artistes et les musiciens utilisent des NFTs pour vendre leurs œuvres numériques directement aux fans, tandis que les jeux vidéo intègrent des NFTs pour permettre aux joueurs de posséder des objets de jeu uniques et rares.</Li>

                        <li>Les NFTs dans le sport : Les NFTs sont également utilisés dans le domaine du sport. Des équipes sportives et des athlètes ont commencé à vendre des NFTs représentant des moments clés ou des souvenirs, tels que des buts, des victoires ou des trophées.</li>

                        <li>Les NFTs en entreprise : Les entreprises ont commencé à utiliser les NFTs pour la gestion de la propriété intellectuelle, la vérification de l'authenticité des produits et même la gestion des récompenses pour les employés.</li>

                        <li>La réglementation des NFTs : Les gouvernements et les organismes de réglementation commencent à s'intéresser aux NFTs et à leur réglementation, en particulier en ce qui concerne les questions de propriété intellectuelle et de droits d'auteur.</li>

                        <li>Développement de plateformes NFT : Des plateformes dédiées aux NFTs ont vu le jour, telles que OpenSea, Rarible et Nifty Gateway. Ces plateformes permettent aux utilisateurs de créer, vendre et acheter des NFTs.</li>
                    </ul>



                    En résumé, les NFTs sont en train de changer la façon dont les actifs numériques sont achetés, vendus et échangés. Les utilisations des NFTs continuent de croître dans de nombreux domaines, et de nouvelles applications sont développées chaque jour.</p>
                </div>
            </div>
        </main>
        <!-- FOOTER -->
        <footer>
            <nav class="nav flex-column p-5">
                <h5>Sommaire</h5>
                <a href="./index.php#contact#" class="nav-link text-muted">Accueil</a>
                <a href="./index.php#contact#qui-suis-je" class="nav-link text-muted">Qui-suis-je ?</a>
                <a href="./index.php#contact#experiences" class="nav-link text-muted">Expériences</a>
                <a href="./index.php#contact#formations" class="nav-link text-muted">Formations</a>
                <a href="<?= $_SESSION['LINKEDIN_SRC'] ?>" class=" nav-link text-muted" target="_blank">LinkedIn</a></li>
                <a href="./index.php#contact#contact" class="nav-link text-muted">Contact</a></li>
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