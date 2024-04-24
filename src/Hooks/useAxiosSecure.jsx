import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
// import { getCookie } from "../utils/GetRefreshTooken";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_axiosSecure,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // axiosSecure.interceptors.request.use(function (config) {
    //   const accessToken = getCookie("refreshToken");

    //   if (accessToken) {
    //     config.headers.Authorization = accessToken;
    //   }
    //   return config;
    // });
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          logOut()
            .then(() => {
              let timerInterval;
              Swal.fire({
                title: "Something Went Wrong!",
                color: "#ff0000",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            })
            .catch(() => {
              let timerInterval;
              Swal.fire({
                title: "Something Went Wrong!",
                color: "#ff0000",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            });
        }
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
