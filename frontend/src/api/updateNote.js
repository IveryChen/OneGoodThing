export default async function updateNote(noteId, text, token) {
  const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
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
