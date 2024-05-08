import { getProfile } from "@/actions/auth";
import Button from "@/components/Button";
import OrdersOverview from "@/components/Pages/Cart/OrdersOverview";
import ProductList from "@/components/Pages/Cart/ProductList";
import Link from "next/link";

const Cart = async () => {
  // const userCart = await getCart();
  const userInfo = await getProfile();
  return (
    <main className="w-[calc(100%-160px)] mt-40 mb-20 mx-auto flex gap-12 justify-between">
      <div className="w-[calc(100%/4*3-24px)]">
        <ProductList />
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
            <Link href={"/auth"}>Update</Link>
          </Button>
        </div>
        <OrdersOverview />
      </div>
    </main>
  );
};

export default Cart;
