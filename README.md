<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WAQI - Ecosistema Agrícola Inteligente

Aplicación móvil desarrollada con Expo (React Native) y TypeScript que conecta agricultores, compradores e inversionistas en un ecosistema agrícola digital.

## 🚀 Ejecutar con Expo

### Prerrequisitos

- Node.js (v18 o superior recomendado)
- Expo CLI: `npm install -g expo-cli`
- Expo Go app en tu dispositivo móvil (iOS/Android)

### Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno (opcional para funcionalidad de IA):
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade: `EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key`

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run start:expo
   # o
   npx expo start
   ```

4. Escanea el código QR con Expo Go (Android) o la cámara (iOS)

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start:expo` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Inicia en emulador/dispositivo Android |
| `npm run ios` | Inicia en simulador/dispositivo iOS |
| `npm run web` | Inicia versión web (experimental) |
| `npm run build:expo` | Build de producción con EAS |

## 🌐 App Web Original (Vite)

La versión web original se mantiene en la carpeta `/web`:

```bash
cd web
npm run dev:web
```

## 📱 Características

- **Onboarding**: Flujo de bienvenida con selección de rol
- **Roles de usuario**: Agricultor, Comprador, Inversionista
- **AgroScore**: Sistema de puntuación crediticia agrícola
- **Marketplace**: Catálogo de productos agrícolas
- **IA Asistente**: Chat con Gemini AI personalizado por rol
- **Comunidad**: Feed social para interacción entre usuarios

## 🛠️ Stack Tecnológico

- **Framework**: Expo (Managed Workflow)
- **UI**: React Native + StyleSheet
- **Navegación**: React Navigation
- **Iconos**: Lucide React Native
- **Gráficos SVG**: react-native-svg
- **IA**: Google Gemini API

## 📝 Notas de migración

Esta app fue migrada de una versión web (Vite + React) a React Native/Expo. Algunos elementos pendientes:

- **Gráficos**: El componente `InversionistaView` originalmente usaba `recharts` (web-only). Se requiere implementar con `victory-native` o `react-native-chart-kit` para visualizaciones completas.
- **Animaciones CSS**: Las animaciones `animate-in` de Tailwind fueron reemplazadas con estilos estáticos. Considerar `react-native-reanimated` para animaciones avanzadas.

## 📄 Licencia

Proyecto privado - WAQI Smart Agro Ecosystem
