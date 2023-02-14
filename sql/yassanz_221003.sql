-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2022 at 10:44 AM
-- Server version: 5.7.36
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yassanz_221003`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `edu_id` int(10) NOT NULL COMMENT 'Numéro de la formation académique',
  `edu_libelle` varchar(100) NOT NULL COMMENT 'Libelle de la formation académique',
  `edu_etablissement` varchar(100) NOT NULL COMMENT 'Etablissement de la formation académique',
  `edu_lieu` varchar(100) NOT NULL COMMENT 'Lieu de la formation académique',
  `edu_annee` year(4) NOT NULL COMMENT 'Année de la formation académique',
  `edu_description` text NOT NULL COMMENT 'Description de la formation académique',
  `edu_mention` varchar(30) NOT NULL COMMENT 'Mention obtenu de la formation académique',
  `edu_lien` varchar(255) DEFAULT NULL COMMENT 'Lien vers le diplôme en ligne'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table des formations académiques';

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`edu_id`, `edu_libelle`, `edu_etablissement`, `edu_lieu`, `edu_annee`, `edu_description`, `edu_mention`, `edu_lien`) VALUES
(1, 'Baccalauréat Technologique spécialité Système d’Information et de Gestion', 'Lycée Honoré de Balzac', 'Mitry-Mory', 2020, 'Formation en Management, Economie, Droit, Gestion, Système d’Information', 'OBTENU MENTION BIEN', '#'),
(2, 'Brevet des collèges', 'Collège Gerard Philipe', 'Villeparisis', 2017, 'Formation générale', 'OBTENU MENTION ASSEZ BIEN', '#'),
(3, 'BTS Services Informatiques aux Organisations - 1ère année', 'Lycée Louis Armand', 'Paris', 2022, 'Développement d\'application web dynamique (HTML, CSS, JS, PHP, SQL), Programmation logicielle, Gestion de projet.', 'Validé', '#');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `exp_id` int(10) NOT NULL COMMENT 'Numéro de l''expérience',
  `exp_libelle` varchar(100) NOT NULL COMMENT 'Nom de l''expérience',
  `exp_societe` varchar(100) NOT NULL COMMENT 'Nom de la société',
  `exp_lieu` varchar(100) NOT NULL COMMENT 'Lieu de l''experience',
  `exp_duree` varchar(20) NOT NULL COMMENT 'Durée de l''experience',
  `exp_debut_mois` varchar(10) NOT NULL COMMENT 'Debut de l''experience (mois)',
  `exp_fin_mois` varchar(10) NOT NULL COMMENT 'Fin de l''experience (mois)',
  `exp_debut_annee` year(4) NOT NULL COMMENT 'Date de début de l''expérience',
  `exp_fin_annee` year(4) NOT NULL COMMENT 'Date de fin de l''expérience',
  `exp_description` text NOT NULL COMMENT 'Résumé de l''expérience',
  `exp_missions` text COMMENT 'Listes des missions réalisées'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`exp_id`, `exp_libelle`, `exp_societe`, `exp_lieu`, `exp_duree`, `exp_debut_mois`, `exp_fin_mois`, `exp_debut_annee`, `exp_fin_annee`, `exp_description`, `exp_missions`) VALUES
(1, 'Technicien support informatique (stage)', 'Mairie', 'Villeparisis', '1 semaine', 'Mars', 'Avril', 2017, 2017, 'Stage en tant que technicien support informatique. Intervention dans plusieurs services de la mairie.', NULL),
(2, 'Directeur (junior) Commercial et Marketing', 'Fun\'keys (mini-entreprise)', 'Villeparisis', '1 an', 'Sept', 'Sept', 2016, 2017, 'Directeur commercial et marketing d\'une mini-entreprise. Management d’une équipe de 3 personnes sur diverses missions.\nNotre mini-entreprise a remporté le premier prix au Championnat Régional d’Ile-de-France en tant que meilleur entreprise-junior 2017.', '<ul>\n<li>Démarchage</li> \n<li>Etudes de marché</li>\n<li>Packaging</li>\n</ul>'),
(3, 'Président d\'une association', 'Lycée Honoré de Balzac', 'Mitry-Mory', '2 ans', 'Sept', 'Sept', 2018, 2020, 'Président d’une association lycéenne (Maison des lycéens). Cette association gère un local où tous les lycéens peuvent se retrouver pour faire de la musique, créer des évènements et se reposer.', NULL),
(4, 'Merchandiser Assistant', 'Qopius - Carrefour', 'Claye-Souilly', '7 jours', 'Mars', 'Mars', 2021, 2021, 'Mission d\'intérim au sein de l\'enseigne Carrefour.', '<ul>\n<li>Validation des produits reconnus par l’intelligence artificielle</li>\n<li>Communication entre l’entreprise et le magasin (en anglais)</li>\n<li>S\'assurer du bon fonctionnement de l’hardware (robot)</li>\n<li>Reporting aux équipes du siège sur les interventions magasins</li>\n</ul>'),
(5, 'Service civique - Facilitateur d\'inclusion numérique', 'Pôle Emploi', 'Mitry-Mory', '3 mois', 'Juin', 'Août', 2021, 2021, 'Accompagnement des usagers dans l’utilisation des outils numériques.', NULL),
(6, 'Technicien support informatique (stage)', 'DHL France', 'Tremblay-en-France', '6 semaines', 'Mai', 'Juin', 2022, 2022, 'Stage au sein de l\'équipe informatique (support et gestion de projet) de DHL CDG-HUB.', '<ul>\n<li>Gestion d\'incident</li>\n<li>Masterisation</li>\n<li>Installation de poste</li>\n<li>Inventaire</li>\n</ul>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`edu_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`exp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `edu_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Numéro de la formation académique', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `exp_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Numéro de l''expérience', AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
