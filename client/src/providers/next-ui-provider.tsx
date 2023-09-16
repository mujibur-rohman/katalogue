"use client";

import { NextUIProvider } from "@nextui-org/react";

function NextUIProviderClient({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default NextUIProviderClient;
