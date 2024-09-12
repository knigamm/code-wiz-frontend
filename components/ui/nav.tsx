import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MountainIcon, MoonIcon, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState, useEffect } from "react";




const Navbar = () => {
    
const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

// Toggle dark mode
const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      document.body.classList.toggle('dark', newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };
  

// Apply dark mode based on user preference or saved theme
useEffect(() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
    setIsDarkMode(true);
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, []);
    return(
        <>
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-medium">Acme Chatbot</span>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className=" hover:bg-iconhbg hover:text-iconhtext rounded-full">
                <UserRound/>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <div className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <div className="h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button onClick={toggleTheme} variant="ghost" size="icon" className="rounded-full hover:bg-iconhbg hover:text-iconhtext">
            <MoonIcon className="h-6 w-6 " />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
        </div>
      </div>
        </>
    )
}

export default Navbar