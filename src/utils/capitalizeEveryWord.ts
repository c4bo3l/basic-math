import capitalize from "./capitalize";

const capitalizeEveryWord = (str?: string) => {
  if (!str) {
    return undefined;
  }
  return str
    .split(" ")
    .map((x) => capitalize(x))
    .join(" ");
};

export default capitalizeEveryWord;
