import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface SessionPayload {
  userId: number;
  email: string;
}

export const createSession = (payload: SessionPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
  });
};

export const verifySession = (token: string): SessionPayload => {
  return jwt.verify(token, JWT_SECRET) as SessionPayload;
};
