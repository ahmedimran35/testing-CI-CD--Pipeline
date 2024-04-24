import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_axiosPublic,
  //   withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
