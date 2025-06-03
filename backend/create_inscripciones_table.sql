-- Script para crear la tabla de inscripciones
USE Ciberistas;

-- Crear tabla inscripciones si no existe
CREATE TABLE IF NOT EXISTS inscripciones (
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

-- Agregar algunas inscripciones de ejemplo
INSERT INTO inscripciones (id_taller, nombre_completo, email, telefono, edad, nivel_educativo, experiencia, motivacion, estado) VALUES
(1, 'María González Pérez', 'maria.gonzalez@email.com', '+52 123 456 7890', 16, 'preparatoria', 'basico', 'Me interesa mucho aprender a crear sitios web desde cero', 'confirmada'),
(1, 'Carlos Rodríguez López', 'carlos.rodriguez@email.com', '+52 987 654 3210', 17, 'preparatoria', 'ninguno', 'Quiero entrar al mundo de la programación web', 'confirmada'),
(2, 'Ana Sofía Martínez', 'ana.martinez@email.com', '+52 555 123 4567', 15, 'secundaria', 'ninguno', 'JavaScript me parece muy interesante para crear páginas interactivas', 'confirmada'),
(3, 'Diego Hernández', 'diego.hernandez@email.com', '+52 444 567 8901', 14, 'secundaria', 'basico', 'Me encanta la idea de crear mis propios videojuegos', 'confirmada'),
(4, 'Isabella Torres', 'isabella.torres@email.com', '+52 333 789 0123', 16, 'preparatoria', 'intermedio', 'La robótica es el futuro y quiero ser parte de él', 'confirmada'),
(5, 'Sebastián Morales', 'sebastian.morales@email.com', '+52 222 345 6789', 18, 'universidad', 'avanzado', 'Busco especializarme en inteligencia artificial', 'confirmada');

SELECT 'Tabla de inscripciones creada exitosamente y poblada con datos de ejemplo' as resultado;
