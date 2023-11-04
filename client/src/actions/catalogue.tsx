"use server";
import { fetcher } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { TypeProduct } from "./product";

const catalogueEndpoint = "/catalogues";

export type PaginationResponseCatalogue = {
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
  products: TypeProduct[];
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

export async function editCatalogue({
  payload,
  id,
}: {
  payload: TypePayloadCatalogue;
  id: string;
}) {
  try {
    const catalogue = await fetcher.put(catalogueEndpoint + "/" + id, payload);
    revalidatePath("/catalogue");
    return catalogue.data;
  } catch (error: any) {
    if (error.response?.data.errors) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function deleteCatalogue(id: string) {
  try {
    const catalogue = await fetcher.delete(catalogueEndpoint + "/" + id);
    revalidatePath("/catalogue");
    return catalogue.data;
  } catch (error: any) {
    if (error.response?.data) {
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
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function watchCatalogue(id: string) {
  try {
    const catalogues = await fetcher.patch(catalogueEndpoint + "/watch/" + id);
    return catalogues.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}

export async function getOneCatalogueBySlug(slug: string) {
  try {
    const catalogues = await fetcher.get<TypeCatalogue>(
      catalogueEndpoint + "/slug/" + slug
    );
    return catalogues.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.errors);
    }
    throw new Error(error.message);
  }
}
