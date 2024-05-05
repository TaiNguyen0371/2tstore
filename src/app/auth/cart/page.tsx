import { getCart, getProfile } from "@/actions/auth";
import Button from "@/components/Button";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Cart = async () => {
  const userCart = await getCart();
  const userInfo = await getProfile();
  const tableHead = [
    "Product",
    "Price",
    "Discount",
    "Quantity",
    "Total",
    "Action",
  ];
  return (
    <main className="w-[calc(100%-160px)] mt-40 mb-20 mx-auto flex gap-12 justify-between">
      <div className="w-[calc(100%/4*3-24px)]">
        <h1 className="text-4xl font-bold">Your Cart</h1>
        <span>
          <b className="text-cs_primary_yellow font-bold">
            {userCart?.data?.items?.lengspan > 0
              ? `${userCart?.data?.items?.lengspan} items`
              : "0 item"}{" "}
          </b>
          in your cart
        </span>
        <div className="mt-8 bg-cs_secondary_black rounded-xl text-right">
          {!userCart?.data && (
            <div className="h-[300px] grid place-items-center">
              <h1>No item</h1>
            </div>
          )}
          {userCart?.data && (
            <div className="bg-cs_secondary_black p-8 rounded-xl text-lg font-bold">
              <div>
                <div className="flex justify-between mb-8">
                  {tableHead.map((head, index) => (
                    <span
                      key={index}
                      className={
                        index === 0 ? "w-1/3 text-left" : "w-[calc(100%/3*2/5)]"
                      }
                    >
                      {head}
                    </span>
                  ))}
                </div>
                <div>
                  {userCart?.data?.items?.map(
                    (item: {
                      product: IProduct;
                      size: string;
                      quantity: number;
                    }) => (
                      <div
                        key={item.product._id}
                        className="flex justify-between font-semibold"
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
                                <span>0</span>
                              ) : (
                                <span>
                                  {item.product.discount.type === "percentage"
                                    ? `${item.product.discount.value}%`
                                    : `$${item.product.discount.value}`}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span>0</span>
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
                        <span className="w-[calc(100%/3*2/5)]">Func</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[calc(100%/4-24px)] h-fit p-4 bg-cs_secondary_black rounded-xl">
        <h1 className="text-lg font-semibold mb-4">Shopping Information</h1>
        <p>
          <span>Name: {userInfo?.firstName + " " + userInfo?.lastName}</span>{" "}
          <br />
          <span>
            Phone: {userInfo?.phone ? userInfo?.phone : "No phone"}
          </span>{" "}
          <br />
          <span>Address: {userInfo?.city ? userInfo?.city : "No address"}</span>
        </p>
        <div className="mt-4 grid place-items-center">
          <Button className="!h-8 !text-lg !w-2/3">
            <Link href={"/auspan"}>Update</Link>
          </Button>
        </div>
        <div className="mt-8 p-4 bg-cs_tertiary_black rounded-xl">
          <h1 className="text-lg font-semibold mb-4">Cart Total</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Total quantity</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>0</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Cart Total</span>
              <span>0</span>
            </div>
          </div>
          <div className="mt-4 grid place-items-center">
            <Button className="!h-8 !text-lg !w-2/3 !bg-white !text-black">
              Check out
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
