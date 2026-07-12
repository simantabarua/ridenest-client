import config from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Silent token refresh state
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Handle 401s with silent token refresh — no redirects, no hacks
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Never retry auth endpoints
    if (
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      // No refresh token — reject immediately, let components handle it
      if (!refreshToken) {
        return Promise.reject(error);
      }

      // Queue concurrent requests while a refresh is in flight
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${config.baseUrl}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        if (res.data?.success && res.data?.data?.accessToken) {
          const newAccessToken = res.data.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          if (res.data.data.refreshToken) {
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
          }

          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] =
            `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest);
        }

        // Server responded OK but no token — treat as failure
        processQueue(error, null);
        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
