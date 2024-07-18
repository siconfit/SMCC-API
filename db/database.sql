DROP TABLE IF EXISTS tbl_cuentas_principal;

CREATE TABLE
    tbl_cuentas_principal (
        cuenta_principal_id INT NOT NULL AUTO_INCREMENT,
        usuario VARCHAR(45) NOT NULL,
        nombre_empresa VARCHAR(45) NOT NULL,
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cuenta_principal_id)
    );

DROP TABLE IF EXISTS tbl_periodo_cobro;

CREATE TABLE
    tbl_periodo_cobro (
        periodo_id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        intervalo INT NOT NULL,
        fin_semana TINYINT (1),
        estado INT NOT NULL DEFAULT 1,
        PRIMARY KEY (periodo_id)
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
        numero_cuotas INT NOT NULL,
        periodo_id INT NOT NULL,
        interes INT NOT NULL,
        estado INT NOT NULL DEFAULT 0,
        PRIMARY KEY (credito_id),
        FOREIGN KEY (cliente_id) REFERENCES tbl_clientes (cliente_id),
        FOREIGN KEY (periodo_id) REFERENCES tbl_periodo_cobro (periodo_id)
    );

DROP TABLE IF EXISTS tbl_pagos;

CREATE TABLE
    tbl_pagos (
        pago_id INT NOT NULL AUTO_INCREMENT,
        credito_id INT NOT NULL,
        valor_pagado DECIMAL(10, 2) NOT NULL,
        fecha_pago DATE,
        estado INT NOT NULL DEFAULT 0,
        PRIMARY KEY (pago_id),
        FOREIGN KEY (credito_id) REFERENCES tbl_creditos (credito_id)
    );