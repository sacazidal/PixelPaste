import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const checkUserRole = async (requireRole) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Вы не авторизованы" };
  }

  const { data: currentUser, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError || !currentUser) {
    return { error: "Произошла ошибка при получении текущего пользователя" };
  }

  if (currentUser.role !== requireRole) {
    return { error: "Вы не являетесь администратором" };
  }

  return { user: currentUser };
};
