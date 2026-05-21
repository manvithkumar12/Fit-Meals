export const generateSlots = (open: string, close: string) => {
  const slots: string[] = [];
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  let current = new Date();
  current.setHours(openH, openM, 0, 0);
  const end = new Date();
  end.setHours(closeH, closeM, 0, 0);

  // If closing time is earlier in the day than opening time, it means it closes the next day.
  if (end <= current) {
    end.setDate(end.getDate() + 1);
  }

  while (current < end) {
    const hours = String(current.getHours()).padStart(2, "0");
    const minutes = String(current.getMinutes()).padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
    current = new Date(current.getTime() + 30 * 60000);
  }
  return slots;
};
