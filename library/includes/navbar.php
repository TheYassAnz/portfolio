<?php
require_once('global_variables.php');
?>
<nav aria-label="Menu principal" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="#">Accueil</a>
                </li>
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
                    <a class="nav-link" href="#stage">Stage</a>
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