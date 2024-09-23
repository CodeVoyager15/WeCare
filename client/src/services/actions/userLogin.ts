"use server";
import { TFormValues } from "@/app/login/page";

export const userLogin = async (data: TFormValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
