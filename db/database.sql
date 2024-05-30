CREATE DATABASE IF NOT EXISTS bdd_smcc CHARACTER
SET
    utf8 COLLATE utf8_spanish_ci;

USE bdd_smcc;

DROP TABLE IF EXISTS tbl_clientes;

CREATE TABLE
    tbl_clientes (
        cliente_id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(45) NOT NULL,
        cedula VARCHAR(10) NOT NULL,
        direccion VARCHAR(45) NOT NULL,
        telefono VARCHAR(10) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cliente_id)
    );

DROP TABLE IF EXISTS tbl_cuentas;

CREATE TABLE
    tbl_cuentas (
        cuenta_id INT NOT NULL AUTO_INCREMENT,
        cliente_id INT NOT NULL,
        valor_total INT NOT NULL,
        fecha_emision DATE NOT NULL,
        duracion_dias INT NOT NULL,
        periodo_cobro VARCHAR(45) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cuenta_id),
        FOREIGN KEY (cliente_id) REFERENCES tbl_clientes (cliente_id)
    );

DROP TABLE IF EXISTS tbl_pagos;

CREATE TABLE
    tbl_pagos (
        pago_id INT NOT NULL AUTO_INCREMENT,
        cuenta_id INT NOT NULL,
        valor_pagado DECIMAL(10, 2) NOT NULL,
        fecha_pago DATE NOT NULL,
        estado INT NOT NULL DEFAULT 0,
        PRIMARY KEY (pago_id),
        FOREIGN KEY (cuenta_id) REFERENCES tbl_cuentas (cuenta_id)
    );

DROP TABLE IF EXISTS tbl_usuarios;

CREATE TABLE
    tbl_usuarios (
        usuario_id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(45) NOT NULL,
        cedula VARCHAR(45) NOT NULL,
        nickname VARCHAR(45) NOT NULL,
        contrasena VARCHAR(45) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (usuario_id)
    );

DROP TABLE IF EXISTS tbl_clientes_usuarios;

CREATE TABLE
    tbl_clientes_usuarios (
        cliente_usuario_id INT NOT NULL AUTO_INCREMENT,
        cliente_id INT NOT NULL,
        usuario_id INT NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cliente_usuario_id),
        FOREIGN KEY (cliente_id) REFERENCES tbl_clientes (cliente_id),
        FOREIGN KEY (usuario_id) REFERENCES tbl_usuarios (usuario_id)
    );

-- Nueva estructura de bdd
DROP TABLE IF EXISTS tbl_cuentas_principal;

CREATE TABLE
    tbl_cuentas_principal (
        cuenta_principal_id INT NOT NULL AUTO_INCREMENT,
        usuario VARCHAR(45) NOT NULL,
        contrasena VARCHAR(45) NOT NULL,
        nombre_empresa VARCHAR(45) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cuenta_principal_id)
    );

DROP TABLE IF EXISTS tbl_cuentas_secundaria;

CREATE TABLE
    tbl_cuentas_secundaria (
        cuenta_secundaria_id INT NOT NULL AUTO_INCREMENT,
        cuenta_principal_id INT NOT NULL,
        usuario VARCHAR(45) NOT NULL,
        contrasena VARCHAR(45) NOT NULL,
        nombre VARCHAR(45) NOT NULL,
        cedula VARCHAR(10) NOT NULL,
        telefono VARCHAR(10) NOT NULL,
        rol INT NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cuenta_secundaria_id),
        FOREIGN KEY (cuenta_principal_id) REFERENCES tbl_cuentas_principal (cuenta_principal_id)
    );

DROP TABLE IF EXISTS tbl_clientes;

CREATE TABLE
    tbl_clientes (
        cliente_id INT NOT NULL AUTO_INCREMENT,
        cuenta_principal_id INT NOT NULL,
        nombre VARCHAR(45) NOT NULL,
        cedula VARCHAR(10) NOT NULL,
        telefono VARCHAR(10) NOT NULL,
        direccion VARCHAR(45) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cliente_id),
        FOREIGN KEY (cuenta_principal_id) REFERENCES tbl_cuentas_principal (cuenta_principal_id)
    );

DROP TABLE IF EXISTS tbl_clientes_usuarios;

CREATE TABLE
    tbl_clientes_usuarios (
        cliente_usuario_id INT NOT NULL AUTO_INCREMENT,
        cliente_id INT NOT NULL,
        cuenta_secundaria_id INT NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cliente_usuario_id),
        FOREIGN KEY (cliente_id) REFERENCES tbl_clientes (cliente_id),
        FOREIGN KEY (cuenta_secundaria_id) REFERENCES tbl_cuentas_secundaria (cuenta_secundaria_id)
    );

DROP TABLE IF EXISTS tbl_creditos;

CREATE TABLE
    tbl_creditos (
        credito_id INT NOT NULL AUTO_INCREMENT,
        cliente_id INT NOT NULL,
        valor_total DECIMAL(10, 2) NOT NULL,
        fecha_emision DATE NOT NULL,
        duracion_dias INT NOT NULL,
        periodo_cobro VARCHAR(45) NOT NULL,
        interes INT NOT NULL,
        estado INT NOT NULL DEFAULT 0,
        PRIMARY KEY (credito_id),
        FOREIGN KEY (cliente_id) REFERENCES tbl_clientes (cliente_id)
    );

DROP TABLE IF EXISTS tbl_pagos;

CREATE TABLE
    tbl_pagos (
        pago_id INT NOT NULL AUTO_INCREMENT,
        credito_id INT NOT NULL,
        valor_pagado DECIMAL(10, 2) NOT NULL,
        fecha_pago DATE NOT NULL,
        estado INT NOT NULL DEFAULT 0,
        PRIMARY KEY (pago_id),
        FOREIGN KEY (credito_id) REFERENCES tbl_creditos (credito_id)
    );