
import { GoogleGenAI, Type } from "@google/genai";
import { Document } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartTags = async (fileName: string, snippet?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3-5 keywords/tags for a document titled "${fileName}"${snippet ? ` with the following content summary: "${snippet}"` : ''}. Return only a comma-separated list of lowercase tags.`,
      config: {
        temperature: 0.2,
      },
    });
    
    const tags = response.text?.split(',').map(t => t.trim()) || [];
    return tags.filter(t => t.length > 0);
  } catch (error) {
    console.error("Gemini tagging failed:", error);
    return ['uncategorized'];
  }
};

export const semanticSearch = async (query: string, documents: Document[]) => {
  try {
    const docContext = documents.map(d => ({
      id: d.id,
      name: d.name,
      tags: d.tags.join(', '),
      category: d.category
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this user search query: "${query}", identify which of these documents are most relevant. 
      Documents: ${JSON.stringify(docContext)}
      
      Return a JSON array of document IDs in order of relevance.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const relevantIds = JSON.parse(response.text || '[]');
    return relevantIds;
  } catch (error) {
    console.error("Semantic search failed:", error);
    return [];
  }
};
