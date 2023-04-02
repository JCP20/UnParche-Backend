# ADR: Arquitectura hexagonal

# Contexto: TERMINAR

# Arquitectura: 
## Estructura actual de carpetas:
- adapters
Capa de handlers (controladores) y casos de uso, tienen acceso a todas las capas core del proyecto mediante interfaces
- domain
Capa dominio aislada del resto de capas y modela las entidades core del negocio
- helpers
Servicios para los casos de uso, tienen acceso a todas las capas core del proyecto mediante interfaces
- models
DTOs y mappers para modelamiento de datos

src/
|-- adapters/
|   |   |-- controllers/
|   |   |   |-- user
|   |   |   |   |-- getAll.ts
|   |   |   |   |-- getByID.ts
|   |   |   |   |-- login.ts
|   |   |   |   |-- register.ts
|   |   |   |-- auth.controller.ts
|   |   |-- middlewares/
|   |   |   |-- validate-fields.ts
|   |   |   |-- validate-jwt.ts
|   |   |-- routes/
|   |   |   |-- userRoutes.ts
|-- config/
|   |-- config.ts
|   |-- database.ts
|-- domain/
|   |-- entities/
|   |   |-- User.ts
|   |   |-- Group.ts
|   |-- interfaces/
|   |   |-- UserModel.ts
|-- helpers/
|   |-- emailTemplates/
|   |   |-- verifyUser.ts
|   |-- jwt.ts
|   |-- email.ts
|   |-- customChecks.ts
|-- models/
|   |-- userModel.ts
|-- main.ts
