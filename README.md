# 🛒 Mini Ecommerce – Prueba Técnica FullStack

## 📋 Descripción del Proyecto

Este proyecto es una **prueba técnica FullStack** que consiste en construir un pequeño ecommerce funcional con sistema de autenticación. La aplicación permite a los usuarios registrarse, iniciar sesión, visualizar productos obtenidos desde el backend, agregar productos a un carrito de compras, modificar cantidades, y finalmente guardar el carrito en la base de datos.

### 🎯 Objetivo de la Prueba

Evaluar conocimientos en:
- Manejo de estado en React
- Comunicación con APIs REST
- Autenticación y seguridad con JWT
- Estructura de componentes y buenas prácticas
- Desarrollo FullStack con React + Python

### ✨ Funcionalidades Principales

1. **Sistema de Autenticación**: Registro de usuarios con contraseñas hasheadas (Argon2) y login con JWT
2. **Listado de Productos**: Muestra productos obtenidos desde el backend con nombre, precio y botón para agregar al carrito
3. **Carrito de Compras**: Permite agregar, modificar cantidades, eliminar productos y ver el total general
4. **Persistencia Local**: Mantiene el carrito en `localStorage` hasta guardarlo exitosamente
5. **Guardar Carrito**: Envía los datos al backend y almacena en base de datos con mensaje de confirmación

---

## 📌 Tecnologías Utilizadas

### 🖥️ Backend
- **Lenguaje:** Python 3.10+
- **Framework:** FastAPI
- **Servidor:** Uvicorn
- **ORM:** SQLAlchemy
- **Base de Datos:** SQLite (no requiere instalación de motor de BD)
- **Autenticación:** JWT (JSON Web Tokens)
- **Hashing de Contraseñas:** Argon2
- **Arquitectura:** Diseño por capas con Patrón Repository
- **Documentación:** Swagger / OpenAPI

### 🎨 Frontend
- **Framework:** React con Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Iconografía:** Lucide-react
- **Comunicación HTTP:** Axios
- **Gestión de Estado:** React Hooks

### 📦 Infraestructura
- **Contenedores:** Docker & Docker Compose
- **Arquitectura:** Monolítica con buena separación de capas
- **Control de Versiones:** Git con estrategia de ramas (main/dev)

---

## 📂 Estructura del Proyecto

```text
mini-ecommerce-pt/
│
├── backend/                # Lógica del servidor (FastAPI)
│   ├── app/
│   │   ├── controllers/    # Endpoints y rutas (login, registro, productos, carrito)
│   │   ├── core/           # Configuración de base de datos SQLite
│   │   ├── models/         # Modelos SQLAlchemy (User, Product, Cart)
│   │   ├── repositories/   # Patrón Repository - Capa de acceso a datos
│   │   ├── schemas/        # DTOs - Validación con Pydantic
│   │   ├── security/       # Hash service (Argon2), Token service (JWT), get_current_user
│   │   ├── services/       # Lógica de negocio (user_service, product_service, cart_service)
│   │   ├── dependencies.py # Inyección de dependencias (get_db)
│   │   └── main.py         # Punto de entrada
│   ├── ecommerce.db        # Base de datos SQLite
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/               # Interfaz React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── models/         # Tipos TypeScript
│   │   └── functions/      # Funciones para consumir API
│   ├── .env                # Variables de entorno (incluido)
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.yml      # Orquestación de contenedores
```

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior)
- **Python 3.9+**
- **pip** (gestor de paquetes de Python)
- **Docker** (para ejecución con contenedores)
- **WSL** (si usas Windows para ejecutar Docker)
- Virtualización activada en tu PC

---

## 🚀 Instalación y Ejecución

### 📥 1. Clonar el Repositorio

Primero, crea una carpeta para el proyecto y clona el repositorio:

**Para desarrollo (rama dev):**
```bash
git clone -b dev https://github.com/Wgutierrezl/mini-eccomerce-pt.git .
```

**Para producción (rama main):**
```bash
git clone -b main https://github.com/Wgutierrezl/mini-eccomerce-pt.git .
```

> **Nota:** La rama `dev` es para desarrollo y pruebas. Los cambios se prueban aquí antes de fusionarse con `main`.

---

## 🛠️ Opción A: Ejecución Manual

### ▶️ Configuración del Backend

1. Navega a la carpeta del backend:

```bash
cd ./backend/
```

2. Crea un entorno virtual de Python:

```bash
python -m venv venv
```

3. Activa el entorno virtual:

**En Windows (CMD):**
```bash
venv\Scripts\activate
```

**En Linux/Mac:**
```bash
source venv/bin/activate
```

Una vez activado, verás el indicador del entorno virtual:
```
(venv) C:\mini-eccomerce\backend>
```

4. Instala las dependencias:

```bash
pip install -r requirements.txt
```

5. Ejecuta el servidor:

```bash
uvicorn app.main:app --reload
```

El backend estará disponible en:
- **API:** http://127.0.0.1:8000
- **Swagger UI:** http://127.0.0.1:8000/docs

---

### ▶️ Configuración del Frontend

1. Navega a la carpeta del frontend:

```bash
cd ..
cd ./frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Verifica la configuración en el archivo `.env` (ya incluido en el repositorio):

```env
VITE_API_URL=http://127.0.0.1:8000
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

---

## 🐳 Opción B: Ejecución con Docker (Recomendada)

Esta opción es la más sencilla y garantiza un entorno consistente sin necesidad de configurar Python ni Node.js manualmente.

### Requisitos:
- Docker instalado y en ejecución
- Virtualización activada
- WSL instalado (si usas Windows)

### Pasos:

1. Asegúrate de estar en la raíz del proyecto

2. Verifica que Docker esté corriendo:

```bash
docker ps
```

3. Construye y levanta los contenedores:

```bash
docker-compose up --build
```

Este comando construirá los contenedores para el frontend y backend automáticamente.

### Servicios disponibles:

- **Frontend:** http://localhost:5173
- **Backend (Swagger):** http://localhost:8000/docs
- **API:** http://localhost:8000

---

## 🔗 Endpoints Principales

| Método | Endpoint        | Descripción                                          | Requiere Auth |
|--------|-----------------|------------------------------------------------------|---------------|
| POST   | `/auth/register`| Registra un nuevo usuario                            | No            |
| POST   | `/auth/login`   | Inicia sesión y retorna token JWT                    | No            |
| GET    | `/products`     | Obtiene el listado completo de productos             | Sí            |
| POST   | `/cart`         | Guarda el estado actual del carrito en la base de datos | Sí         |

---

## 👤 Credenciales de Prueba

La base de datos SQLite incluye datos de prueba para facilitar las pruebas:

**Usuario de prueba:**
- **Email:** `walter@gmail.com`
- **Password:** `WALTER`

También puedes registrar nuevos usuarios desde la interfaz de registro.

---

## 🔐 Flujo de Autenticación

1. **Registro:** El usuario se registra con email y contraseña
   - La contraseña se hashea con Argon2 antes de guardarse
   - Se crea el registro en la base de datos

2. **Login:** El usuario inicia sesión con sus credenciales
   - Se verifica el email y la contraseña hasheada
   - Se genera un token JWT con tiempo de expiración
   - El token se almacena en el cliente

3. **Acceso a Recursos:** Todas las peticiones protegidas requieren el token JWT
   - El token se envía en el header `Authorization: Bearer <token>`
   - El backend valida el token antes de procesar la petición

---

## 🧠 Decisiones Técnicas y Arquitectura

### Backend

- **FastAPI:** Elegido por su alto rendimiento, tipado automático y documentación interactiva con Swagger
- **SQLite:** Base de datos ligera que no requiere instalación de motor de BD, ideal para desarrollo y pruebas
- **Argon2:** Algoritmo de hashing robusto y seguro para contraseñas, ganador del Password Hashing Competition
- **JWT:** Sistema de autenticación stateless, escalable y moderno
- **Patrón Repository:** Separa la lógica de acceso a datos del resto de la aplicación
- **Arquitectura en Capas:**
  - **Controllers:** Manejo de rutas y validación de entrada
  - **Services:** Lógica de negocio principal (user_service, product_service, cart_service)
  - **Repositories:** Acceso a datos desde SQLite
  - **Models:** Definición de estructura de BD (User, Product, Cart)
  - **Schemas:** DTOs - Validación y serialización con Pydantic
  - **Security:** Configuración de hash_service, token_service y get_current_user
  - **Core:** Configuración de base de datos
  - **Dependencies:** Inyección de dependencias (get_db)
- **CORS Configurado:** Permite comunicación entre frontend y backend en desarrollo

### Frontend

- **React + TypeScript:** Para desarrollo robusto con tipado estático
- **Vite:** Herramienta de build rápida y moderna
- **Tailwind CSS:** Framework utility-first para estilos rápidos y responsivos
- **Axios:** Cliente HTTP para consumir la API con interceptores para JWT
- **localStorage:** Persistencia del carrito y token de autenticación
- **Componentes Modulares:** Estructura reutilizable y mantenible

### Infraestructura

- **Docker Compose:** Orquestación de contenedores para evitar problemas de "en mi PC sí funcionaba"
- **Arquitectura Monolítica:** Frontend y backend en un mismo repositorio con buena estructura
- **Estrategia de Ramas:**
  - `main`: Rama principal estable
  - `dev`: Rama de desarrollo para pruebas antes de fusionar a main

---

## 📌 Características Implementadas

✅ Sistema de registro de usuarios  
✅ Sistema de login con JWT  
✅ Hashing seguro de contraseñas con Argon2  
✅ Protección de rutas con autenticación  
✅ Listado de productos desde el backend  
✅ Agregar productos al carrito  
✅ Modificar cantidades en el carrito  
✅ Eliminar productos del carrito  
✅ Cálculo automático de subtotales y total general  
✅ Persistencia en `localStorage`  
✅ Guardar carrito en base de datos  
✅ Mensaje de confirmación al usuario  
✅ Arquitectura basada en contenedores  
✅ Documentación interactiva con Swagger  
✅ TypeScript en frontend  
✅ Patrón Repository en backend  
✅ Estrategia de ramas Git (main/dev)  

---

## 🎯 Cómo Usar la Aplicación

1. **Registro:** Al abrir la aplicación, regístrate con tu email y contraseña
2. **Login:** Inicia sesión con tus credenciales (o usa las de prueba)
3. **Ver Productos:** Verás el listado de productos disponibles
4. **Agregar al Carrito:** Haz clic en "Agregar al carrito" en cualquier producto
5. **Modificar Cantidades:** En el carrito, ajusta las cantidades según necesites
6. **Ver Total:** El total se calcula automáticamente
7. **Guardar Carrito:** Presiona el botón "Guardar carrito" para persistir los datos en la base de datos
8. **Confirmación:** Recibirás un mensaje confirmando que el carrito se guardó correctamente

---

## 🔄 Workflow de Desarrollo

El proyecto utiliza una estrategia de ramas para mantener la estabilidad:

- **Rama `main`:** Contiene el código estable y listo para producción
- **Rama `dev`:** Rama de desarrollo donde se prueban nuevas funcionalidades

**Flujo de trabajo:**
1. Los cambios se desarrollan y prueban en `dev`
2. Una vez validados, se fusionan a `main`
3. Esto evita que errores afecten la rama principal

---

## 📝 Consideraciones Finales

Este proyecto demuestra:
- Sistema de autenticación seguro con JWT y Argon2
- Comunicación efectiva entre frontend y backend
- Manejo adecuado del estado en React
- Persistencia de datos híbrida (cliente y servidor)
- Arquitectura limpia y escalable
- Buenas prácticas de desarrollo FullStack
- Control de versiones con estrategia de ramas

La arquitectura permite fácilmente agregar funcionalidades como:
- Roles y permisos de usuarios
- Gestión de inventario
- Procesamiento de pagos
- Historial de carritos guardados
- Recuperación de contraseña

---

## 👨‍💻 Autor

Desarrollado por **Walter Ernesto Gutiérrez Londoño** como prueba técnica FullStack.

**Repositorio:** https://github.com/Wgutierrezl/mini-eccomerce-pt

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos y de evaluación técnica.