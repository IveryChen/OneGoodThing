import { format } from "date-fns";

export default function formatDate(dateObject) {
  return format(dateObject, "MM/dd/yyyy");
}
