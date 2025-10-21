import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fe-project-cowokers.vercel.app/16-16',
  timeout: 10000, // 서버 응답 최대 대기 시간 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
