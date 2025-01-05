export async function fetchNotes(props) {
  const { token } = props;
  const response = await fetch("http://localhost:3000/api/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}
