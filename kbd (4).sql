-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07/03/2025 às 20:00
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `kbd`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultas`
--

CREATE TABLE `consultas` (
  `id` int(11) NOT NULL,
  `paciente_nome` varchar(255) NOT NULL,
  `medico_nome` varchar(255) NOT NULL,
  `sala_consultorio` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `consultas`
--

INSERT INTO `consultas` (`id`, `paciente_nome`, `medico_nome`, `sala_consultorio`, `data`, `horario`) VALUES
(14, 'Kauanne Luíza da Silva Cruz', 'Dr. Carlos Mendes - Cardiologista', 'Sala 2', '2025-03-12', '10:10:00'),
(15, 'Kauanne', 'Dra. Patrícia Souza - Dermatologista', 'Sala 3', '3323-04-05', '04:56:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `medicos`
--

INSERT INTO `medicos` (`id`, `nome`) VALUES
(1, 'Dr. Tiago Varela - Clínico Geral'),
(2, 'Dr. Carlos Mendes - Cardiologista'),
(3, 'Dr. João Almeida - Ortopedista'),
(4, 'Dra. Patrícia Souza - Dermatologista'),
(5, 'Dr. Ricardo Oliveira - Neurologista'),
(6, 'Dra. Fernanda Silva - Pediatra');

-- --------------------------------------------------------

--
-- Estrutura para tabela `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `idade` int(11) NOT NULL,
  `telefone` varchar(17) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `paciente`
--

INSERT INTO `paciente` (`id`, `nome`, `idade`, `telefone`) VALUES
(7, 'Kauanne Luíza da Silva Cruz', 16, '(84) 9 9916-4399'),
(8, 'Kauanne', 12, '(84) 9 9690-8462');

-- --------------------------------------------------------

--
-- Estrutura para tabela `prontuarios`
--

CREATE TABLE `prontuarios` (
  `id` int(11) NOT NULL,
  `paciente_nome` varchar(255) NOT NULL,
  `histórico` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `prontuarios`
--

INSERT INTO `prontuarios` (`id`, `paciente_nome`, `histórico`) VALUES
(8, 'Kauanne Luíza da Silva Cruz', 'coração quebrado'),
(9, 'Kauanne Luíza da Silva Cruz', 'precisa de emenda'),
(10, 'Kauanne', 'yvrouyvt');

-- --------------------------------------------------------

--
-- Estrutura para tabela `salas`
--

CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `consultorio` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `salas`
--

INSERT INTO `salas` (`id`, `consultorio`) VALUES
(1, 'Sala 1'),
(2, 'Sala 2'),
(3, 'Sala 3'),
(4, 'Sala 4'),
(5, 'Sala 5');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `prontuarios`
--
ALTER TABLE `prontuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `prontuarios`
--
ALTER TABLE `prontuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
