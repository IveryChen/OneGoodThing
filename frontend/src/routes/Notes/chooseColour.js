import { stickies } from "../../constants/constants";

export default function chooseColor(date) {
  const month = new Date(date || new Date()).getMonth();
  const colors = Object.values(stickies);

  return colors[month % colors.length];
}
