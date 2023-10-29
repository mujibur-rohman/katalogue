"use server";

import { fetcher } from "@/lib/api";
import { ResponseProfile } from "@/lib/types/profile.type";
import { revalidatePath } from "next/cache";

const profileEndpoint = "/profile";

export async function getProfile(userId: string) {
  try {
    const res = await fetcher.get<ResponseProfile>(
      profileEndpoint + "/" + userId
    );
    return res.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function updateProfile({
  payload,
  userId,
}: {
  payload: FormData;
  userId: string;
}) {
  try {
    const res = await fetcher.put(profileEndpoint + "/" + userId, payload);
    revalidatePath("/profile");
    return res.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}
