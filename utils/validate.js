import { emailRagex, passwordRagex } from "./ragex";

export const validateLoginForm = (email, password) => {
  if (!email) {
    return "Введите почту";
  } else if (!emailRagex) {
    return "Неверный формат почты";
  }

  if (!password) {
    return "Введите пароль";
  } else if (!passwordRagex) {
    return "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ";
  }

  return null;
};

export const validateRegisterForm = (
  email,
  password,
  firstName,
  lastName,
  passwordTwo,
  username
) => {
  if (!email) {
    return "Введите почту";
  } else if (!emailRagex) {
    return "Неверный формат почты";
  }

  if (!password || !passwordTwo) {
    return "Введите пароль";
  } else if (!passwordRagex) {
    return "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ";
  }

  if (!firstName) {
    return "Введите имя";
  } else if (firstName.length < 3) {
    return "Имя должно содержать минимум 3 символа";
  }

  if (!lastName) {
    return "Введите фамилию";
  } else if (lastName.length < 3) {
    return "Фамилия должна содержать минимум 3 символа";
  }

  if (passwordTwo !== password) {
    return "Пароли не совпадают";
  }

  if (!username) {
    return "Введите логин";
  } else if (username.length < 3) {
    return "Логин должен содержать минимум 3 символа";
  }

  return null;
};
