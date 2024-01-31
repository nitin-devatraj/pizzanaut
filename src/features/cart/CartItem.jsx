import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-2.5 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1.5 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type="small">delete</Button>
      </div>
    </li>
  );
}
