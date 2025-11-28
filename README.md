<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WAQI - Ecosistema Agrícola Inteligente

Una aplicación móvil y web que conecta agricultores, compradores e inversionistas en un ecosistema agrícola inteligente.

## 📱 Aplicación Móvil (Expo)

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn
- Expo Go app en tu dispositivo móvil (para desarrollo)

### Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):
   - Crea un archivo `.env.local` con tu API key de Gemini:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

### Ejecutar la App

```bash
# Iniciar el servidor de desarrollo de Expo
npm run start

# O usando alias específicos
npm run start:expo

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

3. Escanea el código QR con la app Expo Go (Android) o la cámara (iOS)

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start` | Inicia el servidor de desarrollo de Expo |
| `npm run start:expo` | Alias para iniciar Expo |
| `npm run android` | Inicia en emulador/dispositivo Android |
| `npm run ios` | Inicia en simulador/dispositivo iOS |
| `npm run web` | Inicia versión web de Expo |
| `npm run build:expo` | Construye la app con EAS Build |

## 🌐 Aplicación Web Original (Vite)

La aplicación web original se mantiene en la carpeta `/web`.

### Ejecutar la versión web (Vite)

```bash
# Desde la carpeta raíz
npm run web:dev

# O entrando a la carpeta web
cd web
npm run dev
```

## 🏗️ Estructura del Proyecto

```
WAQI/
├── App.tsx              # Punto de entrada de Expo
├── app.json             # Configuración de Expo
├── babel.config.js      # Configuración de Babel para Expo
├── tsconfig.json        # Configuración de TypeScript
├── package.json         # Dependencias y scripts
├── assets/              # Recursos (iconos, splash screens)
├── components/          # Componentes de React Native
│   ├── AIChat.tsx       # Chat con IA (Gemini)
│   ├── Onboarding.tsx   # Pantallas de bienvenida
│   ├── RoleSelection.tsx
│   ├── shared/          # Componentes compartidos
│   ├── ui/              # Componentes de UI
│   └── views/           # Vistas principales por rol
├── services/            # Servicios (API Gemini)
├── types.ts             # Definiciones de TypeScript
└── web/                 # App web original (Vite)
    ├── index.html
    ├── index.tsx
    └── vite.config.ts
```

## 👥 Roles de Usuario

- **Agricultor**: Gestiona cultivos, monitorea clima, mejora AgroScore
- **Comprador**: Encuentra productos verificados, contacta productores
- **Inversionista**: Analiza riesgos, ROI, financia proyectos agrícolas

## 🤖 Asistente IA

La app incluye un asistente de IA personalizado por rol, powered by Google Gemini:
- **CampoIA** (Agricultor): Asesor agrónomo
- **MercadoIA** (Comprador): Analista de mercado
- **RiskAI** (Inversionista): Asesor financiero

## 📝 Notas de Migración a Expo

### Cambios Realizados
- Migración de componentes web (div, button, etc.) a React Native (View, TouchableOpacity, etc.)
- Estilos CSS/Tailwind convertidos a StyleSheet de React Native
- Navegación implementada con React Navigation (Bottom Tabs + Native Stack)
- Icons migrados de lucide-react a lucide-react-native
- SVG implementado con react-native-svg
- Servicio de Gemini adaptado para usar expo-constants

### Limitaciones Conocidas
- **Recharts**: La librería de gráficos web-only fue reemplazada por una visualización simplificada. Para gráficos completos, considerar usar victory-native o react-native-svg-charts.
- **Slider**: Se usa un control de incremento/decremento manual. Para un slider nativo, instalar @react-native-community/slider.
- **Animaciones CSS**: Las animaciones CSS fueron removidas. Para animaciones nativas, considerar react-native-reanimated.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados.
