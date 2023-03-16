export abstract class BaseError extends Error {
  abstract _statusCode: number;
  abstract serializerError(): {
    status: string;
    data: { reason: string; field?: string }[];
  };
}
