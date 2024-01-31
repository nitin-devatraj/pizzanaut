import { Link } from "react-router-dom";

export default function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-stone-700 px-4 py-4 text-stone-100 sm:px-4">
      <p className="space-x-4 text-sm font-semibold uppercase text-stone-200 sm:space-x-6 md:text-base">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
