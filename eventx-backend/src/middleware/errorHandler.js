import { StatusCodes } from 'http-status-codes';

export const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ message: err.message || 'Server error' });
};
