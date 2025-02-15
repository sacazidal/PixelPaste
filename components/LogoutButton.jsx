"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { push } = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    push("/login");
  };

  return <Button onClick={handleLogout}>Выход</Button>;
}
