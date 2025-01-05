export default async function submitNote(text, token) {
  try {
    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to create note: ", error);
  }
}
