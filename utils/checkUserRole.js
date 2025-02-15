import { createClient } from "@/utils/supabase/client";

export const checkUserRole = async (requireRole) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Вы не авторизованы" };
  }
  // проверяем роль
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
