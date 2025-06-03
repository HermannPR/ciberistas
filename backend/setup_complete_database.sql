-- Script completo para configurar la base de datos Ciberistas desde cero
-- Usar: mysql -u root -proot < setup_complete_database.sql

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS Ciberistas;
USE Ciberistas;

-- Eliminar tablas existentes para empezar limpio
DROP TABLE IF EXISTS inscripciones;
DROP TABLE IF EXISTS talleres;

-- Crear tabla talleres
CREATE TABLE talleres (
    id_taller INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    requisitos TEXT,
    modalidad VARCHAR(50) NOT NULL,
    cupo INT NOT NULL DEFAULT 25,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla inscripciones
CREATE TABLE inscripciones (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_taller INT NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    edad INT NOT NULL,
    nivel_educativo VARCHAR(50) NOT NULL,
    experiencia VARCHAR(50) NOT NULL,
    motivacion TEXT,
    fecha_inscripcion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'confirmada',
    FOREIGN KEY (id_taller) REFERENCES talleres(id_taller) ON DELETE CASCADE,
    INDEX idx_taller (id_taller),
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_inscripcion)
);

-- Insertar talleres de ejemplo
INSERT INTO talleres (nombre, descripcion, fecha, requisitos, modalidad, cupo) VALUES
('Programación Web con HTML y CSS', 'Aprende a crear páginas web desde cero utilizando HTML5 y CSS3. Descubre las mejores prácticas para desarrollar sitios web modernos, responsivos y accesibles. Incluye proyectos prácticos y técnicas avanzadas de diseño.', '2024-12-15 09:00:00', 'Conocimientos básicos de computación. Computadora con acceso a internet.', 'Presencial', 25),

('JavaScript para Principiantes', 'Domina los fundamentos de JavaScript, el lenguaje de programación más popular del mundo. Aprende variables, funciones, eventos y manipulación del DOM para crear páginas web interactivas y dinámicas.', '2024-12-20 14:00:00', 'Conocimientos básicos de HTML y CSS. Experiencia previa en programación no requerida.', 'Virtual', 30),

('Creación de Videojuegos con Scratch', 'Desarrolla tus primeros videojuegos utilizando Scratch, una plataforma visual de programación. Aprende conceptos de programación mientras creas juegos divertidos e interactivos de forma fácil y creativa.', '2024-12-22 10:00:00', 'Edad mínima: 10 años. No se requiere experiencia previa en programación.', 'Presencial', 20),

('Robótica con Arduino', 'Sumérgete en el mundo de la robótica con Arduino. Aprende a programar microcontroladores, conectar sensores y actuadores, y construye robots funcionales mientras exploras el Internet de las Cosas (IoT).', '2025-01-08 09:30:00', 'Conocimientos básicos de programación. Kit de Arduino (se proporcionará en clase).', 'Híbrido', 15),

('Inteligencia Artificial y Machine Learning', 'Explora los fundamentos de la IA y el aprendizaje automático. Aprende sobre algoritmos de ML, redes neuronales básicas y aplicaciones prácticas usando Python y librerías especializadas como TensorFlow.', '2025-01-15 15:00:00', 'Conocimientos intermedios de programación en Python. Matemáticas de nivel preparatoria.', 'Virtual', 25),

('Desarrollo de Apps Móviles', 'Crea aplicaciones móviles nativas para Android e iOS utilizando React Native. Desde la conceptualización hasta la publicación en las tiendas de aplicaciones, aprende todo el ciclo de desarrollo móvil.', '2025-01-20 11:00:00', 'Experiencia en JavaScript y React. Conocimientos básicos de programación orientada a objetos.', 'Presencial', 18),

('Ciberseguridad y Hacking Ético', 'Aprende a proteger sistemas informáticos y redes. Descubre técnicas de hacking ético, análisis de vulnerabilidades, y cómo implementar medidas de seguridad efectivas en aplicaciones y sistemas.', '2025-01-25 13:00:00', 'Conocimientos básicos de redes y sistemas operativos. Experiencia en programación recomendada.', 'Híbrido', 20),

('Diseño UX/UI para Aplicaciones', 'Domina los principios del diseño de experiencias de usuario. Aprende a crear interfaces atractivas y funcionales utilizando herramientas como Figma, y técnicas de investigación de usuarios y prototipado.', '2025-02-01 10:00:00', 'Conocimientos básicos de diseño gráfico. Creatividad y pensamiento analítico.', 'Virtual', 22),

('Blockchain y Criptomonedas', 'Entiende la tecnología blockchain desde sus fundamentos. Aprende sobre criptomonedas, contratos inteligentes, y cómo desarrollar aplicaciones descentralizadas (DApps) en la red Ethereum.', '2025-02-08 16:00:00', 'Conocimientos de programación. Comprensión básica de conceptos financieros y criptográficos.', 'Presencial', 16),

('Data Science con Python', 'Sumérgete en el análisis de datos utilizando Python. Aprende a manipular datos con Pandas, crear visualizaciones con Matplotlib, y aplicar técnicas estadísticas para extraer insights valiosos.', '2025-02-12 09:00:00', 'Conocimientos básicos de Python y estadística. Experiencia con hojas de cálculo recomendada.', 'Virtual', 28),

('Desarrollo de APIs REST', 'Construye APIs robustas y escalables utilizando Node.js y Express. Aprende sobre autenticación, documentación de APIs, bases de datos, y mejores prácticas para el desarrollo backend moderno.', '2025-02-18 14:30:00', 'Experiencia en JavaScript y Node.js. Conocimientos básicos de bases de datos SQL.', 'Híbrido', 20),

('Introducción a Cloud Computing', 'Explora los servicios de computación en la nube con AWS, Azure y Google Cloud. Aprende sobre infraestructura como código, contenedores con Docker, y deployment de aplicaciones en la nube.', '2025-02-25 11:30:00', 'Conocimientos básicos de sistemas operativos Linux. Experiencia en desarrollo web recomendada.', 'Virtual', 24);

-- Insertar inscripciones de ejemplo
INSERT INTO inscripciones (id_taller, nombre_completo, email, telefono, edad, nivel_educativo, experiencia, motivacion, estado) VALUES
(1, 'María González Pérez', 'maria.gonzalez@email.com', '+52 123 456 7890', 16, 'preparatoria', 'basico', 'Me interesa mucho aprender a crear sitios web desde cero y poder desarrollar mi propio portafolio profesional', 'confirmada'),
(1, 'Carlos Rodríguez López', 'carlos.rodriguez@email.com', '+52 987 654 3210', 17, 'preparatoria', 'ninguno', 'Quiero entrar al mundo de la programación web y este taller parece perfecto para comenzar', 'confirmada'),
(1, 'Andrea Jiménez', 'andrea.jimenez@email.com', '+52 555 111 2222', 18, 'preparatoria', 'basico', 'Tengo conocimientos básicos de diseño y quiero aprender la parte técnica', 'confirmada'),

(2, 'Ana Sofía Martínez', 'ana.martinez@email.com', '+52 555 123 4567', 15, 'secundaria', 'ninguno', 'JavaScript me parece muy interesante para crear páginas interactivas y quiero especializarme en frontend', 'confirmada'),
(2, 'Roberto Silva', 'roberto.silva@email.com', '+52 444 555 6666', 19, 'universidad', 'intermedio', 'Necesito reforzar mis conocimientos de JavaScript para mis proyectos universitarios', 'confirmada'),

(3, 'Diego Hernández', 'diego.hernandez@email.com', '+52 444 567 8901', 14, 'secundaria', 'basico', 'Me encanta la idea de crear mis propios videojuegos y Scratch parece una excelente forma de empezar', 'confirmada'),
(3, 'Valeria Ramírez', 'valeria.ramirez@email.com', '+52 333 444 5555', 13, 'secundaria', 'ninguno', 'Los videojuegos son mi pasión y quiero aprender a crearlos', 'confirmada'),
(3, 'Luis Fernando Castro', 'luis.castro@email.com', '+52 222 333 4444', 15, 'secundaria', 'basico', 'Quiero combinar mi creatividad con la programación', 'confirmada'),

(4, 'Isabella Torres', 'isabella.torres@email.com', '+52 333 789 0123', 16, 'preparatoria', 'intermedio', 'La robótica es el futuro y quiero ser parte de él. Me fascina la idea de programar dispositivos físicos', 'confirmada'),
(4, 'Emilio Mendoza', 'emilio.mendoza@email.com', '+52 111 222 3333', 17, 'preparatoria', 'avanzado', 'Ya tengo experiencia programando y quiero expandir hacia hardware', 'confirmada'),

(5, 'Sebastián Morales', 'sebastian.morales@email.com', '+52 222 345 6789', 18, 'universidad', 'avanzado', 'Busco especializarme en inteligencia artificial para mi carrera profesional', 'confirmada'),
(5, 'Camila Vega', 'camila.vega@email.com', '+52 666 777 8888', 20, 'universidad', 'intermedio', 'La IA es fascinante y quiero entender cómo funciona por dentro', 'confirmada'),

(6, 'Alejandro Ruiz', 'alejandro.ruiz@email.com', '+52 777 888 9999', 19, 'universidad', 'intermedio', 'Quiero crear apps móviles innovadoras que resuelvan problemas reales', 'confirmada'),

(7, 'Daniela Flores', 'daniela.flores@email.com', '+52 888 999 0000', 21, 'universidad', 'avanzado', 'La ciberseguridad es crucial en el mundo actual y quiero especializarme en ello', 'confirmada'),

(8, 'Gabriel Herrera', 'gabriel.herrera@email.com', '+52 999 000 1111', 18, 'preparatoria', 'basico', 'Me interesa el diseño y quiero aprender UX/UI para crear mejores experiencias', 'confirmada'),

(9, 'Sofía Delgado', 'sofia.delgado@email.com', '+52 111 000 9999', 22, 'universidad', 'intermedio', 'El blockchain representa el futuro de las finanzas y quiero entenderlo a fondo', 'confirmada');

-- Crear procedimientos almacenados para compatibilidad
DELIMITER //

CREATE PROCEDURE SP_LGG_getTalleres()
BEGIN
    SELECT id_taller, nombre, descripcion, fecha, requisitos, modalidad, cupo 
    FROM talleres 
    ORDER BY fecha ASC;
END//

CREATE PROCEDURE SP_LGG_GetTaller(IN _id INT)
BEGIN
    SELECT id_taller, nombre, descripcion, fecha, requisitos, modalidad, cupo 
    FROM talleres 
    WHERE id_taller = _id;
END//

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
    SET nombre = nom, descripcion = descr, fecha = _fecha, requisitos = req, modalidad = _modalidad, cupo = CAST(_cupo AS SIGNED)
    WHERE id_taller = _id;
END//

DELIMITER ;

-- Mostrar resumen de lo creado
SELECT 'Base de datos Ciberistas configurada exitosamente' as Resultado;
SELECT COUNT(*) as 'Talleres creados' FROM talleres;
SELECT COUNT(*) as 'Inscripciones creadas' FROM inscripciones;
SELECT 'Sistema listo para usar' as Estado;
