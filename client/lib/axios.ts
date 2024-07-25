import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://banking.com/api/v1',
  // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
