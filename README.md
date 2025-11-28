<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WAQI - Ecosistema Agrícola Inteligente

Aplicación móvil creada con **Expo** y **React Native** + **TypeScript** que conecta agricultores, compradores e inversionistas en un ecosistema agrícola digital.

## 📱 Ejecutar en Expo

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- [Expo Go](https://expo.dev/client) en tu dispositivo móvil (iOS/Android) o un emulador

### Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. (Opcional) Configurar la API de Gemini:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade tu clave API:
     ```
     EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui
     ```

### Ejecutar la aplicación

```bash
# Iniciar el servidor de desarrollo de Expo
npm run start:expo

# O ejecutar directamente en Android
npm run android

# O ejecutar en iOS
npm run ios

# O ejecutar en web
npm run web
```

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start:expo` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Ejecuta en dispositivo/emulador Android |
| `npm run ios` | Ejecuta en dispositivo/simulador iOS |
| `npm run web` | Ejecuta en navegador web |
| `npm run build:expo` | Exporta la aplicación para producción |

## 🏗️ Estructura del Proyecto

```
WAQI/
├── App.tsx                 # Punto de entrada de React Native
├── app.json               # Configuración de Expo
├── babel.config.js        # Configuración de Babel
├── metro.config.js        # Configuración de Metro bundler
├── tsconfig.json          # Configuración de TypeScript
├── types.ts               # Tipos TypeScript compartidos
├── components/            # Componentes React Native
│   ├── AIChat.tsx        # Chat con IA (Gemini)
│   ├── Onboarding.tsx    # Pantalla de bienvenida
│   ├── shared/           # Componentes compartidos
│   │   └── CommunityFeed.tsx
│   ├── ui/               # Componentes de UI
│   │   └── AgroScoreGauge.tsx
│   └── views/            # Vistas principales
│       ├── AgricultorView.tsx
│       ├── CompradorView.tsx
│       ├── InversionistaView.tsx
│       └── ProfileView.tsx
├── services/             # Servicios y APIs
│   └── gemini.ts        # Integración con Gemini AI
├── assets/              # Recursos (iconos, imágenes)
└── web/                 # Archivos web originales (referencia)
```

## 🎯 Funcionalidades

### Roles de Usuario
- **Agricultor**: Gestión de cultivos, clima, AgroScore
- **Comprador**: Marketplace de productos agrícolas
- **Inversionista**: Análisis de proyectos y ROI

### Características
- 📊 **AgroScore**: Sistema de puntuación crediticia agrícola
- 🤖 **IA Integrada**: Asistente inteligente con Gemini
- 🌤️ **Clima**: Widget de clima en tiempo real
- 📈 **Analytics**: Gráficos de inversión
- 👥 **Comunidad**: Feed social entre usuarios

## 🔧 Tecnologías

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Lucide React Native** - Iconos
- **React Native SVG** - Gráficos vectoriales
- **Google Gemini** - IA generativa

## 📝 Notas de Migración

Esta aplicación fue migrada de una versión web (Vite + React) a Expo + React Native.

### Cambios principales:
- Elementos DOM (`div`, `span`, `button`) → Componentes RN (`View`, `Text`, `TouchableOpacity`)
- CSS/Tailwind → `StyleSheet` de React Native
- `recharts` (web) → Gráficos SVG personalizados
- `lucide-react` → `lucide-react-native`
- Variables de entorno Vite → Expo Constants

### Archivos web preservados:
Los archivos originales de la versión web se encuentran en la carpeta `/web` para referencia.

## 📄 Licencia

Proyecto privado - WAQI Ecosistema Agrícola
