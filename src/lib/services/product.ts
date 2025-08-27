export async function  getProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", { cache: "no-store" });
  if (!res.ok) {
    return ({error: res.statusText});
  }
  const { data } = await res.json();
  console.log(data);
  return data;

}