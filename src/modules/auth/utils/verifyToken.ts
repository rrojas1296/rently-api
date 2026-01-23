import jose from 'jose';
import { JWT_SECRET, REFRESH_SECRET } from 'src/config/environments';

export const verifyToken = (
  token: string,
  type: 'accessToken' | 'refreshToken',
) => {
  const secret = new TextEncoder().encode(
    type === 'accessToken' ? JWT_SECRET : REFRESH_SECRET,
  );
  return jose.jwtVerify(token, secret);
};
