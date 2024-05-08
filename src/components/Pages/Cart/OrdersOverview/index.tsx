"use client";
import { getProductInOrder } from "@/actions/order";
import Button from "@/components/Button";
import OrdersOverviewSkeleton from "@/components/Skeletons/OrdersOverviewSkeleton";
import { ICartItem, IProduct } from "@/types";
import { useEffect, useState } from "react";

interface IOrdersOverviewProps {
  className?: string;
}
const OrdersOverview = ({ className }: IOrdersOverviewProps) => {
  const [orders, setOrders] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductInOrder();
      setOrders(data);
      setLoading(false);
    };
    fetchData();
    window.addEventListener("update-orders", async () => {
      const data = await getProductInOrder();
      setOrders(data);
    });
    return () => {
      window.removeEventListener("update-orders", async () => {
        const data = await getProductInOrder();
        setOrders(data);
      });
    };
  }, []);

  const calculateDiscount = (
    a: any,
    b: {
      product: IProduct;
      size: string;
      quantity: number;
    }
  ): number => {
    if (!b.product.discount) return a;
    if (b.product.discount.type === "value") {
      return a + Number(b.product.discount.value);
    }
    return (
      a +
      (b.product.price * b.quantity * Number(b.product.discount.value)) / 100
    );
  };

  return (
    <>
      {loading ? (
        <OrdersOverviewSkeleton
          className={`${className} mt-8 p-4 bg-cs_tertiary_black rounded-xl`}
        />
      ) : (
        <div
          className={`${className} mt-8 p-4 bg-cs_tertiary_black rounded-xl`}
        >
          <h1 className="text-lg font-semibold mb-4">Cart Total</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Total quantity</span>
              <span>{orders.reduce((a, b) => a + b.quantity, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                ${orders.reduce((a, b) => a + b.product.price * b.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>
                ${orders.reduce((a, b) => calculateDiscount(a, b), 0)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Cart Total</span>
              <span>
                $
                {orders.reduce(
                  (a, b) =>
                    a - orders.reduce((a, b) => calculateDiscount(a, b), 0),
                  orders.reduce((a, b) => a + b.product.price * b.quantity, 0)
                )}
              </span>
            </div>
          </div>
          <div className="mt-4 grid place-items-center">
            <Button className="!h-8 !text-lg !w-2/3 !bg-white !text-black">
              Check out
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersOverview;
