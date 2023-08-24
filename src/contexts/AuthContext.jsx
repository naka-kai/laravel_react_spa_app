/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContent = createContext({
  user: null,
  setUser: () => { },
  csrfToken: () => { },
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // ユーザーをローカルストレージへセットする
  const setUser = (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    _setUser(user);
  };

  // guestメソッドのcsrfトークン設定
  const csrfToken = async () => {
    await axios.get('http://localhost:8000/sunctum/csrf-cookie');
    return true;
  };

  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken }}>
      {children}
    </AuthContent.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContent);
}
