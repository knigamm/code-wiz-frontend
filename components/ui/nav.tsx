"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

import logoutaction from "@/app/actions/logout";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/login/auth";
  if (hideNavbar) return;

  const logout = () => {
    logoutaction();
  };
  return (
    <>
      <div className="fixed w-full top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-black text-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <span className="text-lg font-medium">CodeWiz</span>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className=" hover:bg-iconhbg hover:text-iconhtext rounded-full"
              >
                <UserRound />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <text className="font-bold">Kshitij Nigam</text>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logout()}
                className="flex gap-2 items-center"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="text-left">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
