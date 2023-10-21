"use server";
import { fetcher } from "@/lib/api";
import { revalidatePath } from "next/cache";

const catalogueEndpoint = "/catalogues";

type PaginationResponseCatalogue = {
  limit: number;
  page: number;
  totalRows: number;
  data: TypeCatalogue[];
};

export type TypeCatalogue = {
  id: string;
  name: string;
  description: string;
  url: string;
  slug: string;
  visitCount: number;
  userId: string;
  products: {}[]; // todo product type
};

export type TypePayloadCatalogue = {
  name: string;
  description: string;
  url: string;
  slug: string;
  userId: string;
};

export async function addCatalogue(payload: TypePayloadCatalogue) {
  try {
    const catalogue = await fetcher.post(catalogueEndpoint, payload);
    revalidatePath("/catalogue");
    return catalogue.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function checkSlug(slug: string) {
  try {
    const result = await fetcher.post(
      catalogueEndpoint + "/slug",
      {},
      {
        params: {
          slug,
        },
      }
    );
    return result.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function getAllCatalogues({
  page = 1,
  limit = 5,
  userId,
}: {
  page?: number;
  limit?: number;
  userId: string;
}) {
  try {
    const catalogues = await fetcher.get<PaginationResponseCatalogue>(
      catalogueEndpoint,
      {
        params: {
          limit,
          page,
          userId,
        },
      }
    );
    return catalogues.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function getOneCatalogue(id: string) {
  try {
    const catalogues = await fetcher.get<TypeCatalogue>(
      catalogueEndpoint + "/" + id
    );
    return catalogues.data;
  } catch (error: any) {
    console.log(error.response.status);
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}
