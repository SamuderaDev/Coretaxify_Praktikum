import { useCookies } from "react-cookie";

export const getCookie = () => {
  const [cookies, setCookie] = useCookies([]);
  return cookies;
};

export const getCookieToken = () => {
  const [cookies, setCookie] = useCookies([]);
  return cookies.token;
};
export const getCookieRole = () => {
  const [cookies, setCookie] = useCookies([]);
  return cookies.role;
};
