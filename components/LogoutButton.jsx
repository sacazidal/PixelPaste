"use client";

import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function LogoutButton() {
  const { logout, profile } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center gap-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-1 items-center border-0 outline-none focus:outline-none focus:ring-0">
          <Avatar className="w-8 h-8 mr-1">
            <AvatarImage src={"/UserAvatar.webp"} />
            <AvatarFallback>{"?" || profile.username[0]}</AvatarFallback>
          </Avatar>
          {profile && (
            <p className="text-sm">{profile.username || "anonymous"}</p>
          )}
          {profile && <ChevronDown size={13} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg">
          <DropdownMenuItem
            onClick={handleLogout}
            className="px-4 py-1 hover:bg-gray-100 dark:hover:border-neutral-800 flex justify-center"
          >
            <LogOut />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
