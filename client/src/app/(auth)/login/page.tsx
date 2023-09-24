"use client";
import Link from "next/link";
import LoginForm from "./_components/login-form";

function Login() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-primary text-[2rem] md:text-[2.5rem]">
          <span className="text-primary font-semibold">Welcome</span>{" "}
          <span>back</span>
        </div>
        <span>How would you like to sign in?</span>
      </div>
      <LoginForm />
      <div>
        <p className="mt-2 text-sm">
          Don't have account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
