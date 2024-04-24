const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  let newText = text
    .split("-")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
  // console.log(newText)
  const lastIndex = text.length - 1;
  if (newText[lastIndex] !== "s") newText += "s";
  return newText;
};

export default capitalizeFirstLetter;
