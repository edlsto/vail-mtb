export const widthOfString = (str) => {
  if (str === "today") {
    return 125;
  } else if (str === "tomorrow") {
    return 190;
  } else if (str === "vail") {
    return 85;
  } else if (str === "eagle") {
    return 120;
  } else if (str === "Wednesday") {
    return 210;
  } else {
    return str.length * 21 + 10;
  }
};

export const capitalize = (str) => {
  let strArray = str.split("");
  strArray[0] = strArray[0].toUpperCase();
  return strArray.join("");
};

export const convertToFahrenheit = (celsius) => {
  return Math.floor(celsius * (9 / 5) + 32);
};
