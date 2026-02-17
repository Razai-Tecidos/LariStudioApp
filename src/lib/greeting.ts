export function getGreetingByHour(hour: number) {
  if (hour < 12) {
    return "Bom dia";
  }

  if (hour < 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}

export function getGreetingForTimeZone(timeZone: string) {
  const hourText = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(new Date());

  const hour = Number.parseInt(hourText, 10);
  return getGreetingByHour(Number.isNaN(hour) ? 12 : hour);
}
