export interface ICartValues {
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  max: number
}

export interface ICartState {
  cart: ICartValues[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
}