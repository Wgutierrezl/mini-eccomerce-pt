# 🛒 Mini Ecommerce – Prueba Técnica FullStack

## 📋 Descripción del Proyecto

Este proyecto es una **prueba técnica FullStack** que consiste en construir un pequeño ecommerce funcional. La aplicación permite a los usuarios visualizar productos obtenidos desde el backend, agregar productos a un carrito de compras, modificar cantidades, y finalmente guardar el carrito en la base de datos.

### 🎯 Objetivo de la Prueba

Evaluar conocimientos en:
- Manejo de estado en React
- Comunicación con APIs REST
- Estructura de componentes y buenas prácticas
- Desarrollo FullStack con React + Python

### ✨ Funcionalidades Principales

1. **Listado de Productos**: Muestra productos obtenidos desde el backend con nombre, precio y botón para agregar al carrito
2. **Carrito de Compras**: Permite agregar, modificar cantidades, eliminar productos y ver el total general
3. **Persistencia Local**: Mantiene el carrito en `localStorage` hasta guardarlo exitosamente
4. **Guardar Carrito**: Envía los datos al backend y almacena en base de datos con mensaje de confirmación

---

## 📌 Tecnologías Utilizadas

### 🖥️ Backend
- **Lenguaje:** Python 3.10+
- **Framework:** FastAPI
- **Servidor:** Uvicorn
- **ORM:** SQLAlchemy
- **Base de Datos:** SQLite (no requiere instalación de motor de BD)
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

---

## 📂 Estructura del Proyecto

```text
mini-ecommerce-pt/
│
├── backend/                # Lógica del servidor (FastAPI)
│   ├── app/
│   │   ├── controllers/    # Endpoints y rutas
│   │   ├── core/           # Configuraciones (CORS, BD)
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── repositories/   # Patrón Repository
│   │   ├── schemas/        # Validación Pydantic
│   │   ├── services/       # Lógica de negocio
│   │   ├── dependencies.py # Inyección de dependencias
│   │   └── main.py         # Punto de entrada
│   └── requirements.txt
│
├── frontend/               # Interfaz React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   └── services/       # Funciones para consumir API
│   ├── .env                # Variables de entorno (incluido)
│   └── package.json
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

```bash
git clone -b main https://github.com/Wgutierrezl/mini-eccomerce-pt.git .
```

Este comando clonará solo las carpetas necesarias en tu directorio actual.

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

| Método | Endpoint     | Descripción                                          |
|--------|--------------|------------------------------------------------------|
| GET    | `/products`  | Obtiene el listado completo de productos            |
| POST   | `/cart`      | Guarda el estado actual del carrito en la base de datos |

---

## 🧠 Decisiones Técnicas y Arquitectura

### Backend

- **FastAPI:** Elegido por su alto rendimiento, tipado automático y documentación interactiva con Swagger
- **SQLite:** Base de datos ligera que no requiere instalación de motor de BD, ideal para desarrollo y pruebas
- **Patrón Repository:** Separa la lógica de acceso a datos del resto de la aplicación
- **Arquitectura en Capas:**
  - **Controllers:** Manejo de rutas y validación de entrada
  - **Services:** Lógica de negocio principal
  - **Repositories:** Acceso a datos
  - **Models:** Definición de estructura de BD
  - **Schemas:** Validación y serialización con Pydantic
- **CORS Configurado:** Permite comunicación entre frontend y backend en desarrollo

### Frontend

- **React + TypeScript:** Para desarrollo robusto con tipado estático
- **Vite:** Herramienta de build rápida y moderna
- **Tailwind CSS:** Framework utility-first para estilos rápidos y responsivos
- **Axios:** Cliente HTTP para consumir la API
- **localStorage:** Persistencia del carrito antes de guardarlo en BD
- **Componentes Modulares:** Estructura reutilizable y mantenible

### Infraestructura

- **Docker Compose:** Orquestación de contenedores para evitar problemas de "en mi PC sí funcionaba"
- **Arquitectura Monolítica:** Frontend y backend en un mismo repositorio con buena estructura
- **Sin Datos Sensibles:** Configuración de CORS abierta apropiada para desarrollo

---

## 📌 Características Implementadas

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

---

## 🎯 Cómo Usar la Aplicación

1. **Ver Productos:** Al abrir la aplicación, verás el listado de productos disponibles
2. **Agregar al Carrito:** Haz clic en "Agregar al carrito" en cualquier producto
3. **Modificar Cantidades:** En el carrito, ajusta las cantidades según necesites
4. **Ver Total:** El total se calcula automáticamente
5. **Guardar Carrito:** Presiona el botón "Guardar carrito" para persistir los datos en la base de datos
6. **Confirmación:** Recibirás un mensaje confirmando que el carrito se guardó correctamente

---

## 📝 Consideraciones Finales

Este proyecto demuestra:
- Comunicación efectiva entre frontend y backend
- Manejo adecuado del estado en React
- Persistencia de datos híbrida (cliente y servidor)
- Arquitectura limpia y escalable
- Buenas prácticas de desarrollo FullStack

La arquitectura permite fácilmente agregar funcionalidades como:
- Sistema de autenticación
- Gestión de inventario
- Procesamiento de pagos
- Historial de carritos guardados

---

## 👨‍💻 Autor

Desarrollado por **Walter Ernesto Gutiérrez Londoño** como prueba técnica FullStack.

**Repositorio:** https://github.com/Wgutierrezl/mini-eccomerce-pt

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos y de evaluación técnica.