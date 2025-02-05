export default function getDaysInYear() {
  const year = new Date().getFullYear();
  const days = [];
  const startDate = new Date(year, 0, 1);

  while (startDate.getFullYear() === year) {
    days.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return days;
}
