const baseURL = "http://localhost:3030";

export default async function requester(
  requestedURL,
  method,
  data,
  config = {}
) {
  const url = baseURL + requestedURL;

  let options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (config.authToken) {
    options.headers["X-Authorization"] = `Bearer ${config.authToken}`;
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message[0].msg);
    }

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
