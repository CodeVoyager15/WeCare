import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  console.log(token)
  return jwtDecode(token);
};
