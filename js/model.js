import { API, API_KEY } from "./config.js";

export const state = {
  ip: "",
};

export const getResult = async function (searchIp) {
  try {
    // if (!searchIp) throw new Error("No IP provided.");

    // If the parameter is not specified, then it defaults to client request's public IP address.
    const res = await fetch(
      `${API}/country?apiKey=${API_KEY}&ipAddress=${searchIp}`
    );

    if (!res.ok) {
      if (res.status === 422) {
        const errorData = await res.json();
        throw new Error(errorData.messages);
      } else {
        throw new Error(`${res.statusText} ${res.status}`);
      }
    }

    const ip = await res.json();
    const mappedIp = {
      ip: ip.ip,
      isp: ip.isp,
      location: {
        region: ip.location.region,
        country: ip.location.country,
        timezone: ip.location.timezone,
      },
    };
    return mappedIp;
  } catch (err) {
    throw err;
  }
};
