import { API_URL } from "../constants/config";

export default async function submitNote(text, color, token) {
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, color }),
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to create note: ", error);
  }
}
