import { GoogleGenAI } from "@google/genai";
import Constants from "expo-constants";
import { UserRole } from "../types";

// Initialize Gemini Client
const apiKey = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

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
    if (!apiKey) {
      return "Error: API key no configurada. Por favor configura EXPO_PUBLIC_GEMINI_API_KEY.";
    }
    
    const modelId = "gemini-2.5-flash"; 
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: ROLE_PROMPTS[role],
      }
    });

    return response.text || "Lo siento, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error de conexión con el asistente inteligente.";
  }
};
