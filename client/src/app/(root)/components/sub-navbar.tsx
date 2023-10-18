"use client";
import SUB_MENUS from "@/lib/constants/sub-menus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {};

function SubNavbar({}: Props) {
  const pathname = usePathname();
  return (
    <div className="border-b-[1px] px-3 md:px-12 flex bg-background">
      {SUB_MENUS.map((menu) => (
        <div className="relative text-sm md:text-base" key={menu.path}>
          <Link
            className={cn("block transition-all w-full h-full py-3 px-4", {
              "font-medium": pathname.startsWith(menu.path),
            })}
            href={menu.path}
          >
            {menu.name}
          </Link>
          {pathname.startsWith(menu.path) && (
            <motion.div
              layoutId="border-menu"
              className="absolute border-b-[1px] border-blue-400 left-0 right-0 bottom-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SubNavbar;
