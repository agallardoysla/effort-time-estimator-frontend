/**
 * OpenAI API client configuration and utilities
 */
import { useToast } from "@/components/ui/use-toast";

// Get the API key from environment variables
export const getOpenAIApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "API key not found. Please set the VITE_OPENAI_API_KEY environment variable."
    );
  }

  // Remove any leading/trailing whitespace that might have been added
  return apiKey.trim();
};

// Create headers for OpenAI API requests
export const createOpenAIHeaders = (apiKey: string): HeadersInit => {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
};

// Helper function to handle API errors consistently
export const handleAPIError = (response: Response, errorData: any): never => {
  console.error("OpenAI API Error:", errorData);

  // Check for specific error types
  if (
    errorData?.error?.type === "invalid_request_error" &&
    errorData?.error?.code === "invalid_api_key"
  ) {
    throw new Error(
      "Clave de API de OpenAI inválida. Por favor verifique la configuración."
    );
  }

  throw new Error(
    `Error en la API de OpenAI: ${response.statusText || "Unknown error"}`
  );
};

// Helper function to validate API response structure
export const validateResponseStructure = (data: any): void => {
  if (
    !data.choices ||
    !data.choices[0] ||
    !data.choices[0].message ||
    !data.choices[0].message.content
  ) {
    throw new Error("Respuesta inesperada de la API de OpenAI.");
  }
};
