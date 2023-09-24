"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-background flex justify-between px-3 md:px-12 py-5">
      <Link href="/">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="w-[8rem] h-auto"
        />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              router.push("/profile");
            }}
          >
            <UserIcon className="text-foreground w-5" strokeWidth="1.25" />
            <p>Profile</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              signOut();
            }}
          >
            <LogOutIcon className="text-foreground w-5" strokeWidth="1.25" />
            <p>Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default Navbar;
