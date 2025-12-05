import { baseURL } from "../constants/global";

export const image = {
  getImageUrl: (path) => {
    return `${baseURL}${path}`;
  },
};
