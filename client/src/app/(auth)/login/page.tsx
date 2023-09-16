"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Login() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-primary text-[2.5rem]">
          <span className="text-primary font-semibold">Welcome</span>{" "}
          <span>back</span>
        </div>
        <span>How would you like to sign in?</span>
      </div>
      <form className="flex flex-col gap-3 rounded-md">
        <div className="flex flex-col gap-4 items-center">
          <div className="bg-slate-100 w-full py-4 rounded-full px-5">
            Login google
          </div>
        </div>
        <div className="text-foreground/40 text-xs flex items-center my-2">
          <Separator className="w-10 grow" />
          <span className="px-2">or sign with Email and Password</span>
          <Separator className="w-10 grow" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Username or Email</label>
            <Input placeholder="Email" id="email" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <Input placeholder="Password" id="password" />
          </div>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default Login;
