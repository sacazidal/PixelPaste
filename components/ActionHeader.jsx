"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown } from "lucide-react";
import ToggleTheme from "./toggle-theme";
import AdminButton from "./AdminButton";

const ActionHeader = () => {
  const { user, loading, role } = useUser();
  if (loading) return <></>;
  return (
    <div className="flex items-center gap-x-2">
      <ToggleTheme />
      {user ? (
        <>
          {role === "admin" && <AdminButton />}
          <LogoutButton />
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-x-1 items-center border-0 outline-none focus:outline-none focus:ring-0">
                <Avatar className="w-8 h-8 mr-1">
                  <AvatarImage src={"/Anonymous.webp"} />
                  <AvatarFallback>{"?"}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{"anonymous"}</p>
                <ChevronDown size={13} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg">
                <DropdownMenuItem className="px-4 py-1 hover:bg-gray-100 dark:hover:border-neutral-800 flex justify-center">
                  <Link href={"/login"}>Вход</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-t border-gray-200 dark:border-neutral-800" />
                <DropdownMenuItem className="px-4 py-1 hover:bg-gray-100 dark:hover:border-neutral-800 flex justify-center">
                  <Link href={"/register"}>Регистрация</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
};
export default ActionHeader;
