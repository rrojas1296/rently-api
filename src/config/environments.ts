export const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';
export const IS_DEV = (process.env.NODE_ENV || 'development') === 'development';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

if (IS_DEV)
  console.log({
    JWT_SECRET,
    REFRESH_SECRET,
    IS_DEV,
    CLIENT_URL,
  });
