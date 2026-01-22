import jose from 'jose';

export const verifyToken = (token: string, secret: Uint8Array<ArrayBuffer>) => {
  return jose.jwtVerify(token, secret);
};
