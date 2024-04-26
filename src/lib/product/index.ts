export const fetchCarousel = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products?filter=hot");
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
    // throw new Error("Failed to fetch data");
  }
};

export const fetchAmbassador = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/ambassadors");
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchNew = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/products?filter=new&limit=5"
    );
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchBySlug = async (slug: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${slug}`);
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchSameCategory = async (category: string) => {
  
}