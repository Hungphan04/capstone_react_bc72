import axios from "axios";
import { API_URL, TokenCybersoft } from "../constants";

const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    TokenCybersoft: TokenCybersoft,
  },
});

// call API get use

// => nhấn vào 1 button
// => gọi api
// => kiểm tra có login hay không, nếu mà có thì add thêm token vào header, modify dữ liệu gửi lên server
// => chờ
// => server gửi về dữ liệu
// => trả về kết quả

fetcher.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (currentUser) {
    config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
  }

  return config;
});

// fetcher.interceptors.response.use((response) => {
//   return {response, statusMessage: "Như chó"}
// })

export default fetcher;
