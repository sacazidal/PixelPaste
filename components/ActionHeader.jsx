"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/context/UserContext";
import Loader from "./Loader";

const ActionHeader = () => {
  const { user, loading, role } = useUser();
  if (loading) return <Loader />;
  return (
    <div className="flex items-center gap-x-4">
      {user ? (
        <>
          {role === "admin" && (
            <Link href={"/admin/secret"}>
              <Button className="bg-red-600 text-white hover:bg-red-400">
                Админка
              </Button>
            </Link>
          )}
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <Button>Вход</Button>
          </Link>
          <Link href={"/register"}>
            <Button>Регистрация</Button>
          </Link>
        </>
      )}
    </div>
  );
};
export default ActionHeader;
