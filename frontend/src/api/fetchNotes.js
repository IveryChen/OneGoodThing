import { each, keyBy } from "lodash";

import { API_URL } from "../constants/config";
import formatDateString from "../utils/formatDateString";

export async function fetchNotes(props) {
  const { token } = props;
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      window.location.href = "/";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const data = await response.json();
    const dateMap = {};

    each(data, (note) => {
      const date = formatDateString(note.createdAt);
      dateMap[date] = [...(dateMap[date] || []), note._id];
    });

    return { dateMap, notes: keyBy(data, "_id") };
  } catch (error) {
    console.error("Fetch error:", error);
    // If we get here and it's an auth error, redirect
    if (error.message.includes("401")) {
      window.location.href = "/";
      return;
    }
    throw error;
  }
}
