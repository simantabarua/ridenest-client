/* eslint-disable @typescript-eslint/no-explicit-any */
interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface RouteResult {
  distance: string;
  time: string;
  geometry?: any;
}


export const calculateRouteDistance = async (
  from: Location,
  to: Location
): Promise<RouteResult> => {
  const coords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Routing failed with status ${res.status}`);
  const json = await res.json();
  if (!json.routes?.length)
    throw new Error("No route found between these locations");
  const route = json.routes[0];
  const km = (route.distance / 1000).toFixed(2);
  const mins = Math.round(route.duration / 60);
  console.log({ from: from.name, to: to.name, distance: `${km} km` });
  return {
    distance: `${km} km`,
    time: `${mins} min`,
    geometry: route.geometry,
  };
};

export const nominatimSearch = async (q: string): Promise<any[]> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=BD&q=${encodeURIComponent(
    q
  )}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Nominatim search failed");
  return res.json();
};

export const nominatimReverse = async (
  lat: number,
  lon: number
): Promise<any> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Reverse failed");
  return res.json();
};
