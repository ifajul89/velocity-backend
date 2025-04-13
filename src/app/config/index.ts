import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// // Debug environment variables
// console.log('Environment variables loaded:');
// console.log('SP_ENDPOINT:', process.env.SP_ENDPOINT);
// console.log('SP_USERNAME:', process.env.SP_USERNAME);
// console.log('SP_PASSWORD:', process.env.SP_PASSWORD ? '[REDACTED]' : 'undefined');
// console.log('SP_PREFIX:', process.env.SP_PREFIX);
// console.log('SP_RETURN_URL:', process.env.SP_RETURN_URL);

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENVIRONMENT,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  SP: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
