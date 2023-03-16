import { Response } from 'express';

export const sendResponse = (
  response: Response,
  data: any,
  code: number,
  message?: string
) => {
  return response.status(code).send({
    data,
    message: message || '',
  });
};
