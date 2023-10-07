"use server";
import { fetcher } from "@/lib/api";
import { revalidatePath } from "next/cache";

const attributeItemEndpoint = "/attributes-item";

type PaginationResponseAttributeItem = {
  limit: number;
  page: number;
  totalRows: number;
  data: {
    id: number;
    name: string;
    attributeId: number;
    attribute: {
      id: number;
      name: string;
      userId: string;
    };
  }[];
};

export type TypeAttributeItem = {
  id: number;
  name: string;
  attributeId: number;
};

export async function getAllAttributeItem({
  page = 1,
  limit = 5,
  attributeId,
}: {
  page?: number;
  limit?: number;
  attributeId: number;
}) {
  try {
    const attributesItem = await fetcher.get<PaginationResponseAttributeItem>(
      attributeItemEndpoint,
      {
        params: {
          limit,
          page,
          attributeId,
        },
      }
    );
    return attributesItem.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function addAttributeItem(payload: {
  name: string;
  attributeId: number;
}) {
  try {
    const attributes = await fetcher.post(attributeItemEndpoint, payload);
    revalidatePath("/attributes");
    return attributes.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function deleteAttributeItem(id: number) {
  try {
    const attributes = await fetcher.delete(attributeItemEndpoint + "/" + id);
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

export async function updateAttributeItem(
  payload: { name: string },
  attrId: number
) {
  try {
    const attributes = await fetcher.put(
      `${attributeItemEndpoint}/${attrId}`,
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
