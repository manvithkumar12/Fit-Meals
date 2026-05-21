import { resRecognition } from "@/src/types/recognition/recognition.types";

export const RecognizeApi = async (file: File): Promise<resRecognition> => {
  const url = process.env.NEXT_PUBLIC_MODEL_URL;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${url}/recognize`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to recognize food");
    }

    return (await response.json()) as resRecognition;
  } catch (e) {
    console.error("Recognition API Error:", e);
    throw e;
  }
};
