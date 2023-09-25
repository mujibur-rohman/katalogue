"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div className="flex items-center flex-col pt-5 px-3 md:px-12 gap-5">
      Home
    </div>
  );
}
