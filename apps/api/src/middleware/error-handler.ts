import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Request failed...', err);

  res.status(500).json({
    error: 'Internal server error',
  });
};

export { errorHandler };
