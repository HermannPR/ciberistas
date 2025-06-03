-- Crear base de datos y tabla si no existen
USE Ciberistas;

-- Crear tabla Talleres si no existe
CREATE TABLE IF NOT EXISTS Talleres (
    id_taller INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    requisitos TEXT NOT NULL,
    modalidad VARCHAR(100) NOT NULL,
    cupo INT NOT NULL
);

-- Limpiar datos existentes
TRUNCATE TABLE Talleres;

-- Insertar talleres realistas para Ciberistas
INSERT INTO Talleres (nombre, fecha, descripcion, requisitos, modalidad, cupo) VALUES
('Programación Web con HTML y CSS', '2025-06-15 10:00:00', 'Aprende los fundamentos del desarrollo web creando tu primera página web desde cero. Descubrirás cómo estructurar contenido con HTML y darle estilo con CSS.', 'Conocimientos básicos de computación. Ganas de aprender y crear.', 'Presencial', 25),

('JavaScript para Principiantes', '2025-06-20 14:00:00', 'Sumérgete en el mundo de la programación con JavaScript. Aprenderás a crear interactividad en páginas web y desarrollar tu primera aplicación.', 'Conocimientos básicos de HTML y CSS. Computadora con navegador web.', 'Presencial', 20),

('Creación de Videojuegos con Scratch', '2025-06-25 09:00:00', 'Diseña y programa tu propio videojuego usando Scratch. Aprenderás conceptos de programación de manera visual y divertida mientras das vida a tus ideas.', 'Ningún requisito previo. Solo creatividad y ganas de divertirse.', 'Presencial', 30),

('Robótica con Arduino', '2025-07-01 15:30:00', 'Construye y programa robots usando Arduino. Aprenderás electrónica básica y programación mientras creates proyectos increíbles como robots que siguen líneas.', 'Interés en tecnología. No se requiere experiencia previa.', 'Presencial', 15),

('Desarrollo de Apps Móviles', '2025-07-05 11:00:00', 'Crea tu primera aplicación móvil usando herramientas modernas. Aprenderás el proceso completo desde la idea hasta la publicación en las tiendas de aplicaciones.', 'Conocimientos básicos de programación. Smartphone para pruebas.', 'Híbrido', 18),

('Inteligencia Artificial para Jóvenes', '2025-07-10 13:00:00', 'Descubre el fascinante mundo de la IA. Aprenderás a crear chatbots simples, sistemas de recomendación y proyectos de machine learning adaptados para principiantes.', 'Conocimientos básicos de matemáticas. Interés en tecnología.', 'Virtual', 40),

('Diseño de Páginas Web Responsivas', '2025-07-15 10:30:00', 'Aprende a crear sitios web que se vean perfectos en cualquier dispositivo. Dominarás CSS Grid, Flexbox y técnicas modernas de diseño web responsivo.', 'Conocimientos de HTML y CSS básico. Editor de código instalado.', 'Presencial', 22),

('Programación de Juegos con Python', '2025-07-20 16:00:00', 'Desarrolla juegos increíbles usando Python y Pygame. Desde simples juegos de texto hasta aventuras gráficas, aprenderás programación de manera divertida.', 'Conocimientos básicos de programación. Python instalado.', 'Híbrido', 20),

('Creación de Contenido Digital', '2025-07-25 14:30:00', 'Aprende a crear contenido atractivo para redes sociales y plataformas digitales. Incluye edición de video, diseño gráfico y estrategias de comunicación digital.', 'Creatividad y ganas de expresarse. Smartphone o cámara básica.', 'Presencial', 25),

('Ciberseguridad para Principiantes', '2025-08-01 12:00:00', 'Descubre cómo protegerte en el mundo digital. Aprenderás sobre contraseñas seguras, navegación segura, y cómo proteger tu información personal en línea.', 'Uso básico de computadoras e internet. Interés en seguridad.', 'Virtual', 35),

('Programación con Bloques (Blockly)', '2025-08-05 09:30:00', 'Introduce a los más pequeños al mundo de la programación usando bloques visuales. Una forma divertida e intuitiva de aprender lógica de programación.', 'Edad: 8-12 años. Saber leer y usar mouse/teclado básico.', 'Presencial', 28),

('Creación de Podcasts Juveniles', '2025-08-10 15:00:00', 'Aprende a crear y producir tu propio podcast. Desde la planificación del contenido hasta la edición de audio y distribución en plataformas digitales.', 'Creatividad y buena comunicación oral. Micrófono básico.', 'Híbrido', 16);

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_talleres FROM Talleres;
SELECT * FROM Talleres LIMIT 5;
