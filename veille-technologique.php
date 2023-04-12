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
        <div id="qui-suis-je">
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
        </div>
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