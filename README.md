Backend project for an ecommerce application.  
Proyecto backend para una aplicación ecommerce.

It includes user CRUD, JWT authentication, Passport, encrypted passwords with bcrypt, and a simple Handlebars view to test register, login, and current user validation.  
Incluye CRUD de usuarios, autenticación con JWT, Passport, contraseñas encriptadas con bcrypt y una vista simple con Handlebars para probar registro, login y validación del usuario actual.

---

## Technologies Used / Tecnologías usadas

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- Passport JWT
- JSON Web Token
- bcrypt
- cookie-parser
- dotenv
- Handlebars

---

## Features / Funcionalidades

- Create users / Crear usuarios
- List users / Listar usuarios
- Get user by ID / Buscar usuario por ID
- Update users / Actualizar usuarios
- Delete users / Eliminar usuarios
- Register user / Registrar usuario
- Login user / Iniciar sesión
- Generate JWT token / Generar token JWT
- Validate logged user with `/api/sessions/current` / Validar usuario logueado con `/api/sessions/current`
- Encrypt passwords with `bcrypt.hashSync` / Encriptar contraseñas con `bcrypt.hashSync`
- Handlebars view to test register, login and current user / Vista con Handlebars para probar registro, login y usuario actual

---

## User Model / Modelo User

The user model contains the following fields:  
El modelo de usuario contiene los siguientes campos:

- `first_name`
- `last_name`
- `email`
- `age`
- `password`
- `cart`
- `role`

---

## Main Routes / Rutas principales

### Sessions

```txt
POST /api/sessions/register
POST /api/sessions/login
GET /api/sessions/current

