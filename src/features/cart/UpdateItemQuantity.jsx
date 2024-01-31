import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrementItemQuantity, incrementItemQuantity } from "./cartSlice";

export default function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(incrementItemQuantity(pizzaId));
  }

  function handleDecrement() {
    dispatch(decrementItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="small" onClick={handleDecrement}>
        -
      </Button>
      <span>{quantity}</span>
      <Button type="small" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}
