"use server";

import { ConvexHttpClient } from "convex/browser";
import type { UserType } from "@/types/user";
import { api } from "../../convex/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
const convex = new ConvexHttpClient(convexUrl);

export async function createUser(user: UserType) {
  try {
    const result = await convex.mutation(api.users.createUser, {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      batch: user.batch,
      degree: user.degree,
      isMember: user.isMember,
    });
    return result;
  } catch (error) {
    console.error("Error creating user with Convex:", error);
    throw error;
  }
}
