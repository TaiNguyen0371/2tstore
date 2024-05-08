"use client";
import { getCart, removeFromCart } from "@/actions/auth";
import { getProductInOrder, toggleProductInOrder } from "@/actions/order";
import CustomCheckbox from "@/components/CustomCheckbox";
import CustomIcon from "@/components/CustomIcon";
import CartProductListSkeleton from "@/components/Skeletons/CartProductListSkeletom";
import { ICartItem, IProduct } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProductList {
  className?: string;
}
const ProductList = ({ className }: IProductList) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [orders, setOrders] = useState<ICartItem[]>([]);
  console.log(orders);

  useEffect(() => {
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

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await getCart();
      const orderData = await getProductInOrder();
      setCartItems(cartData?.data?.items || []);
      setOrders(orderData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const tableHead = [
    "Product",
    "Price",
    "Discount",
    "Quantity",
    "Total",
    "Action",
  ];
  const handleChangeCheckbox = async (item: ICartItem) => {
    const orderData = {
      product: {
        _id: item.product._id,
        price: item.product.price,
        discount: item.product.discount,
      },
      size: item.size,
      quantity: item.quantity,
    };
    await toggleProductInOrder(orderData);
    window.dispatchEvent(new Event("update-orders"));
  };

  const handleRemoveProduct = async (item: ICartItem) => {
    if (
      window.confirm("Are you sure you want to remove this product from cart?")
    ) {
      const data = await removeFromCart(item.product._id);
      if (data.message === "success") {
        toast.success("Remove product successfully");
        setCartItems((prev) =>
          prev.filter((i) => i.product._id !== item.product._id)
        );
        const orderData = {
          product: {
            _id: item.product._id,
            price: item.product.price,
            discount: item.product.discount,
          },
          size: item.size,
          quantity: item.quantity,
        };
        await toggleProductInOrder(orderData);
        window.dispatchEvent(new Event("update-orders"));
      } else {
        toast.error("Remove product failed");
      }
    }
  };

  return (
    <div className={`${className} `}>
      {loading ? (
        <CartProductListSkeleton />
      ) : (
        <>
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <span>
            <b className="text-cs_primary_yellow font-bold">
              {cartItems.length > 0 ? `${cartItems.length} items` : "0 item"}{" "}
            </b>
            in your cart
          </span>
          <div className="mt-8 bg-cs_secondary_black rounded-xl text-right">
            {cartItems.length <= 0 && (
              <div className="h-[300px] grid place-items-center">
                <h1>No item</h1>
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="bg-cs_secondary_black p-8 rounded-xl text-lg font-bold">
                <div>
                  <div className="flex justify-between mb-8">
                    {tableHead.map((head, index) => (
                      <span
                        key={index}
                        className={
                          index === 0
                            ? "w-1/3 text-left"
                            : "w-[calc(100%/3*2/5)]"
                        }
                      >
                        {head}
                      </span>
                    ))}
                  </div>
                  <div>
                    {cartItems?.map(
                      (item: {
                        product: IProduct;
                        size: string;
                        quantity: number;
                      }) => (
                        <div
                          key={item.product._id}
                          className="flex justify-between font-semibold my-4"
                        >
                          <div className="w-1/3 flex gap-2 text-left">
                            <div className="bg-cs_tertiary_black w-[125px] h-[150px] rounded-xl grid place-items-center">
                              <Image
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                width={100}
                                height={100}
                                className="w-full"
                              />
                            </div>
                            <div className="w-[calc(100%-125px-8px)]">
                              <span className="text-xs font-thin">
                                {item.product.category.name}
                              </span>
                              <h1>{item.product.name}</h1>
                              <span className="text-xs font-thin">
                                Size : {item.size}
                              </span>
                            </div>
                          </div>
                          <span className="w-[calc(100%/3*2/5)]">
                            {item.product.price}
                          </span>
                          <span className="w-[calc(100%/3*2/5)]">
                            {item.product.discount ? (
                              <span>
                                {item.product.discount.endDate < new Date() ? (
                                  <span>$0</span>
                                ) : (
                                  <span>
                                    {item.product.discount.type === "percentage"
                                      ? `$${
                                          (Number(item.product.discount.value) *
                                            item.product.price) /
                                          100
                                        }`
                                      : `$${item.product.discount.value}`}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span>$0</span>
                            )}
                          </span>
                          <span className="w-[calc(100%/3*2/5)]">
                            {item.quantity}
                          </span>
                          <span className="w-[calc(100%/3*2/5)]">
                            {item.product.discount ? (
                              <span>
                                {item.product.discount.type === "percentage" ? (
                                  <span>
                                    $
                                    {(item.product.price *
                                      item.quantity *
                                      (100 -
                                        Number(item.product.discount.value))) /
                                      100}
                                  </span>
                                ) : (
                                  <span>
                                    $
                                    {(item.product.price -
                                      Number(item.product.discount.value)) *
                                      item.quantity}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span>${item.product.price * item.quantity}</span>
                            )}
                          </span>
                          <span className="w-[calc(100%/3*2/5)]">
                            <div className="flex items-center justify-end gap-4">
                              <CustomCheckbox
                                onChange={() => handleChangeCheckbox(item)}
                                checked={
                                  orders.find(
                                    (i) => i.product._id === item.product._id
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <CustomIcon
                                onClick={() => handleRemoveProduct(item)}
                                tooltip="delete"
                                icon={"material-symbols:delete-outline"}
                                size={"20px"}
                              />
                            </div>
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
