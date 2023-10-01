"use server";
import { fetcher } from "@/lib/api";
import { revalidatePath } from "next/cache";

const attributeEndpoint = "/attributes";

export type PaginationResponse = {
  limit: number;
  page: number;
  totalRows: number;
  data: { id: number; name: string }[];
};

export type TypeAttribute = {
  id: number;
  name: string;
};

export async function getAllAttributes({
  page = 1,
  limit = 12,
  userId,
}: {
  page?: number;
  limit?: number;
  userId: string;
}) {
  try {
    // await new Promise((res) => setTimeout(res, 4000));
    const attributes = await fetcher.get<PaginationResponse>(
      attributeEndpoint,
      {
        params: {
          limit,
          page,
          userId,
        },
      }
    );
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function deleteAttribute(id: number) {
  try {
    const attributes = await fetcher.delete(attributeEndpoint + "/" + id);
    revalidatePath("/attributes");
    return attributes.data;
  } catch (error: any) {
    console.log(error.message);
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function addAttribute(payload: { name: string; userId: string }) {
  try {
    const attributes = await fetcher.post(attributeEndpoint, payload);
    revalidatePath("/attributes");
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function updateAttribute(
  payload: { name: string },
  attrId: number
) {
  try {
    const attributes = await fetcher.put(
      `${attributeEndpoint}/${attrId}`,
      payload
    );
    revalidatePath("/attributes");
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}
