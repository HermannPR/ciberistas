# 🚀 Instrucciones para Iniciar el Proyecto Ciberistas

## 📋 Requisitos Previos
- ✅ .NET 9.0 SDK instalado
- ✅ Node.js (versión 18 o superior)
- ✅ MySQL Server ejecutándose (puerto 3306)
- ✅ Base de datos `ciberistas` configurada (usuario: root, contraseña: root)

## 🗄️ Configuración de Base de Datos

### Verificar que MySQL esté ejecutándose:
```powershell
mysql -u root -proot -e "SHOW DATABASES;"
```

### Si la base de datos no existe, ejecutar:
```powershell
cd "d:\vscodeprojects\CIBERISTASLOCALITER2\ciber-crea-futuro-LOCAL\backend"; mysql -u root -proot < setup_complete_database.sql
```

## 🔧 Backend (.NET API)

### Terminal 1 - Iniciar Backend:
```powershell
cd "d:\vscodeprojects\CIBERISTASLOCALITER2\ciber-crea-futuro-LOCAL\backend\ApiCiberistas"; dotnet run --urls "http://localhost:5211"
```

**El backend estará disponible en:** `http://localhost:5211`

### Endpoints principales:
- `GET /Ciberistas/GetTalleres` - Obtener todos los talleres
- `GET /Ciberistas/GetTallerConId/{id}` - Obtener taller por ID
- `POST /Ciberistas/CrearInscripcion` - Crear nueva inscripción
- `GET /Ciberistas/GetInscripciones/{id_taller}` - Obtener inscripciones por taller

## 🎨 Frontend (React + Vite)

### Terminal 2 - Iniciar Frontend:
```powershell
cd "d:\vscodeprojects\CIBERISTASLOCALITER2\ciber-crea-futuro-LOCAL\frontend"; npm run dev -- --port 8080
```

**El frontend estará disponible en:** `http://localhost:8080`

## 🧪 Verificación de Funcionamiento

### 1. Probar Backend:
```powershell
curl http://localhost:5211/Ciberistas/GetTalleres
```

### 2. Probar Frontend:
Abrir navegador en `http://localhost:8080` y verificar:
- ✅ La página principal carga correctamente
- ✅ Los talleres se muestran en la sección de estadísticas
- ✅ La página `/workshops` muestra la lista de talleres
- ✅ Los modales de inscripción funcionan

## 🔄 Comandos de Desarrollo

### Reinstalar dependencias del frontend:
```powershell
cd "d:\vscodeprojects\CIBERISTASLOCALITER2\ciber-crea-futuro-LOCAL\frontend"; npm install
```

### Limpiar y reconstruir backend:
```powershell
cd "d:\vscodeprojects\CIBERISTASLOCALITER2\ciber-crea-futuro-LOCAL\backend\ApiCiberistas"; dotnet clean; dotnet build
```

## 🛠️ Solución de Problemas

### Error 500 en API:
1. Verificar que MySQL esté ejecutándose
2. Verificar que la base de datos `ciberistas` exista
3. Verificar que los procedimientos almacenados estén creados

### Error de conexión de frontend:
1. Verificar que el backend esté ejecutándose en puerto 5211
2. Verificar que no hay conflictos de CORS

### Puertos ocupados:
```powershell
# Verificar qué proceso usa el puerto 5211
netstat -ano | findstr :5211

# Verificar qué proceso usa el puerto 8080
netstat -ano | findstr :8080
```

## 📁 Estructura del Proyecto

```
ciber-crea-futuro-LOCAL/
├── backend/
│   └── ApiCiberistas/          # API .NET Core
├── frontend/                   # React + Vite
├── setup_complete_database.sql # Script de base de datos
└── INSTRUCCIONES_INICIO.md    # Este archivo
```

## ✨ Funcionalidades Implementadas

- ✅ Sistema completo de talleres
- ✅ Sistema de inscripciones con validación de cupos
- ✅ Modal de inscripción con formulario completo
- ✅ Navbar en todas las páginas
- ✅ Estadísticas en tiempo real
- ✅ Base de datos MySQL con datos de ejemplo
- ✅ API REST completa con endpoints funcionales

---

**¡Listo para usar!** 🎉

Una vez que ambos servidores estén ejecutándose, el sistema estará completamente funcional.
