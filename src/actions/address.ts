"use server";
export const fetchCities = async () => {
  try {
    const res = await fetch(
      "https://vietnam-administrative-division-json-server-swart.vercel.app/province"
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    console.log(e);
  }
};
export const fetchDistricts = async () => {
  try {
    const res = await fetch(
      "https://vietnam-administrative-division-json-server-swart.vercel.app/district"
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const fetchWards = async () => {
  try {
    const res = await fetch(
      "https://vietnam-administrative-division-json-server-swart.vercel.app/commune"
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    console.log(e);
  }
};
