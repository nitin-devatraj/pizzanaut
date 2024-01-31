import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-2.5 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1.5 sm:mb-0">
        <span className="font-bold">{quantity}&times;</span> {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
