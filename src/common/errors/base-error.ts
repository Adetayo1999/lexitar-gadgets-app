export abstract class BaseError extends Error {
  abstract _statusCode: number;
  abstract serializerError(): {
    error: string;
    data: { reason: string; field?: string }[];
  };
}
