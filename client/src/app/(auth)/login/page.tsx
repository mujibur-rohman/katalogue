"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useState } from "react";

function Login() {
  const [togglePassword, setTogglePassword] = useState(true);
  const [errorServer, setErrorServer] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-primary text-[2rem] md:text-[2.5rem]">
          <span className="text-primary font-semibold">Welcome</span>{" "}
          <span>back</span>
        </div>
        <span>How would you like to sign in?</span>
      </div>
      <form className="flex flex-col gap-3 rounded-md">
        <div className="flex flex-col gap-4 items-center">
          <div className="border-[1px] w-full py-3 rounded-full px-4 flex items-center gap-5">
            <img
              src="assets/images/google-logo.png"
              alt="Google Login"
              className="w-7 md:w-10 h-auto"
            />
            <span>Sign In with Google</span>
          </div>
        </div>
        <div className="text-foreground/40 text-xs flex items-center my-2">
          <Separator className="w-10 grow" />
          <span className="px-2">or sign with Email and Password</span>
          <Separator className="w-10 grow" />
        </div>
        <div className="flex flex-col gap-2">
          {errorServer ? (
            <div className="bg-red-100 flex justify-between text-sm p-4 rounded-lg text-red-500">
              <span>Email or password wrong</span>
              <span>
                <XIcon className="w-4 cursor-pointer" />
              </span>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Email"
              id="email"
              className={cn({
                "!ring-destructive border-destructive": true,
              })}
            />
            <span className="text-sm text-destructive">email salah</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              <p className="text-sm text-blue-500">Forgot Password?</p>
            </div>
            <div className="relative">
              <Input
                type={togglePassword ? "password" : "text"}
                placeholder="Password"
                id="password"
                className={cn("pr-10", {
                  "!ring-destructive border-destructive": true,
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
            <span className="text-sm text-destructive">email salah</span>
          </div>
        </div>
        <Button>Login</Button>
      </form>
      <div>
        <p className="mt-2 text-sm">
          Don't have account? <span className="text-blue-500">Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
