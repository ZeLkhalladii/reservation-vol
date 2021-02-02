-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mar. 02 fév. 2021 à 09:54
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `vol`
--

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_vol` int(11) NOT NULL,
  `nombre_places` int(11) NOT NULL,
  `date_de_reservation` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `id_user`, `id_vol`, `nombre_places`, `date_de_reservation`) VALUES
(63, 63, 1, 1, '2021-01-29 17:08:24.485'),
(64, 64, 3, 1, '2021-02-02 10:10:41.131'),
(65, 65, 3, 1, '2021-02-02 10:12:02.308'),
(66, 66, 3, 1, '2021-02-02 10:12:12.431'),
(67, 67, 3, 1, '2021-02-02 10:13:29.210'),
(68, 68, 3, 1, '2021-02-02 10:25:00.162'),
(69, 69, 3, 1, '2021-02-02 10:29:44.786'),
(70, 70, 3, 1, '2021-02-02 10:32:49.833'),
(71, 71, 3, 1, '2021-02-02 10:35:26.568'),
(72, 72, 3, 1, '2021-02-02 10:37:30.845'),
(73, 73, 3, 1, '2021-02-02 10:39:21.270'),
(74, 74, 3, 1, '2021-02-02 10:42:17.096'),
(75, 75, 3, 1, '2021-02-02 10:42:55.535'),
(76, 76, 3, 1, '2021-02-02 10:45:50.757'),
(77, 77, 3, 1, '2021-02-02 10:46:44.844'),
(78, 78, 3, 1, '2021-02-02 10:47:12.507'),
(79, 79, 3, 1, '2021-02-02 10:48:22.255');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `prenom` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telephone` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `telephone`) VALUES
(63, 'jk', 'lk', 'rh@gmail.com', 'lj'),
(64, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(65, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(66, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(67, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(68, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(69, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(70, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(71, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(72, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(73, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(74, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(75, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(76, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(77, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(78, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006'),
(79, 'ELKHALLADI', 'Zineb', 'zinebelkhalladi.2019@gmail.com', '+212619546006');

-- --------------------------------------------------------

--
-- Structure de la table `vols`
--

CREATE TABLE `vols` (
  `id` int(11) NOT NULL,
  `ville_depart` varchar(60) NOT NULL,
  `ville_darrive` varchar(60) NOT NULL,
  `date_depart` date NOT NULL,
  `date_arrive` date NOT NULL,
  `lheure_depart` varchar(60) NOT NULL,
  `lheure__arrive` varchar(60) NOT NULL,
  `nombre_place_initiall` int(11) NOT NULL,
  `nombre_places` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `vols`
--

INSERT INTO `vols` (`id`, `ville_depart`, `ville_darrive`, `date_depart`, `date_arrive`, `lheure_depart`, `lheure__arrive`, `nombre_place_initiall`, `nombre_places`) VALUES
(1, 'maroc', 'canada', '2021-01-29', '2021-02-06', '4', '10', 20, 2),
(2, 'france', 'america', '2021-02-08', '2021-02-14', '1', '8', 20, 20),
(3, 'maroc', 'italy', '2021-02-02', '2021-02-06', '4', '12', 20, 14);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_vol` (`id_vol`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vols`
--
ALTER TABLE `vols`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `vols`
--
ALTER TABLE `vols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`id_vol`) REFERENCES `vols` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
