-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 25 2023 г., 18:16
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `comp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `img_name` text,
  `head_text_ru` text,
  `head_text_tm` text,
  `desc_text_ru` text,
  `desc_text_tm` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `pic_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `banners`
--

INSERT INTO `banners` (`id`, `img_name`, `head_text_ru`, `head_text_tm`, `desc_text_ru`, `desc_text_tm`, `createdAt`, `updatedAt`, `pic_name`) VALUES
(19, '5e7a940d6e81b1db3db32c6262cd2938.mp4', 'sdfsdf', 'dsfsd', 'sdfsdf', 'fsdfsdf', '2023-05-24 17:24:34', NULL, 'e8ad7439622023a62f1eb7fea09dc78b.jpg'),
(20, 'c15911ebd5be6e480147b82a468d5ad9.mp4', 'dsf', 'qwedd', 'undefined', 'undefined', '2023-05-24 17:32:33', NULL, 'c0c11411739f44e4e80ef6da065dfcd9.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `category_ru` text,
  `category_tm` text,
  `category_slug` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `optione` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `category_ru`, `category_tm`, `category_slug`, `createdAt`, `updatedAt`, `optione`) VALUES
(22, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:10:54', NULL, 'Umumy'),
(23, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:10:57', NULL, 'Gurlushyk'),
(24, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:10:59', NULL, 'Sowgatlyk'),
(25, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:01', NULL, 'Kanselyariya'),
(26, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:01', NULL, 'Kanselyariya'),
(27, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:02', NULL, 'Kanselyariya'),
(28, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:02', NULL, 'Kanselyariya'),
(29, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:04', NULL, 'Eshikler'),
(30, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:04', NULL, 'Eshikler'),
(31, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:04', NULL, 'Eshikler'),
(32, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:04', NULL, 'Eshikler'),
(33, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:06', NULL, 'Eshikler'),
(34, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:06', NULL, 'Eshikler'),
(35, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:07', NULL, 'Eshikler'),
(36, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:07', NULL, 'Eshikler'),
(37, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:09', NULL, 'Dowrebap'),
(38, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:09', NULL, 'Dowrebap'),
(39, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:09', NULL, 'Dowrebap'),
(40, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:10', NULL, 'Gurlushyk'),
(41, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:11', NULL, 'Gurlushyk'),
(42, 'Prowerka categorii', 'Taze categoriya', 'Taze_categoriya', '2023-05-24 16:11:11', NULL, 'Gurlushyk');

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `firstname` text,
  `lastname` text,
  `comment_text` text,
  `commenter_mail` text,
  `status` text,
  `post_id` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `post_img` text,
  `title_ru` text,
  `title_tm` text,
  `excerpt_ru` text,
  `excerpt_tm` text,
  `description_ru` text,
  `description_tm` text,
  `post_category` text,
  `view_count` varchar(255) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `post_img`, `title_ru`, `title_tm`, `excerpt_ru`, `excerpt_tm`, `description_ru`, `description_tm`, `post_category`, `view_count`, `createdAt`, `updatedAt`) VALUES
(18, '837017f8fca6270a6b480050ed30d265.jpg', 'DFSFD', 'saalt', '65', '65', 'DASD', 'SKNFDSJND', 'Taze_categoriya', '25.5', '2023-05-24 14:47:27', '2023-05-24 17:27:57');

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `service_pic` text,
  `service_name_ru` text,
  `service_name_tm` text,
  `service_excerpt_ru` text,
  `service_excerpt_tm` text,
  `service_description_ru` text,
  `service_description_tm` text,
  `view_count` varchar(255) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `service_pic`, `service_name_ru`, `service_name_tm`, `service_excerpt_ru`, `service_excerpt_tm`, `service_description_ru`, `service_description_tm`, `view_count`, `createdAt`, `updatedAt`) VALUES
(17, '80a89f660cc5d3b12cc6ac5ccf0f4276.jpg', 'NUR', 'NUR', 'NUR ÜWMEÇLER MAÝONEZLER', 'NUR ÜWMEÇLER MAÝONEZLER', 'BIZIŇ ÖNÜMLERIMIZ\r\n\r\nÄhlisi NÄZLI MAÝONEZ MAŞGALA ÜÇIN MAÝONEZ AJAÝYP PROWANSAL MAÝONEZI PROWANSAL MAÝONEZI POMIDOR ÜWMEÇLER AJY ÜWMEÇLER', 'BIZIŇ ÖNÜMLERIMIZ\r\n\r\nÄhlisi NÄZLI MAÝONEZ MAŞGALA ÜÇIN MAÝONEZ AJAÝYP PROWANSAL MAÝONEZI PROWANSAL MAÝONEZI POMIDOR ÜWMEÇLER AJY ÜWMEÇLER', '0', '2023-05-23 17:22:46', NULL),
(18, '488250e5c6ed4758aa4b9b78a1185dd7.jpg', 'Mylaýym', 'Mylaýym', 'Maýonez Önümleri  Üwmeç Önümleri  Gaplanan Önümler', 'Maýonez Önümleri  Üwmeç Önümleri  Gaplanan Önümler', 'Biziň\r\nÖnümlerimiz\r\n\r\nMaýonez Önümleri\r\n\r\nÜwmeç Önümleri\r\n\r\nGaplanan Önümler\r\n\r\n', 'Biziň\r\nÖnümlerimiz\r\n\r\nMaýonez Önümleri\r\n\r\nÜwmeç Önümleri\r\n\r\nGaplanan Önümler\r\n\r\n', '0', '2023-05-23 17:24:24', NULL),
(19, '4f4ac3f6a737dc7dfc629b483decd3f9.jpg', 'HAZYNA', 'HAZYNA', 'MAÝONEZ WE ÜWMEÇ DESERT PASTALAR', 'MAÝONEZ WE ÜWMEÇ DESERT PASTALAR', 'HAZYNA MAÝONEZ WE ÜWMEÇ DESERT PASTALAR', 'HAZYNA MAÝONEZ WE ÜWMEÇ DESERT PASTALAR', '0', '2023-05-23 17:25:24', '2023-05-23 17:58:54');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` text,
  `password` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'ukypcomputer@sanly.tm', '$2b$08$klEtyuOwqkkXb4DotTOUYejSyzY0aB5HYeUdFpYKUPmlHlwOB6Ebu'),
(2, 'admin@gmail.com', '$2b$08$.49chdoT3kU9wjcQeTXkO.R76d8YHZh74OWuZq93SS1CBtvHNX5my');

-- --------------------------------------------------------

--
-- Структура таблицы `views`
--

CREATE TABLE `views` (
  `id` int NOT NULL,
  `homepage` int NOT NULL DEFAULT '0',
  `blogpage` int NOT NULL DEFAULT '0',
  `servicepage` int NOT NULL DEFAULT '0',
  `aboutpage` int NOT NULL DEFAULT '0',
  `contactpage` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `views`
--

INSERT INTO `views` (`id`, `homepage`, `blogpage`, `servicepage`, `aboutpage`, `contactpage`) VALUES
(1, 7879, 1355, 392, 354, 492);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `views`
--
ALTER TABLE `views`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
