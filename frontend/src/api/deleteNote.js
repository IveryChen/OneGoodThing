export const deleteNote = async (noteId, token) => {
  const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
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
