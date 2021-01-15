import { Request, Response, NextFunction } from 'express';

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  const token = 'Bearer aquiSeriaUmTokenJWT';

  if (!authHeader) {
    throw new Error('Token is missing');
  }

  if (authHeader !== token) {
    throw new Error('Invalid Token');
  }

  return next();
}
