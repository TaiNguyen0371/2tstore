import ForbiddenImage from "@/images/403.png";
import Image from "next/image";
const Forbidden = () => {
  return (
    <main className="h-screen grid place-items-center">
      <Image
        src={ForbiddenImage}
        width={0}
        height={0}
        sizes="100%"
        alt="2T Store Forbidden"
      />
    </main>
  );
};

export default Forbidden;
