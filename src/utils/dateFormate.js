const getReadableDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default getReadableDate;
