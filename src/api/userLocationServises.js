import { sendRequest } from "./index";

const baseUrl = "https://ipinfo.io";
const apiKey = "232501c373316c";

export const getUserCity = () => {
  const pathName = `?token=${apiKey}`;

  return sendRequest({ baseUrl, path: pathName });
};
