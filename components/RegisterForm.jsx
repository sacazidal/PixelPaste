"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { validateRegisterForm } from "@/utils/validate";
import { createClient } from "@/utils/supabase/client";
import { EmailConfirmationDialog } from "./AlertDialog";
import { useRouter } from "next/navigation";
import LoaderComponent from "./LoaderComponent";

const RegisterForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { replace } = useRouter();

  const handleSubmit = async (e) => {
    const supabase = createClient();
    e.preventDefault();

    const validationError = validateRegisterForm(
      email,
      password,
      passwordTwo,
      username
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.code === "auth0|email_already_exists") {
          setError("Пользователь с такой почтой уже зарегистрирован");
        } else {
          setError("Произошла ошибка при регистрации");
        }
        setLoading(false);
        return;
      }

      const { data: insertError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          username,
        },
      ]);

      if (insertError) {
        setError("Произошла ошибка");
        setLoading(false);
        return;
      }

      setIsDialogOpen(true);
    } catch (error) {
      setError("Произошла ошибка");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    replace("/login");
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Регистрация</h1>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="dark:border-neutral-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              type="text"
              placeholder="darkness"
              className="dark:border-neutral-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              className="dark:border-neutral-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password2">Подтверждение пароля</Label>
            <Input
              id="password2"
              type="password"
              className="dark:border-neutral-700"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-sm text-center text-red-600">{error}</div>
          )}
          <Button type="submit" className="w-full">
            {loading ? (
              <LoaderComponent title={"Регистрируем..."} />
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          У вас уже есть аккаунт?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Войти
          </Link>
        </div>
      </form>
      <EmailConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDialogClose}
      />
    </>
  );
};
export default RegisterForm;
