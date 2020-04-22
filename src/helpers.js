export const widthOfString = (str) => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  let width;
  if (ctx) {
    ctx.font = "32px Rubik";
    width = ctx.measureText(str).width;
  }
  return width + 40;
};

export const capitalize = (str) => {
  let strArray = str.split("");
  strArray[0] = strArray[0].toUpperCase();
  return strArray.join("");
};

export const convertToFahrenheit = (celsius) => {
  return Math.floor(celsius * (9 / 5) + 32);
};
