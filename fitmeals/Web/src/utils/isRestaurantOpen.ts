export const isRestaurantOpen = (openingTime: string, closingTime: string) => {
  const now = new Date();

  const [ch, cm] = now.toTimeString().slice(0, 5).split(":").map(Number);
  const current = ch * 60 + cm;

  const [oh, om] = openingTime.split(":").map(Number);
  const [hh, hm] = closingTime.split(":").map(Number);

  const open = oh * 60 + om;
  const close = hh * 60 + hm;

  // normal same‑day schedule
  if (open <= close) {
    return current >= open && current <= close;
  }

  // overnight schedule (e.g., 23:00 → 00:50)
  return current >= open || current <= close;
};
