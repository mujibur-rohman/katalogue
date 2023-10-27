import { fetcher } from "@/lib/api";
import { TypeCatalogue } from "./catalogue";
import { revalidatePath } from "next/cache";

const productEndpoint = "/product";

export type PaginationResponseProduct = {
  limit: number;
  page: number;
  totalRows: number;
  data: TypeProduct[];
};

export type TypeProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  catalogueId: string;
  attributes: {
    attribute: {
      id: number;
      name: string;
    };
    item: {
      attributeItem: {
        id: number;
        name: string;
      };
    }[];
  }[];
  catalogue: TypeCatalogue;
  photos: {
    id: number;
    productId: number;
    fileName: string;
    url: string;
  }[];
  thumbnail: {
    id: number;
    productId: number;
    fileName: string;
    url: string;
  };
};

export type TypePayloadProduct = {
  catalogueId?: null | string;
  name: string;
  description: string;
  price: string;
  thumbnailId?: number | null;
  photos?: number[] | null;
  attributes:
    | {
        attributeId: number;
        itemId: number[];
      }[]
    | null;
};

export async function getAllProduct({
  page = 1,
  limit = 5,
  catalogueId,
}: {
  page?: number;
  limit?: number;
  catalogueId: string;
}) {
  try {
    const product = await fetcher.get<PaginationResponseProduct>(
      productEndpoint,
      {
        params: {
          limit,
          page,
          catalogueId,
        },
      }
    );
    return product.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function getOneProduct(id: string) {
  try {
    const product = await fetcher.get<TypeProduct>(productEndpoint + "/" + id);
    return product.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function addProduct(payload: TypePayloadProduct) {
  try {
    const product = await fetcher.post(productEndpoint, payload);
    // revalidatePath("/catalogue/[catalogueId]");
    return product.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}
