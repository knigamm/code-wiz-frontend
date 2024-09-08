"use server";

import getSession from "../lib/getsession";

export const sendMessageToChatbot = async (query: string) => {
  try {
    const session = getSession()?.value;
    const response = await fetch(`${process.env.BASE_URL}/api/bot/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${session}`,
      },
      body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    return { success: true, answer: data.answer };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      answer: "Something went wrong!! Reload and try again.",
    };
  }
};
