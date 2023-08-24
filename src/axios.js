import { Axios } from "axios";

const axios = Axios.create({ // インスタンス化
  baseURL: "http://localhost:8000/api", // 全てのAPIエンドポイントのベースURL
  withCredentials: true, // リクエストとともにクッキーが送信され、認証されたリクエストが可能になる
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default axios;
