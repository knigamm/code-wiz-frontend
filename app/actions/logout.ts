"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutaction = () => {
  cookies().delete("session");
  redirect("/login");
};
export default logoutaction;
