export const isRestaurantOpen = (
  openingTime: string,
  closingTime: string
) => {
  const germanyTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  const [ch, cm] = germanyTime.split(":").map(Number);
  const current = ch * 60 + cm;

  const [oh, om] = openingTime.split(":").map(Number);
  const [hh, hm] = closingTime.split(":").map(Number);

  const open = oh * 60 + om;
  const close = hh * 60 + hm;

  if (open <= close) {
    return current >= open && current <= close;
  }

  return current >= open || current <= close;
};
