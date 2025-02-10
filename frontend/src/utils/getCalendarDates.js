export default function getCalendarDates(year) {
  const allMonths = [];

  for (let month = 0; month < 12; month++) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();

    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      calendarDays.push(date);
    }

    const weeks = [];
    let currentWeek = [];

    calendarDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    allMonths.push({
      index: month,
      month: new Date(year, month, 1).toLocaleString("default", {
        month: "long",
      }),
      weeks,
    });
  }

  return allMonths;
}
