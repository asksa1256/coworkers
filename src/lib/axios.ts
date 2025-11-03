import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // vite는 process 대신 import.meta 사용
  timeout: 10000, // 서버 응답 최대 대기 시간 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// accessToken 만료 시 refreshToken으로 자동 갱신
let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

// 401이 여러 번 동시에 들어와도 refresh 요청은 한 번만 보내고, 나머지는 새 토큰으로 순차 재시도
const processQueue = (newToken: string | null) => {
  pendingRequests.forEach(cb => {
    if (newToken) cb(newToken);
  });
  pendingRequests = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 권한 에러가 발생했고, 토큰 갱신 중이 아닐 때: 리프레시 토큰으로 액세스 토큰 갱신
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // 리프레시 토큰 없음 → 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        toast.error('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/auth/signin';
        return Promise.reject(error);
      }

      // 토큰 갱신 중: 큐에 요청 넣고 새 토큰으로 재시도
      if (isRefreshing) {
        return new Promise(resolve => {
          pendingRequests.push((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 대기 중이던 요청들 재시도
        processQueue(newAccessToken);

        // 실패 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        toast.error('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/auth/signin';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
