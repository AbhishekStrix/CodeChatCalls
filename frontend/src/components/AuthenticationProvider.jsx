import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axiosInstance from "../lib/axios";

const AuthenticationProvider = ({ children }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptorId = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptorId);
    };
  }, [getToken]);

  return <>{children}</>;
};

export default AuthenticationProvider;
