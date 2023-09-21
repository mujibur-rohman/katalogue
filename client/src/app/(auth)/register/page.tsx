"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import authApi from "@/lib/api/auth.api";
import { RegisterType } from "@/lib/types/auth.type";
import { cn } from "@/lib/utils";
import { FormikConfig, useFormik } from "formik";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

function Register() {
  const [togglePassword, setTogglePassword] = useState(true);
  const [togglePasswordConf, setTogglePasswordConf] = useState(true);
  const [errorServer, setErrorServer] = useState("");

  const formikConfig: FormikConfig<RegisterType> = {
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const { confirmPassword, ...payload } = values;
      try {
        const response = await authApi.register({
          ...payload,
          provider: "credential",
        });
        console.log(response);
      } catch (error: any) {
        console.log(error);
        setErrorServer(error.message);
      }
    },
    validationSchema: yup.object({
      name: yup.string().trim().required().min(3),
      email: yup.string().trim().required().email(),
      password: yup.string().trim().required().min(6),
      confirmPassword: yup
        .string()
        .required("confirm password is a required field")
        .trim()
        .oneOf([yup.ref("password")], "password must match"),
    }),
  };

  const formik = useFormik<RegisterType>(formikConfig);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-primary text-[2rem] md:text-[2.5rem]">
          <span className="text-primary font-semibold">Create Account</span>
        </div>
        <span className="text-sm">Create an account to explore Katalogue</span>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 rounded-md"
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="border-[1px] w-full py-3 rounded-full px-4 flex items-center gap-5">
            <img
              src="assets/images/google-logo.png"
              alt="Google Register"
              className="w-7 md:w-10 h-auto"
            />
            <span>Sign Up with Google</span>
          </div>
        </div>
        <div className="text-foreground/40 text-xs flex items-center my-2">
          <Separator className="w-10 grow" />
          <span className="px-2">or sign up with Email and Password</span>
          <Separator className="w-10 grow" />
        </div>
        <div className="flex flex-col gap-2">
          {errorServer ? (
            <div className="bg-red-100 flex justify-between text-sm px-4 py-3 rounded-lg text-red-500">
              <span>{errorServer}</span>
              <span onClick={() => setErrorServer("")}>
                <XIcon className="w-4 cursor-pointer" />
              </span>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Input
              placeholder="Name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={cn({
                "!ring-destructive border-destructive":
                  formik.errors.name && formik.touched.name,
              })}
            />
            {formik.errors.name && formik.touched.name && (
              <span className="text-sm text-destructive">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={cn({
                "!ring-destructive border-destructive":
                  formik.errors.email && formik.touched.email,
              })}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-sm text-destructive">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                type={togglePassword ? "password" : "text"}
                placeholder="Password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={cn("pr-10", {
                  "!ring-destructive border-destructive":
                    formik.errors.password && formik.touched.password,
                })}
                autoComplete="off"
              />
              {togglePassword ? (
                <EyeIcon
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute cursor-pointer right-3 top-[50%] translate-y-[-50%] w-5 text-gray-400"
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute cursor-pointer right-3 top-[50%] translate-y-[-50%] w-5 text-gray-400"
                />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <span className="text-sm text-destructive">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cpassword">Confirm Password</label>
            <div className="relative">
              <Input
                type={togglePassword ? "password" : "text"}
                placeholder="Confirm Password"
                id="cpassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={cn("pr-10", {
                  "!ring-destructive border-destructive":
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword,
                })}
              />
              {togglePassword ? (
                <EyeIcon
                  onClick={() => setTogglePasswordConf(!togglePasswordConf)}
                  className="absolute cursor-pointer right-3 top-[50%] translate-y-[-50%] w-5 text-gray-400"
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setTogglePasswordConf(!togglePasswordConf)}
                  className="absolute cursor-pointer right-3 top-[50%] translate-y-[-50%] w-5 text-gray-400"
                />
              )}
            </div>
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <span className="text-sm text-destructive">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>
        </div>
        <Button type="submit" disabled={formik.isSubmitting}>
          Register
        </Button>
      </form>
      <div>
        <p className="mt-2 text-sm">
          Already account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
