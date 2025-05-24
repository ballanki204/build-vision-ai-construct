
// OpenAI API configuration
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result;
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

// Process blueprint using OpenAI API
export const processBlueprint = async (file: File, apiKey: string) => {
  if (!apiKey) {
    throw new Error("API Key Required");
  }
  
  try {
    // Convert the image to base64
    const base64Image = await fileToBase64(file);
    
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an architectural expert that can analyze blueprints and extract key dimensions and features. Analyze the blueprint image and provide dimensions and features in JSON format with the following structure: { width: number, length: number, height: number, roofType: string }"
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this blueprint and extract the dimensions and features. Return only valid JSON with width, length, height, and roofType."
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the response content
    const assistantMessage = data.choices[0].message.content;
    
    // Parse the JSON response
    const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : assistantMessage;
    return JSON.parse(jsonString);
    
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
