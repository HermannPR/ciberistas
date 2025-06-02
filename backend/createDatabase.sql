/*CREATE TABLE Talleres (
    id_taller INT PRIMARY KEY,
    nombre TEXT,
    formato TEXT,
    fechas TEXT,
    horario TEXT,
    cupo INT,
    imparte TEXT,
    descripcion TEXT,
    edades VARCHAR(15),
    requisitos TEXT,
    objetivo TEXT,
    publico VARCHAR(20),
    ubicacion TEXT,
    img TEXT,
    modalidad TEXT,
    cupo INT
);*/

CREATE TABLE Talleres (
    id_taller INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    fecha DATE,
    descripcion TEXT,
    requisitos TEXT,
    modalidad TEXT,
    cupo INT
);

INSERT INTO Talleres (id_taller, nombre, fecha, descripcion, requisitos, modalidad, cupo) VALUES
(1, 'Taller de Fotografía', '2025-06-15', 'Aprende técnicas básicas de fotografía.', 'Cámara digital', 'Presencial', 20),
(2, 'Taller de Programación en Python', '2025-07-01', 'Introducción al lenguaje Python.', 'Conocimientos básicos de computación', 'Virtual', 30),
(3, 'Taller de Cocina Saludable', '2025-06-20', 'Recetas fáciles y nutritivas.', 'Ninguno', 'Presencial', 15);

CREATE PROCEDURE SP_LGG_crearTaller(IN nom TEXT, IN _fecha DATE, IN descr TEXT, IN req TEXT, IN _modalidad TEXT, IN _cupo TEXT)
BEGIN
	INSERT INTO Talleres (nombre, fecha, descripcion, requisitos, modalidad, cupo) VALUES (nom, _fecha, descr, req, _modalidad, _cupo);
END;

CALL Ciberistas.SP_LGG_crearTaller('taller de prueba', '2025-02-27', 'discripcion', 'requisitos', 'modalidad', 15);


CREATE PROCEDURE SP_LGG_getTalleres()
BEGIN
	SELECT * FROM Talleres;
END;

CALL Ciberistas.SP_LGG_getTalleres();


CREATE PROCEDURE SP_LGG_modifyTalleres(IN _id INT, IN nom TEXT, IN _fecha DATE, IN descr TEXT, IN req TEXT, IN _modalidad TEXT, IN _cupo INT)
BEGIN
	UPDATE Talleres
    SET
        nombre = nom,
        fecha = _fecha,
        descripcion = descr,
        requisitos = req,
        modalidad = _modalidad,
        cupo = _cupo
    WHERE id_taller = _id;
END;

CALL Ciberistas.SP_LGG_modifyTalleres(7, 'nombre', '2020-2-27', 'text', 'req', 'en linea', 8);


CREATE PROCEDURE SP_LGG_GetTaller(IN _id INT)
BEGIN
	SELECT * FROM Talleres WHERE id_taller = _id;
END;

CALL Ciberistas.SP_LGG_GetTaller(2);


