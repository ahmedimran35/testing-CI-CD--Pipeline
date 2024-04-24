export function calculateNumberOfPages(totalItems = 0, itemsPerPage = 0) {
  const res = Math.ceil(totalItems / itemsPerPage);
  if (Number.isInteger(res))
    return res;
  return 0;
}
