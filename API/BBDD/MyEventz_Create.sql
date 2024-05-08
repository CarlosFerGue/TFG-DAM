-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema myeventz
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema myeventz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `myeventz` DEFAULT CHARACTER SET utf8 ;
USE `myeventz` ;

-- -----------------------------------------------------
-- Table `myeventz`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(30) NULL,
  `clave` VARCHAR(255) NULL,
  `nombre` VARCHAR(40) NULL,
  `apel1` VARCHAR(60) NULL,
  `apel2` VARCHAR(60) NULL,
  `f_nac` DATE NULL,
  `bio` VARCHAR(255) NULL,
  `ig` VARCHAR(60) NULL,
  `fb` VARCHAR(60) NULL,
  `x` VARCHAR(60) NULL,
  `yt` VARCHAR(60) NULL,
  `tt` VARCHAR(60) NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myeventz`.`eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`eventos` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `titulo` VARCHAR(80) NULL,
  `fecha` DATE NULL,
  `hora` TIME NULL,
  `descripcion` VARCHAR(255) NULL,
  `edad_min` INT NULL,
  `edad_max` INT NULL,
  `ubicacion` VARCHAR(255) NULL,
  `participantes` INT NULL,
  PRIMARY KEY (`id_evento`),
  INDEX `fk_eventos_usuarios_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_eventos_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `myeventz`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myeventz`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(50) NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myeventz`.`participantes_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`participantes_eventos` (
  `id_participacion` INT NOT NULL AUTO_INCREMENT,
  `id_evento` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha` DATE NULL,
  INDEX `fk_eventos_has_usuarios_usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_eventos_has_usuarios_eventos1_idx` (`id_evento` ASC) VISIBLE,
  PRIMARY KEY (`id_participacion`),
  CONSTRAINT `fk_eventos_has_usuarios_eventos1`
    FOREIGN KEY (`id_evento`)
    REFERENCES `myeventz`.`eventos` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_eventos_has_usuarios_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `myeventz`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myeventz`.`usuarios_hobbies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`usuarios_hobbies` (
  `id_usuario` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  INDEX `fk_usuarios_has_categorias_categorias1_idx` (`id_categoria` ASC) VISIBLE,
  INDEX `fk_usuarios_has_categorias_usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_categorias_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `myeventz`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_categorias_categorias1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `myeventz`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myeventz`.`eventos_categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myeventz`.`eventos_categorias` (
  `id_evento` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  INDEX `fk_eventos_has_categorias_categorias1_idx` (`id_categoria` ASC) VISIBLE,
  INDEX `fk_eventos_has_categorias_eventos1_idx` (`id_evento` ASC) VISIBLE,
  CONSTRAINT `fk_eventos_has_categorias_eventos1`
    FOREIGN KEY (`id_evento`)
    REFERENCES `myeventz`.`eventos` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_eventos_has_categorias_categorias1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `myeventz`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
