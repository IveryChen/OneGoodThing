import { format } from "date-fns";

export default function formatDateString(date) {
  return format(new Date(date), "yyyy-MM-dd");
}
