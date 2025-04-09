export const getCurrentDate = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Місяці від 0 до 11, тому додаємо 1
  return `${month}-${day}`;
}
