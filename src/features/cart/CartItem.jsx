import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-2.5 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1.5 sm:mb-0">
        <span className="font-bold">{quantity}&times;</span> {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
