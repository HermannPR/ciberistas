-- Script para crear los procedimientos almacenados que requiere el backend .NET
-- Ejecutar después de haber creado las tablas con setup_complete_database.sql

USE ciberistas;

-- Procedimiento para obtener todos los talleres
DELIMITER //
CREATE PROCEDURE SP_LGG_getTalleres()
BEGIN
    SELECT id_taller, nombre, descripcion, fecha, requisitos, modalidad, cupo 
    FROM talleres 
    ORDER BY fecha;
END//
DELIMITER ;

-- Procedimiento para obtener un taller específico por ID
DELIMITER //
CREATE PROCEDURE SP_LGG_GetTaller(IN _id INT)
BEGIN
    SELECT id_taller, nombre, descripcion, fecha, requisitos, modalidad, cupo 
    FROM talleres 
    WHERE id_taller = _id;
END//
DELIMITER ;

-- Procedimiento para crear un nuevo taller
DELIMITER //
CREATE PROCEDURE SP_LGG_crearTaller(
    IN nom VARCHAR(255),
    IN _fecha DATETIME,
    IN descr TEXT,
    IN req TEXT,
    IN _modalidad VARCHAR(50),
    IN _cupo VARCHAR(10)
)
BEGIN
    INSERT INTO talleres (nombre, descripcion, fecha, requisitos, modalidad, cupo)
    VALUES (nom, descr, _fecha, req, _modalidad, CAST(_cupo AS SIGNED));
END//
DELIMITER ;

-- Procedimiento para modificar un taller existente
DELIMITER //
CREATE PROCEDURE SP_LGG_modifyTalleres(
    IN _id INT,
    IN nom VARCHAR(255),
    IN _fecha DATETIME,
    IN descr TEXT,
    IN req TEXT,
    IN _modalidad VARCHAR(50),
    IN _cupo VARCHAR(10)
)
BEGIN
    UPDATE talleres 
    SET nombre = nom,
        descripcion = descr,
        fecha = _fecha,
        requisitos = req,
        modalidad = _modalidad,
        cupo = CAST(_cupo AS SIGNED),
        updated_at = CURRENT_TIMESTAMP
    WHERE id_taller = _id;
END//
DELIMITER ;
