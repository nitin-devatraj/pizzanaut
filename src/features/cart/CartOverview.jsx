import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

export default function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);

  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-700 px-4 py-4 text-stone-100 sm:px-4">
      <p className="space-x-4 text-sm font-semibold uppercase text-stone-200 sm:space-x-6 md:text-base">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
