import { keyBy } from "lodash";

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

  return keyBy(data, "_id");
}
