-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2023 at 11:53 AM
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
-- Database: `yassanz_2304`
--

-- --------------------------------------------------------

--
-- Table structure for table `competences`
--

CREATE TABLE `competences` (
  `com_id` int(11) NOT NULL,
  `com_libelle` varchar(255) CHARACTER SET utf8 NOT NULL,
  `com_des` text CHARACTER SET utf8
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

--
-- Dumping data for table `competences`
--

INSERT INTO `competences` (`com_id`, `com_libelle`, `com_des`) VALUES
(10, 'Développement Web', 'HTML, CSS, JS, PHP, SQL'),
(11, 'Framework', 'ReactJS, Joomla'),
(12, 'Dévelloppement Logiciel', 'Python'),
(13, 'Développement d\'applications mobiles', 'React Native, Java');

-- --------------------------------------------------------

--
-- Table structure for table `formations`
--

CREATE TABLE `formations` (
  `for_id` int(10) NOT NULL COMMENT 'Numéro de la formation académique',
  `for_libelle` varchar(100) NOT NULL COMMENT 'Libelle de la formation académique',
  `for_etablissement` varchar(100) NOT NULL COMMENT 'Etablissement de la formation académique',
  `for_lieu` varchar(100) NOT NULL COMMENT 'Lieu de la formation académique',
  `for_annee` year(4) NOT NULL COMMENT 'Année de la formation académique',
  `for_description` text NOT NULL COMMENT 'Description de la formation académique',
  `for_mention` varchar(30) NOT NULL COMMENT 'Mention obtenu de la formation académique',
  `for_lien` varchar(255) DEFAULT NULL COMMENT 'Lien vers le diplôme en ligne'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table des formations académiques';

--
-- Dumping data for table `formations`
--

INSERT INTO `formations` (`for_id`, `for_libelle`, `for_etablissement`, `for_lieu`, `for_annee`, `for_description`, `for_mention`, `for_lien`) VALUES
(1, 'Baccalauréat Technologique spécialité Système d’Information et de Gestion', 'Lycée Honoré de Balzac', 'Mitry-Mory', 2020, 'Formation en Management, Economie, Droit, Gestion, Système d’Information', 'OBTENU MENTION BIEN', '#'),
(2, 'Brevet des collèges', 'Collège Gerard Philipe', 'Villeparisis', 2017, 'Formation générale', 'OBTENU MENTION ASSEZ BIEN', '#'),
(3, 'BTS Services Informatiques aux Organisations - 1ère année', 'Lycée Louis Armand', 'Paris', 2022, 'Développement d\'application web dynamique (HTML, CSS, JS, PHP, SQL), Programmation logicielle, Gestion de projet.', 'Validé', '#');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
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
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`exp_id`, `exp_libelle`, `exp_societe`, `exp_lieu`, `exp_duree`, `exp_debut_mois`, `exp_fin_mois`, `exp_debut_annee`, `exp_fin_annee`, `exp_description`, `exp_missions`) VALUES
(1, 'Technicien support informatique (stage)', 'Mairie', 'Villeparisis', '1 semaine', 'Mars', 'Avril', 2017, 2017, 'Stage en tant que technicien support informatique. Intervention dans plusieurs services de la mairie.', NULL),
(2, 'Directeur (junior) Commercial et Marketing', 'Fun\'keys (mini-entreprise)', 'Villeparisis', '1 an', 'Sept', 'Sept', 2016, 2017, 'Directeur commercial et marketing d\'une mini-entreprise. Management d’une équipe de 3 personnes sur diverses missions.\nNotre mini-entreprise a remporté le premier prix au Championnat Régional d’Ile-de-France en tant que meilleur entreprise-junior 2017.', '<ul>\n<li>Démarchage</li> \n<li>Etudes de marché</li>\n<li>Packaging</li>\n</ul>'),
(3, 'Président d\'une association', 'Lycée Honoré de Balzac', 'Mitry-Mory', '2 ans', 'Sept', 'Sept', 2018, 2020, 'Président d’une association lycéenne (Maison des lycéens). Cette association gère un local où tous les lycéens peuvent se retrouver pour faire de la musique, créer des évènements et se reposer.', NULL),
(4, 'Merchandiser Assistant', 'Qopius - Carrefour', 'Claye-Souilly', '7 jours', 'Mars', 'Mars', 2021, 2021, 'Mission d\'intérim au sein de l\'enseigne Carrefour.', '<ul>\n<li>Validation des produits reconnus par l’intelligence artificielle</li>\n<li>Communication entre l’entreprise et le magasin (en anglais)</li>\n<li>S\'assurer du bon fonctionnement de l’hardware (robot)</li>\n<li>Reporting aux équipes du siège sur les interventions magasins</li>\n</ul>'),
(5, 'Service civique - Facilitateur d\'inclusion numérique', 'Pôle Emploi', 'Mitry-Mory', '3 mois', 'Juin', 'Août', 2021, 2021, 'Accompagnement des usagers dans l’utilisation des outils numériques.', NULL),
(6, 'Technicien support informatique (stage)', 'DHL France', 'Tremblay-en-France', '6 semaines', 'Mai', 'Juin', 2022, 2022, 'Stage au sein de l\'équipe informatique (support et gestion de projet) de DHL CDG-HUB.', '<ul>\n<li>Gestion d\'incident</li>\n<li>Masterisation</li>\n<li>Installation de poste</li>\n<li>Inventaire</li>\n</ul>'),
(7, 'Développeur Full-Stack (stage)', 'Ceos Tech', 'Paris', '6 semaines', 'Janv', 'Fevr', 2023, 2023, 'Stage à distance dans une agence web de création de site de restauration rapide.', '<ul>\r\n<li>Développement Front-End avec le framework ReactJS</li>\r\n<li>Développement du Back-End avec Django REST Framework (python)</li>\r\n<li>Maintenance du code</li>\r\n<li>Déploiement avec Firebase</li>\r\n</ul>');

-- --------------------------------------------------------

--
-- Table structure for table `stages`
--

CREATE TABLE `stages` (
  `sta_id` int(11) NOT NULL,
  `sta_libelle` varchar(255) NOT NULL,
  `sta_lieu` varchar(255) NOT NULL,
  `sta_des` text NOT NULL,
  `sta_date_debut` date NOT NULL,
  `sta_date_fin` date NOT NULL,
  `sta_comp` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stages`
--

INSERT INTO `stages` (`sta_id`, `sta_libelle`, `sta_lieu`, `sta_des`, `sta_date_debut`, `sta_date_fin`, `sta_comp`) VALUES
(1, 'Technicien support informatique', 'DHL CDG-HUB (Tremblay-en-France)', 'Stage au sein de l\'équipe informatique (support et gestion de projet) de DHL CDG-HUB.', '2022-05-16', '2022-06-24', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `competences`
--
ALTER TABLE `competences`
  ADD PRIMARY KEY (`com_id`);

--
-- Indexes for table `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`for_id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `stages`
--
ALTER TABLE `stages`
  ADD PRIMARY KEY (`sta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `competences`
--
ALTER TABLE `competences`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `formations`
--
ALTER TABLE `formations`
  MODIFY `for_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Numéro de la formation académique', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `exp_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Numéro de l''expérience', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stages`
--
ALTER TABLE `stages`
  MODIFY `sta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
