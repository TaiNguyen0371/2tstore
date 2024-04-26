"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface IFooterProps {
  className?: string;
}
const Footer = (props: IFooterProps) => {
  return (
    <footer
      className={`h-80 bg-cs_secondary_black text-white flex justify-between py-8 px-40 ${props.className}`}
    >
      <div className="flex gap-40 w-3/4">
        <div>
          <h1 className="text-xl font-bold my-4">Category</h1>
          <ul>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold my-4">About</h1>
          <ul>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold my-4">Contact</h1>
          <ul>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
            <li>
              <Link href="/">Link</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex w-1/4 gap-3">
        <Icon className="size-10" icon="mdi:facebook" />
        <Icon className="size-10" icon="mdi:instagram" />
        <Icon className="size-10" icon="mdi:youtube" />
      </div>
    </footer>
  );
};
export default Footer;
