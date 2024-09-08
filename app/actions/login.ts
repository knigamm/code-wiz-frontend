"use server";
import { redirect } from "next/navigation";
import { loginform } from "../lib/utils";

import { cookies } from "next/headers";

const OTP_TOKEN_AGE = 60 * 5;
const ACCESS_TOKEN_AGE = 60 * 60 * 24;

export const loginaction = async (formdata: FormData) => {
  const validatedFields = loginform.safeParse({
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });
    const data = await response.json();
    cookies().set("otp_token", data.otp_token, {
      maxAge: OTP_TOKEN_AGE,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
  redirect("/login/auth");
};

export const otpaction = async (formdata: FormData) => {
  const otp = formdata.get("otp_value");

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies().get("otp_token")?.value}`,
        },
        body: JSON.stringify({ otp: otp }),
      }
    );
    const data = await response.json();
    if (data && data.detail) {
      return {
        errors: {
          otp: "Invalid OTP",
        },
      };
    }
    cookies().set("session", data?.access_token, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_AGE,
    });
    cookies().delete("otp_token");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
  redirect("/");
};

export const resendotpaction = async () => {
  try {
    await fetch(`${process.env.BASE_URL}/api/auth/resend-otp`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${cookies().get("otp_token")?.value}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
