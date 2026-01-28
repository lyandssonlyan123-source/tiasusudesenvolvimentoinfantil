
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiAssistant {
  /**
   * Asks a question to the Gemini model.
   * Instantiates GoogleGenAI inside the method to ensure fresh configuration and compliance with guidelines.
   */
  async askQuestion(question: string) {
    try {
      // Always use the correct initialization from guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: question,
        config: {
          systemInstruction: `Você é uma assistente virtual carinhosa e profissional da Clínica Tia Susu. 
          Seu tom é empático, acolhedor e informativo. 
          Seu objetivo é tranquilizar pais e sugerir agendar uma avaliação na clínica se houver preocupações. 
          Você NÃO dá diagnósticos médicos, apenas orientações gerais sobre desenvolvimento infantil baseadas em fonoaudiologia, psicologia e terapia ocupacional.
          Endereço: Avenida dos Holandeses, Centro Comercial Fecomércio, Sala 208.
          Telefone/WhatsApp: (98) 8495-2333.
          E-mail: tiasusucfi@gmail.com.`,
        },
      });

      // The GenerateContentResponse object features a text property (not a method).
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Desculpe, estou tendo um probleminha para processar sua pergunta agora. Que tal falar diretamente com nossa equipe pelo WhatsApp?";
    }
  }
}
