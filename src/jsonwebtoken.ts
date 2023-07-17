import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export function generateToken(payload: any): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
