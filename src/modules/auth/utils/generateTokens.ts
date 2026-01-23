import { JWT_SECRET, REFRESH_SECRET } from 'src/config/environments';
import { IPayload } from '../types/payload.interface';
import jose from 'jose';

export const generateTokens = async (
  payload: IPayload,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { sub, email } = payload;
  const jwtSecret = new TextEncoder().encode(JWT_SECRET);
  const refreshSecret = new TextEncoder().encode(REFRESH_SECRET);
  const token = new jose.SignJWT({ sub, email });

  const accessToken = await token
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(jwtSecret);

  const refreshToken = await token
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(refreshSecret);

  return { accessToken, refreshToken };
};
