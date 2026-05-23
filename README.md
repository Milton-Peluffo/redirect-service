# Redirect Service

Servicio de redirección de URLs implementado como AWS Lambda. Este módulo permite gestionar redirecciones de URLs cortas a URLs largas, manteniendo un registro de la cantidad de clics recibidos por cada enlace.

## Propósito

El servicio proporciona una solución eficiente para acortar y redirigir URLs, ideal para:
- Campañas de marketing con enlaces rastreables
- Compartir enlaces largos de manera más compacta
- Análisis de tráfico mediante seguimiento de clics
- Gestión centralizada de redirecciones

## Funcionamiento

El servicio opera como una función Lambda que:
1. Recibe solicitudes HTTP con códigos de redirección cortos
2. Consulta una base de datos DynamoDB para obtener la URL original
3. Incrementa el contador de clics para el enlace
4. Redirige al usuario a la URL destino con un código HTTP 302

## Tecnologías Utilizadas

- **Runtime**: Node.js 20
- **Lenguaje**: TypeScript
- **Infraestructura**: AWS Lambda
- **Base de Datos**: Amazon DynamoDB
- **SDK**: AWS SDK v3 (@aws-sdk/client-dynamodb, @aws-sdk/lib-dynamodb)
- **Build Tool**: esbuild
- **Testing**: Jest, ts-jest
- **CI/CD**: GitHub Actions

## Estructura del Proyecto

```
redirect-service/
├── src/
│   ├── handlers/
│   │   └── redirect.ts       # Handler principal de Lambda
│   └── utils/
│       └── db.ts             # Configuración de cliente DynamoDB
├── .github/
│   └── workflows/
│       └── ci.yml            # Workflow de CI/CD
├── jest.config.mjs           # Configuración de Jest
├── package.json              # Dependencias del proyecto
├── tsconfig.json             # Configuración de TypeScript
└── README.md                 # Este archivo
```

## Scripts Disponibles

- `npm run build` - Compila el código TypeScript a JavaScript
- `npm run clean` - Elimina el directorio de compilación
- `npm test` - Ejecuta las pruebas unitarias
- `npm run test:coverage` - Ejecuta pruebas con reporte de cobertura

## Variables de Entorno

El servicio requiere las siguientes variables de entorno:

- `TABLE_NAME` - Nombre de la tabla de DynamoDB que almacena las redirecciones
- `AWS_REGION` - Región de AWS (por defecto: us-east-1)

## CI/CD

El proyecto incluye un pipeline de CI/CD configurado con GitHub Actions que:
- Se ejecuta en cada push y pull request
- Instala dependencias automáticamente
- Ejecuta pruebas unitarias
- Genera reportes de cobertura de código
- Sube los artefactos de coverage

## Requisitos Previos

- Node.js 20 o superior
- npm o yarn
- Cuenta de AWS (para despliegue)
- Terraform (para infraestructura como código)

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd redirect-service

# Instalar dependencias
npm install
```

## Desarrollo

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:coverage

# Compilar para producción
npm run build
```

## Seguridad

- No se exponen credenciales en el código
- Las variables de entorno se gestionan mediante configuración de AWS
- El servicio valida los parámetros de entrada antes de procesar
- Manejo de errores robusto para evitar exposición de información sensible

## Licencia

Este proyecto es parte de un módulo educativo de desarrollo en la nube.
