/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axios from "axios";

// コンテクストは各階層で手動でプロパティを下に渡すことなく、コンポーネントツリー内でデータを渡す方法を提供する
const AuthContent = createContext({
  user: null, // ユーザーオブジェクトをnullに設定したデフォルト値
  setUser: () => {}, // ユーザーオブジェクトを新しい値で更新する
  csrfToken: () => {}, // ゲストメソッド用のCSRFトークンを生成する
});

export const AuthProvider = ({ children }) => {
  // ユーザーの状態をuseStateを使用して初期化
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null // 値をローカルストレージから取得
  );

  const setUser = (user) => {
    if (user) {
      // ユーザー状態を更新し、ユーザーオブジェクトをローカルストレージに設定
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    _setUser(user);
  };

  // guestメソッドのcsrfトークン設定
  const csrfToken = async () => {
    await axios.get("http://localhost:8000/sunctum/csrf-cookie"); // CSRF トークンを生成
    return true;
  };

  // user, setUser, csrfTokenの値と、認証状態にアクセスする必要がある子コンポーネントとなるchildren propを含むオブジェクトに設定された値propを持つAuthContent.Providerコンポーネントを返す
  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken }}>
      {children}
    </AuthContent.Provider>
  );
};

export const useAuth = () => {
  // AuthContentコンテキストを取得し、user, setUser, csrfTokenの値を含むvalueオブジェクトを返す
  // 子コンポーネントでこのフックを使うと、認証状態にアクセスしてユーザの認証状態に応じたアクションを実行することができる
  return useContext(AuthContent);
}
