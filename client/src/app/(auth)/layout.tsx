import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Catalogue",
};

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center overflow-x-hidden">
      <div className="flex flex-col gap-5 w-[90vw] md:w-[55vw] lg:w-[34vw]">
        <div className="border-divider rounded-lg p-5">{children}</div>
        <div className="flex flex-col gap-4 items-center">
          <img
            src="assets/images/logo.png"
            alt="logo"
            className="w-[12rem] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <h1 className="text-3xl text-primary font-semibold">
          Looking to streamline your product catalog management? We have the
          right solution! Welcome to our top-notch product catalog management
          app.
        </h1> */
}

export default AuthLayout;
