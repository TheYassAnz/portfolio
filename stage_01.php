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
                            <a class="nav-link" href="./index.php#stages">Stage</a>
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
    <?php
    $res = $conn->prepare("SELECT * FROM stages WHERE sta_id = 1;"); // Préparation de la requête
    try {
        $res->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
    // Exécution de la requête
    $tab = $res->fetch(PDO::FETCH_ASSOC); // Enregistrement du résultat sous forme de tableau associatif
    // var_dump($tab);
    ?>
    <main class="">
        <div class="container-fluid bg-light rounded rounded-3">

            <div class="p-5">
                <h3><?= $tab['sta_libelle'] ?></h3>
                <h4><?= $tab['sta_lieu'] ?></h4>
                <h5 class="fw-light">Date : <?= convert_date_to_string($tab['sta_date_debut']) . ' au ' . convert_date_to_string($tab['sta_date_fin']) ?></5>

                    <hr class="my-4">
                    <p style="text-align:justify;"><?= $tab['sta_des'] ?></p>
                    <p>
                    <ul>
                        <a href="#c-1">
                            <li>Gérer le patrimoine informatique</li>
                        </a>
                        <a href="#c-2">
                            <li>Répondre aux incidents et aux demandes d’assistance et d’évolution</li><a>
                    </ul>
                    </p>
            </div>
            <div class="container-fluid rounded rounded-3 text-center">
                <img src="./img/dhl-logo.png" class="w-25 m-5" />
            </div>
        </div>

        <div id="c-1" class="container-fluid p-5">
            <div class="container-fluid rounded-3 text-center">
                <h3>Masterisation</h3>
                <h4 class="text-muted">Compétence : Gérer le patrimoine informatique</h4>
            </div>
            <div class="container-fluid p-5">
                <div id="carousel-1" class="carousel carousel-dark slide" data-bs-ride="carousel-1">
                    <div class="carousel-inner">
                        <?php
                        $dir = "./img/stage/01/masterisation"; // Remplacez "chemin/vers/le/dossier" par le chemin absolu de votre dossier contenant les images.
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
        <div id="c-2" class="container-fluid">
            <div class="container-fluid rounded-3 text-center">
                <h3>Gestion d'incident</h3>
                <h4 class="text-muted">Compétence : Répondre aux incidents et aux demandes d’assistance et d’évolution</h4>
                <p>
                    DHL utilise la plateforme de gestion des incidents de ServiceNow. Elle apporte une gestion centralisé et rapide des incidents.
                </p>
            </div>
            <div class="container-fluid p-5">
                <div id="carousel-2" class="carousel carousel-dark slide" data-bs-ride="carousel-2">
                    <div class="carousel-inner">
                        <?php
                        $dir = "./img/stage/01/servicenow"; // Remplacez "chemin/vers/le/dossier" par le chemin absolu de votre dossier contenant les images.
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
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-2" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-2" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
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