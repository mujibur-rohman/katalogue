"use server";

import { fetcher } from "@/lib/api";

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
