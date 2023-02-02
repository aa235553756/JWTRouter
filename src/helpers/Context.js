import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => { return useContext(AuthContext) }

export const a = () => {
  return console.log(1);
}
// 下面不能這樣做的原因,是狀態為同樣的必須存在於元件內,我把這個到處都可以用,代表每個元件狀態都不是同一個狀態
// 又或者說,你只是在不同元件,一直重新宣告狀態而已
export const useToken = () => { const [token, setToken] = useState(8888); }