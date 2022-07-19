import { IProducts } from "../models/products";
export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(number / 100)

};

export const getUniqueValues = (data: IProducts[], type: "category" | "company" | "colors"): string[] => {
  let unique = data.map((item) => item[type]) as string[]

  if (type === "colors") {
    unique = unique.flat()
  }

  return ["all", ...new Set(unique)]
};
