import { API_URL } from "../constants/config";

export const deleteNote = async (noteId, token) => {
  const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  return response.json();
};
