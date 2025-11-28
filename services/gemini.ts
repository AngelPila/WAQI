import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserRole } from '../types';

// Nota: En producción, usa variables de entorno con expo-constants
const API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key de Gemini

const ROLE_PROMPTS: Record<UserRole, string> = {
  agricultor: `Eres "CampoIA", un ingeniero agrónomo experto en Ecuador. 
  Datos actuales: Clima 24°C, Humedad 65%. 
  Responde dudas sobre cultivos de Maíz y Soya. Sé breve, técnico y usa emojis.`,
  
  comprador: `Eres "MercadoIA", un analista de mercado agrícola. 
  Datos: Maíz $18.50/qq (subiendo), Cacao $145/qq (subiendo).
  Ayuda a encontrar mejores precios y proveedores. Sé profesional y directo.`,
  
  inversionista: `Eres "RiskAI", un asesor financiero de riesgo agrícola. 
  Contexto: Mercado alcista. Proyectos: Banano (ROI 15%), Arroz (ROI 18%).
  Analiza riesgos y retorno de inversión. Usa terminología financiera.`,
};

export const sendMessageToGemini = async (
  message: string, 
  role: UserRole
): Promise<string> => {
  try {
    // Modo simulado si no hay API key
    if (API_KEY === 'TU_API_KEY_AQUI') {
      // Respuestas simuladas por rol
      const mockResponses: Record<UserRole, string[]> = {
        agricultor: [
          '🌽 El maíz necesita riego cada 3-4 días en esta época. Humedad ideal: 60-70%.',
          '🌱 Para soya, aplica fertilizante NPK 10-30-10 antes de la floración.',
          '☀️ Con 24°C es buen momento para sembrar. Evita las horas de máximo sol.',
        ],
        comprador: [
          '📊 El maíz está en $18.50/qq, tendencia alcista. Buen momento para cerrar contratos.',
          '🤝 Te recomiendo contactar a Finca La Esperanza, tienen producto verificado.',
          '📈 El cacao subió 5% esta semana. Considera comprar antes de fin de mes.',
        ],
        inversionista: [
          '💰 ROI proyectado del banano: 12-15% anual. Riesgo bajo según AgroScore.',
          '📉 El proyecto arrocero tiene mayor volatilidad pero ROI del 18%.',
          '🎯 Diversifica: 60% bajo riesgo, 40% medio riesgo para optimizar retornos.',
        ],
      };
      
      const responses = mockResponses[role];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(`${ROLE_PROMPTS[role]}\n\nUsuario: ${message}`);
    const response = await result.response;
    return response.text() || 'Lo siento, no pude procesar tu solicitud.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error de conexión con el asistente inteligente. Intenta de nuevo.';
  }
};
