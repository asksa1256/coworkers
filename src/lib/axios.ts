import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // vite는 process 대신 import.meta 사용
  timeout: 10000, // 서버 응답 최대 대기 시간 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
