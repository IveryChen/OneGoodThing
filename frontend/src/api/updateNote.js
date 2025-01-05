import { API_URL } from "../constants/config";

export default async function updateNote(noteId, text, token) {
  const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
}
