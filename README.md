# Sistema de Gestión para Abogados

Proyecto desarrollado como parte del proyecto integrador, orientado a la gestión de clientes y casos jurídicos mediante una arquitectura moderna basada en contenedores.

## Tecnologías

### Frontend

- Next.js
- React
- TypeScript
- Bun

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- Bun

### DevOps

- Docker
- Docker Compose
- Git
- GitHub Actions

---

# Arquitectura

```
┌──────────────┐
│   Next.js    │
└──────┬───────┘
       │ HTTP
       ▼
┌──────────────┐
│    NestJS    │
└──────┬───────┘
       │ Prisma
       ▼
┌──────────────┐
│ PostgreSQL   │
└──────────────┘
```

Todos los servicios se ejecutan mediante Docker Compose.

---

# Estructura del proyecto

```
.
├── frontend
├── backend
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# Requisitos

- Docker
- Docker Compose
- Git

No es necesario instalar Node.js, PostgreSQL o Bun si se ejecuta completamente mediante Docker.

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/camilo51/proyecto_devops.git
```

Entrar al proyecto

```bash
cd abogados
```

Levantar los servicios

```bash
docker compose up --build
```

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:3001
```

---

# Base de datos

La base de datos utilizada es PostgreSQL ejecutándose en un contenedor Docker.

El acceso desde el backend se realiza mediante Prisma ORM.

---

# Estado del proyecto

- [x] Configuración inicial
- [x] Docker
- [x] Docker Compose
- [x] PostgreSQL
- [x] Prisma ORM
- [x] Autenticación
- [x] Gestión de clientes
- [x] Invitaciones
- [x] Gestión de casos
- [x] Pruebas
- [x] GitHub Actions