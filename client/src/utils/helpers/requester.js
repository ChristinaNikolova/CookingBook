import { baseURL } from "../constants/global";
import { global } from "../constants/errors";

export default async function requester(
  requestedURL,
  method,
  data,
  config = {},
  signal = null
) {
  const url = baseURL + requestedURL;

  let options = {
    method,
    headers: {},
  };

  if (signal) {
    options.signal = signal;
  }

  if (data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  if (config.authToken) {
    options.headers["X-Authorization"] = `Bearer ${config.authToken}`;
  }

  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return {};
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message[0].msg);
    }

    return result;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log(global.REQUEST_ABORTED);
    } else {
      console.error(err);
    }
    throw err;
  }
}
