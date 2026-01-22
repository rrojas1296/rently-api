import { JWT_SECRET } from 'src/config/environments';
import { IPayload } from '../types/payload.interface';
import jose from 'jose';

export const generateTokens = async (
  payload: IPayload,
): Promise<{
  access_token: string;
  refresh_token: string;
}> => {
  const { sub, email } = payload;
  const jwtSecret = new TextEncoder().encode(JWT_SECRET);
  const refreshSecret = new TextEncoder().encode(JWT_SECRET);
  const token = new jose.SignJWT({ sub, email });

  const access_token = await token
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(jwtSecret);

  const refresh_token = await token
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(refreshSecret);

  return { access_token, refresh_token };
};
