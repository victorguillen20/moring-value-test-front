# 🏆 Torneo Galáctico — Frontend

Interfaz web del **Gran Torneo Galáctico** donde las especies más poderosas del universo compiten por el título intergaláctico.

Este es el frontend de la aplicación, desarrollado con **Angular 17** y un **tema oscuro galáctico** personalizado, desplegado en Railway.

🌐 **Demo en vivo:** https://moring-value-test-front-production.up.railway.app

<img width="1915" height="1123" alt="imagen" src="https://github.com/user-attachments/assets/be7aa5aa-2d49-49ba-8167-f89e05fbb336" />
<img width="1915" height="1123" alt="imagen" src="https://github.com/user-attachments/assets/a9a61d06-cb17-4cf0-ba84-b6b1e39d8599" />
<img width="1918" height="1126" alt="imagen" src="https://github.com/user-attachments/assets/3b9c833b-d0ec-4538-bbf1-b313cd9d6072" />
<img width="1912" height="1123" alt="imagen" src="https://github.com/user-attachments/assets/5d0335d0-a213-4a14-9595-6d200dd136ae" />

---

## 🚀 Stack técnico

- **Angular 17** con **standalone components** (sin NgModules)
- **Bootstrap 5** con un tema oscuro galáctico personalizado
- **ngx-toastr 18** para notificaciones
- **HttpClient** con interceptors funcionales (HttpInterceptorFn)
- **Standalone API services** con `inject()` (patrón moderno)
- **TypeScript estricto** (tsconfig.json con strict + noImplicitOverride)
- **Jasmine + Karma** para tests unitarios (30+ tests)

## 🎨 Sistema de diseño

El frontend implementa un **sistema de diseño galáctico completo** con:

- **Paleta de colores** inspirada en nebulosas y espacio profundo
- **Tipografía moderna** (Inter para body, Space Grotesk para display)
- **Componentes custom**:
  - `btn-cosmic` — botones con gradiente morado-naranja
  - `galaxy-card` — cards con glassmorphism y efecto de nebulosa
  - `stat-card` — para estadísticas del ranking
  - `badge-rank` — para posiciones (gold/silver/bronze)
  - `text-gradient` — texto con fondo degradado
  - `glass-card` — cards con efecto de cristal
- **Animaciones suaves**:
  - `fadeIn`, `fadeInUp`, `fadeInDown`
  - `pulse` (para el botón de combate)
  - `glow` (efecto neón)
  - `float`, `shimmer`, `spin`
- **Sin ng-bootstrap** — solo CSS de Bootstrap 5 + SCSS custom

## ✨ Funcionalidad

### 🔐 Autenticación
- Registro de usuarios (con validaciones: username 3-30, email válido, password 8+)
- Login con persistencia del token JWT en sessionStorage
- Logout que limpia el estado

### 🏠 Home / Dashboard
- Redirige automáticamente a `/ranking` (la página principal)
- Navbar adaptable según estado de autenticación

### 🏆 Ranking
- Muestra las 4 especies con sus victorias
- Posición correcta para empates (1, 1, 3)
- Stat-cards: total especies, victorias del campeón, líder actual
- Badges de oro/plata/bronce según posición

### 🌱 Gestión de Especies
- **Lista** (`/especies`): tabla con todas las especies
- **Nueva** (`/especies/nueva`): formulario con validaciones en tiempo real
- Botón "+ Nueva especie" en el header de la lista

### ⚔️ Combates
- **Manual** (`/combates`): 2 dropdowns para elegir especies + checkbox de desempate
- **Aleatorio** (`/combates/aleatorio`): botón grande para elegir 2 al azar
- **Historial** (`/combates/historial`): tabla con todos los combates
- **Resultado animado** con CSS (victor destacado con badge gold)

### 🛡️ Guards (protección de rutas)
- `authGuard` — bloquea rutas si no hay token
- `publicGuard` — bloquea /auth/login y /auth/register si ya hay sesión
- Redirección automática a `/auth/login` o `/ranking` según el caso

## 🏗️ Arquitectura

El frontend sigue el patrón **modular** de Angular 17:

src/app/
├── core/                        # Servicios singleton y configuración
│   ├── api/                     #   - AuthApi, EspecieApi, CombateApi, RankingApi
│   ├── services/                #   - AuthService, TokenService, ToastService, CorrelationIdService
│   ├── interceptors/            #   - auth, correlation-id, error
│   ├── guards/                  #   - authGuard, publicGuard
│   └── models/                  #   - TypeScript interfaces
│
├── features/                    # Páginas lazy-loaded
│   ├── auth/                    #   - Login, Register
│   ├── especies/                #   - Lista, Form
│   ├── combates/                #   - Manual, Aleatorio, Historial
│   └── ranking/                 #   - RankingView
│
├── shared/                      # Componentes reutilizables
│   ├── components/              #   - Navbar (con tema galáctico)
│   ├── services/                #   - ...
│   └── ...
│
├── environments/                # environment.ts y environment.prod.ts
├── styles/                       # Sistema de diseño galáctico
│   ├── _variables.scss
│   ├── _theme.scss
│   ├── animations.scss
│   ├── utilities.scss
│   └── _components.scss
└── app.config.ts                # Providers globales (router, http, animations, toastr)

## 🌐 Estructura de rutas

| Path | Componente | Guard | Descripción |
|------|-----------|-------|-------------|
| `/` | redirect | — | Redirige a `/ranking` |
| `/ranking` | `RankingView` | — | Ranking público |
| `/especies` | `Lista` | — | Lista pública de especies |
| `/especies/nueva` | `Form` | `authGuard` | Crear especie (requiere login) |
| `/auth/login` | `Login` | `publicGuard` | Solo si NO está logueado |
| `/auth/register` | `Register` | `publicGuard` | Solo si NO está logueado |
| `/combates` | `Manual` | `authGuard` | Combatir 2 especies elegidas |
| `/combates/aleatorio` | `Aleatorio` | `authGuard` | Combatir 2 al azar |
| `/combates/historial` | `Historial` | `authGuard` | Lista de combates |

## 🛠️ Requisitos para ejecutarlo localmente

- **Node.js 20+** (recomendado, pero funciona con 18+)
- **npm 9+** (o yarn / pnpm)
- Una instancia del backend corriendo (local o remota)

## 🚀 Instrucciones de instalación y ejecución

### Opción 1: Modo desarrollo local

# 1. Clonar el repositorio
git clone https://github.com/victorguillen20/moring-value-test-front.git
cd moring-value-test-front

# 2. Instalar dependencias
npm install

# 3. Configurar la URL del backend (crear environment.local.ts)
# Editar src/environments/environment.ts:
# apiUrl: 'http://localhost:8080/api'

# 4. Levantar el dev server
npm start
# o también: ng serve

# La app queda corriendo en http://localhost:4200
Opción 2: Con Docker
# 1. Clonar
git clone https://github.com/victorguillen20/moring-value-test-front.git
cd moring-value-test-front

# 2. Build de la imagen
docker build -t torneo-galactico-front .

# 3. Run del container (con variable de entorno para el backend)
docker run -d -p 80:80 \
  -e API_URL=https://torneo-galactico-back-production.up.railway.app \
  --name torneo-galactico-front \
  torneo-galactico-front
La app queda corriendo en http://localhost:80.
Opción 3: Build estático para deployar en otro lado
npm run build
# Output en dist/frontend/browser
# Subí esa carpeta a cualquier static host (Netlify, Vercel, S3, etc.)
🌍 Variables de entorno
Variable	Descripción
API_URL	URL del backend (se inyecta en el build de Docker)
En Docker, la variable se procesa con sed en el entrypoint para reemplazar la variable en el nginx.conf.
🧪 Tests
npm test
# o en modo CI
npm run test:ci
Los tests cubren:
- Servicios (AuthService, TokenService, CorrelationIdService)
- Guards (AuthGuard, PublicGuard)
- Interceptors (auth, correlation-id, error)
- Lógica de routing
📁 Estructura del proyecto
src/
├── app/
│   ├── core/                  # Servicios, guards, interceptors, models
│   │   ├── api/               #   - HTTP clients tipados
│   │   ├── services/          #   - AuthService, TokenService, ToastService, CorrelationIdService
│   │   ├── interceptors/      #   - auth, correlation-id, error
│   │   ├── guards/            #   - AuthGuard, PublicGuard
│   │   └── models/            #   - Interfaces TypeScript
│   │
│   ├── features/              # Páginas lazy-loaded
│   │   ├── auth/              #   - LoginComponent, RegisterComponent
│   │   ├── especies/          #   - ListaComponent, FormComponent
│   │   ├── combates/          #   - ManualComponent, AleatorioComponent, HistorialComponent
│   │   └── ranking/           #   - RankingViewComponent
│   │
│   ├── shared/                # Componentes reutilizables
│   │   └── components/        #   - Navbar
│   │
│   ├── app.config.ts          # Configuración global (router, http, animations, toastr)
│   ├── app.routes.ts          # Definición de rutas
│   ├── app.component.ts       # Componente raíz
│   ├── app.component.html
│   └── app.component.scss
│
├── environments/
│   ├── environment.ts         # Dev (localhost:8080)
│   └── environment.prod.ts    # Prod (Railway backend)
│
├── styles/                    # Sistema de diseño galáctico
│   ├── _variables.scss        #   - Colores, gradients, shadows
│   ├── _theme.scss            #   - Bootstrap overrides
│   ├── _animations.scss       #   - Keyframes + clases utility
│   ├── _utilities.scss        #   - Clases utilitarias
│   └── _components.scss       #   - btn-cosmic, galaxy-card, etc.
│
├── styles.scss                # Entry point (importa los partials)
├── index.html
├── main.ts
└── test.ts
🔐 Sistema de autenticación
Flujo
1. Usuario hace login → Backend devuelve JWT
2. Frontend guarda JWT en sessionStorage
3. AuthInterceptor agrega "Authorization: Bearer <jwt>" a cada request
4. CorrelationIdInterceptor agrega "X-Correlation-Id" a cada request
5. Backend valida el JWT en JwtAuthenticationFilter
6. AuthInterceptor del backend rechaza con 401 si no es válido
7. ErrorInterceptor muestra toasts con el mensaje del backend
Interceptors
- CorrelationIdInterceptor: agrega header X-Correlation-Id (genera UUID si no existe)
- AuthInterceptor: agrega Authorization: Bearer <token> (excluye paths públicos)
- ErrorInterceptor: limpia el token si el backend devuelve 401
🎨 Sistema de diseño galáctico
El frontend implementa un tema oscuro galáctico completo:
- Background: degradado radial con nebulosas púrpuras y cyan
- Tipografía:
- Inter (400-800) para body
- Space Grotesk (500-700) para display
- JetBrains Mono (400-500) para código
- Paleta:
- Space black: #0a0e27
- Nebula violet: #6c3ce0
- Star cyan: #22d3ee
- Energy green: #10b981
- Plasma orange: #f97316
- Componentes destacados:
- btn-cosmic — botón con gradiente morado-naranja y glow
- galaxy-card — card con glassmorphism y pulso animado
- stat-card — para estadísticas
- badge-rank — para posiciones
🌐 Demo en vivo
- Frontend: https://moring-value-test-front-production.up.railway.app
- Backend API: https://torneo-galactico-back-production.up.railway.app
- Swagger del backend: https://torneo-galactico-back-production.up.railway.app/swagger-ui.html
🐛 Troubleshooting
Error CORS en el navegador
Si ves "Solicitud CORS bloqueada":
- El backend no permite el origin del frontend
- Solución: en el backend, agregar la URL del frontend a CORS_ALLOWED_ORIGINS
Error 401 al hacer login
- El token JWT expiró
- Solución: volver a hacer login
La página queda en blanco
- Verificar que el backend esté corriendo (/actuator/health)
- Verificar que la variable environment.apiUrl apunte al backend correcto
🔗 Repos relacionados
- Backend (Spring Boot): moring-value-test-back (https://github.com/victorguillen20/moring-value-test-back)
- Colección Postman: Ver backend/postman/torneo-galactico.postman_collection.json
