import { API_URL } from "../constants/config";

export default async function submitNote(text, color, token, date) {
  const formattedDate = `${date}T12:00:00.000Z`;

  const body = {
    text,
    color,
    createdAt: formattedDate,
  };

  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to create note: ", error);
  }
}
