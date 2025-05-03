export const formatMoneyInput = (value: string | number) => {
  if (value === "" || value === null) return "";
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error("Input is not a valid number string");
  }
  return num.toLocaleString();
};
