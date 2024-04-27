export const fetchCarousel = async () => {
  try {
    const res = await fetch(process.env.URL + "/api/products?filter=hot");
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
    // throw new Error("Failed to fetch data");
  }
};

export const fetchAmbassador = async () => {
  try {
    const res = await fetch(process.env.URL + "/api/ambassadors");
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchNew = async () => {
  try {
    const res = await fetch(
      process.env.URL + "/api/products?filter=new&limit=5"
    );
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchBySlug = async (slug: string) => {
  try {
    console.log(process.env.URL + `/api/products/${slug}`);

    const res = await fetch(process.env.URL + `/api/products/${slug}`);
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchSameCategory = async (category: string) => {};
