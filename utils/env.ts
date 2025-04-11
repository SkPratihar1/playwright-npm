import dotenv from 'dotenv';
dotenv.config();

const testData = {
  BASE_URL: process.env.BASE_URL || 'https://admin.eroev.com',
  EMAIL: process.env.ADMIN_EMAIL || 'admin@eroev.com',
  PASSWORD: process.env.ADMIN_PASSWORD || 'Itobuz#1234',
};

export default testData;