"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, usePathname } from "next/navigation";
import subMenus from "@/lib/constants/sub-menus";

type Props = {};

const subNavbarPath = ["/catalogue", "/attributes", "/profile"];

function SubNavbar({}: Props) {
  const pathname = usePathname();
  const { catalogueId } = useParams();

  const menus = subNavbarPath.includes(pathname)
    ? subMenus.SUB_MENUS
    : subMenus.SUB_MENUS_CATALOGUE(catalogueId as string);

  if (pathname.includes("/edit") || pathname.includes("/add")) {
    return null;
  }

  return (
    <div className="border-b-[1px] px-3 md:px-12 flex bg-background">
      {menus.map((menu) => (
        <div className="relative text-sm md:text-base" key={menu.path}>
          <Link
            className={cn("block transition-all w-full h-full py-3 px-4", {
              "font-medium": pathname.startsWith(menu.path),
            })}
            href={menu.path}
          >
            {menu.name}
          </Link>
          {pathname.includes(menu.path) && (
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
