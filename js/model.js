import { API, API_KEY } from "./config.js";

export const state = {
  searchedIp: "",
};

export const getResult = async function (searchIp) {
  try {
    if (state.searchedIp.ip === searchIp) return state.searchedIp;

    // If the parameter is not specified, then it defaults to client request's public IP address
    const res = await fetch(
      `${API}/country,city?apiKey=${API_KEY}&ipAddress=${searchIp}`
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
      fullLocation: getFullLocation({
        city: ip.location.city,
        region: ip.location.region,
        country: ip.location.country,
        postalcode: ip.location.postalcode,
      }),
      timezone: ip.location.timezone,
      lat: ip.location.lat,
      lng: ip.location.lng,
    };
    state.searchedIp = mappedIp;
    return mappedIp;
  } catch (err) {
    throw err;
  }
};

const getFullLocation = function (location) {
  const fullLocation = Object.values(location).filter(Boolean).join(", ");
  return fullLocation;
};

const getFullLocationv2 = function (location) {
  const values = Object.values(location).filter((val) => val);
  const fullLocation = values.length
    ? values
        .map((val, i, arr) => (i !== arr.length - 1 ? val + ", " : val))
        .reduce((cur, acc) => cur + acc)
    : null;
  return fullLocation;
};

const getFullLocationv1 = function (location) {
  const valuedProperties = Object.values(location).filter((val) => val);
  if (valuedProperties.length) {
    if (valuedProperties.length > 1) {
      const fullLocation = valuedProperties.map((val) => val + ", ");
      const fullLocationWithoutLast = fullLocation.splice(
        0,
        fullLocation.length - 1
      );
      const lastElement = fullLocation[fullLocation.length - 1]
        .trim()
        .slice(0, -1);
      const formattedValues = [...fullLocationWithoutLast, lastElement];
      const locationString = formattedValues.reduce((cur, acc) => cur + acc);
      return `${locationString}`;
    } else {
      return valuedProperties.find((val) => val);
    }
  } else {
    return null;
  }
};
