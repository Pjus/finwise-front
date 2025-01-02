import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Django API 서버 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios 요청 인터셉터를 사용하여 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // localStorage에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
