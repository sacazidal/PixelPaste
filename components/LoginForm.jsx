"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/utils/validate";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import LoaderComponent from "./loaderComponent";

const LoginForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();
  const handleSubmit = async (e) => {
    const supabase = createClient();

    e.preventDefault();

    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError("Неверный логин или пароль");
        setLoading(false);
        return;
      }
    } catch (error) {
      setError("Произошла ошибка");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
    setError("");
    replace("/");
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Вход</h1>
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
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Забыли пароль?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            className="dark:border-neutral-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-center text-red-600">{error}</div>
        )}
        <Button type="submit" className="w-full">
          {loading ? <LoaderComponent title={"Входим..."} /> : "Войти"}
        </Button>
      </div>
      <div className="text-center text-sm">
        У вас еще нет аккаунта?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
