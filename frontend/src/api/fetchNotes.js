import { each, keyBy } from "lodash";

import { API_URL } from "../constants/config";

export async function fetchNotes(props) {
  const { token } = props;
  const response = await fetch(`${API_URL}/api/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await response.json();
  const dateMap = {};

  each(data, (note) => {
    const date = new Date(note.createdAt).toDateString();
    dateMap[date] = note._id;
  });

  return { dateMap, notes: keyBy(data, "_id") };
}
