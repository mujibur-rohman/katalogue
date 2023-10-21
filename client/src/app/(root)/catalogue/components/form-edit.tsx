"use client";

import {
  TypeCatalogue,
  TypePayloadCatalogue,
  checkSlug,
  editCatalogue,
} from "@/actions/catalogue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/lib/hooks/use-debounce";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FormikConfig, useFormik } from "formik";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

type Props = {
  catalogue: TypeCatalogue;
};

function FormEdit({ catalogue }: Props) {
  const [slugError, setSlugError] = useState("");
  const [slugSuccess, setSlugSuccess] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const catalogueConfig: FormikConfig<TypePayloadCatalogue> = {
    initialValues: {
      name: catalogue.name,
      description: catalogue.description,
      slug: catalogue.slug,
      url: catalogue.url,
      userId: catalogue.userId,
    },
    validationSchema: yup.object({
      name: yup.string().trim().required().max(64),
      description: yup.string().trim(),
      slug: yup.string().trim().required().max(64),
    }),
    onSubmit: async (values) => {
      try {
        await editCatalogue({ id: catalogue.id, payload: values });
        router.replace("/catalogue");
        toast({
          variant: "success",
          description: "Catalogue edited",
          duration: 2000,
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: error.message,
          duration: 2000,
        });
      }
    },
  };

  const formik = useFormik(catalogueConfig);

  const debouncedValue = useDebounce<string>(formik.values.slug, 500);

  // * fetch slug available
  const checkAvailableSlug = async (slug: string) => {
    try {
      const result = await checkSlug(slug);
      setSlugSuccess(result.message);
      setSlugError("");
    } catch (error: any) {
      setSlugError(error.message);
      setSlugSuccess("");
    }
  };

  useEffect(() => {
    //* Triggers when "debouncedValue" changes
    if (debouncedValue && catalogue.slug !== debouncedValue) {
      checkAvailableSlug(debouncedValue);
    }

    if (catalogue.slug === debouncedValue) {
      setSlugError("");
      setSlugSuccess("");
    }
  }, [debouncedValue]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="font-medium inline-block mb-1">
          Title
        </label>
        <Input
          autoComplete="off"
          id="name"
          placeholder="Title"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={cn({
            "!ring-destructive border-destructive":
              formik.errors.name && formik.touched.name,
          })}
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-sm text-red-500">{formik.errors.name}</span>
        )}
      </div>
      <div className="flex flex-col items-start md:flex-row gap-4">
        <div className="w-full">
          <label htmlFor="slug" className="font-medium inline-block mb-1">
            Slug
          </label>
          <Input
            autoComplete="off"
            id="slug"
            placeholder="my-product"
            name="slug"
            value={formik.values.slug}
            onChange={(e) => {
              const regex = /^[a-zA-Z0-9^-]*$/;
              if (!regex.test(e.target.value)) return;
              formik.setFieldValue("slug", e.target.value);
              formik.setFieldValue(
                "url",
                process.env.NEXT_PUBLIC_SITE_URL + "/" + e.target.value
              );
            }}
            onBlur={formik.handleBlur}
            className={cn({
              "!ring-destructive border-destructive":
                formik.touched.slug && (formik.errors.slug || slugError),
              "!ring-green-500 border-green-500":
                formik.touched.slug &&
                !formik.errors.slug &&
                !slugError &&
                slugSuccess,
            })}
          />
          {formik.touched.slug && (formik.errors.slug || slugError) && (
            <span className="text-sm text-red-500">
              {formik.errors.slug || slugError}
            </span>
          )}
          {formik.touched.slug &&
            !formik.errors.slug &&
            !slugError &&
            slugSuccess && (
              <span className="text-sm text-green-500">{slugSuccess}</span>
            )}
        </div>
        <div className="overflow-hidden w-full">
          <label className="font-medium inline-block mb-1">Url</label>
          <div className="border-[1px] rounded-lg flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="p-2 bg-gray-100">
                <Link className="w-4 text-gray-500" />
              </div>
              <span className="text-gray-500 whitespace-nowrap overflow-hidden truncate">
                {formik.values.url}
              </span>
            </div>
            {/* <div className="px-2 cursor-pointer">
              <CopyIcon className="w-4 text-gray-500" />
            </div> */}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="desc" className="font-medium inline-block mb-1">
          Description
        </label>
        <Textarea
          autoComplete="off"
          id="desc"
          placeholder="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
      <div className="inline-block self-end">
        <Button type="submit" variant="default" disabled={formik.isSubmitting}>
          Update Catalogue
        </Button>
      </div>
    </form>
  );
}

export default FormEdit;
