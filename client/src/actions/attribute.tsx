"use server";
import { fetcher } from "@/lib/api";
import { revalidatePath } from "next/cache";

const attributeEndpoint = "/attributes";

type PaginationResponse = {
  limit: number;
  page: number;
  totalRows: number;
  data: { id: number; name: string }[];
};

export async function getAllAttributes() {
  try {
    const attributes = await fetcher.get<PaginationResponse>(attributeEndpoint);
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function addAttribute(payload: { name: string }) {
  try {
    const attributes = await fetcher.post(attributeEndpoint, payload);
    revalidatePath("/attributes");
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw error.response.data.errors;
    }
    throw error.message;
  }
}
