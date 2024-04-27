"use client";
import Button from "@/components/Button";
import FormIpt from "@/components/FormIpt";
import Logo from "@/images/logo.png";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
// Server Actions
import { signIn } from "@/actions/auth";

interface IForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [formError, setFormError] = useState<string>("");
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be 6 characters or more"),
    }),
    onSubmit: async (values: IForm) => {
      const data = await signIn(values);
      if (!data.data) {
        setFormError(data.message);
      }
    },
  });

  return (
    <main className="h-screen grid place-items-center pt-20">
      <div className="flex flex-col items-center gap-8 rounded-xl text-white bg-cs_secondary_black w-2/5 p-8 relative pt-20">
        <Image
          className="size-20 absolute top-0 left-0"
          src={Logo}
          width={0}
          height={0}
          sizes="100%"
          alt="2T Store"
        />
        <h1 className="text-4xl font-bold">Sign In</h1>
        {formError && <small className="text-red-600">{formError}</small>}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center gap-10"
        >
          <div className="w-full relative">
            {formik.errors.email && (
              <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
                {formik.errors.email}
              </small>
            )}
            <FormIpt
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full relative">
            {formik.errors.password && (
              <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
                {formik.errors.password}
              </small>
            )}
            <FormIpt
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full">
            <span>Dont&#39;s have an account? </span>
            <Link
              href={"/auth/signup"}
              className="hover:text-cs_primary_yellow font-semibold"
            >
              Sign Up
            </Link>
          </div>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
