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
|   |   |   |-- auth
|   |   |   |   |-- login.ts
|   |   |   |   |-- register.ts
|   |   |   |   |-- revalidate.ts
|   |   |   |   |-- verifyEmail.ts

|   |   |   |-- group
|   |   |   |   |-- delete.ts
|   |   |   |   |-- getAllGroups.ts
|   |   |   |   |-- getByName.ts
|   |   |   |   |-- getByUser.ts
|   |   |   |   |-- register.ts
|   |   |   |   |-- update.ts
|   |   |   |-- user
|   |   |   |   |-- enrollGroup.ts
|   |   |   |   |-- getAll.ts
|   |   |   |   |-- getByID.ts
|   |   |   |   |-- QuitGroup.ts
|   |   |   |   |-- updateUser.ts
|   |   |-- middlewares/
|   |   |   |-- validate-fields.ts
|   |   |   |-- validate-jwt.ts
|   |   |-- routes/
|   |   |   |-- auth.routes.ts
|   |   |   |-- group.routes.ts
|   |   |   |-- user.routes.ts
|-- config/
|   |-- config.ts
|   |-- database.ts
|-- domain/
|   |-- entities/
|   |   |-- users.ts
|   |   |-- groups.ts
|-- helpers/
|   |-- emailTemplates/
|   |   |-- verifyUser.ts
|   |-- jwt.ts
|   |-- email.ts
|   |-- customChecks.ts
|-- models/
|   |-- User.model.ts
|   |-- Group.model.ts
|-- index.ts
