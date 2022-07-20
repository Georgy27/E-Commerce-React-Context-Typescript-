export interface IProducts {
  id: string;
  name: string;
  price: number;
  image: string;
  featured: boolean;
  category: string;
  colors: string[];
  company: string;
  description: string;
  shipping: boolean;
}

export interface IImages {
  url: string
  filename: string
}
export interface ISingleProduct {
  name: string;
  price: number;
  description: string;
  stock: number;
  stars: number;
  reviews: number;
  id: string;
  company: string;
  images: IImages[];
  colors: string[]
}

export interface IProductsState {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: IProducts[];
  featured_products: IProducts[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: ISingleProduct;
}




