"use client";
import { signUp } from "@/actions/auth";
import Button from "@/components/Button";
import FormIpt from "@/components/FormIpt";
import Logo from "@/images/logo.png";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";

interface IForm {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
const SignUp = () => {
  const initialValues = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be 6 characters or more"),
      confirmedPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values: IForm) => {
      const data = {
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        password: values.password,
      };
      const res = await signUp(data);
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
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center gap-10"
        >
          <div className="w-full relative">
            {formik.errors.firstName && (
              <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
                {formik.errors.firstName}
              </small>
            )}
            <FormIpt
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full relative">
            {formik.errors.lastName && (
              <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
                {formik.errors.lastName}
              </small>
            )}
            <FormIpt
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
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
          <div className="w-full relative">
            {formik.errors.confirmedPassword && (
              <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
                {formik.errors.confirmedPassword}
              </small>
            )}
            <FormIpt
              id="confirmedPassword"
              name="confirmedPassword"
              type="password"
              placeholder="Re-enter Password"
              value={formik.values.confirmedPassword}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full">
            <span>Exist an account? </span>
            <Link
              href={"/auth/signin"}
              className="hover:text-cs_primary_yellow font-semibold"
            >
              Sign In
            </Link>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
