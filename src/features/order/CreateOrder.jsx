import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, address, status, position, error } = useSelector(
    (state) => state.user,
  );
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = status === "loading";

  if (!cart.length) return <EmptyCart />;

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 text-lg font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="post" action="/order/new">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {errors?.phone && (
              <p className="mt-2 rounded-lg bg-red-100 p-2 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {status === "error" && (
              <p className="mt-2 rounded-lg bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-1 z-10">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={handleGetPosition}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${position.latitude}, ${position.longitude}`}
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order"
              : `Order for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const formErrors = {};
  if (!isValidPhone(order.phone))
    formErrors.phone = "please enter a valid phone number";
  if (Object.keys(formErrors).length > 0) return formErrors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
