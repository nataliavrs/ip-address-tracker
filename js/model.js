import { API, API_KEY } from "./config.js";

const state = {
  result: "",
};

export const getResult = async function () {
  // Call IP address tracker API
  try {
    const res = await fetch(
      `${API}/country?apiKey=${API_KEY}&ipAddress=8.8.8.8`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }

    const result = {
      ip: data.ip,
      isp: data.isp,
      location: {
        region: data.location.region,
        country: data.location.country,
        timezone: data.location.timezone,
      },
    };
    state.result = result;
  } catch (err) {
    alert(err);
  }
};
