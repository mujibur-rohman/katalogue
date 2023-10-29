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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const session = useSession();
  return (
    <nav className="bg-background flex items-center justify-between px-3 md:px-12 py-5">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={124}
          height={10}
          priority
          style={{ height: "auto", width: "auto" }}
        />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session.data?.user.profilePicture} />
            <AvatarFallback>{session.data?.user.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="translate-x-[-25%]">
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
