import config from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;

    // Avoid infinite loop if refresh token endpoint itself fails
    if (
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
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

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken);
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
