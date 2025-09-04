export const paginate = (page = 1, limit = 10) => {
  page = Number(page) || 1;
  limit = Math.min(Number(limit) || 10, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
