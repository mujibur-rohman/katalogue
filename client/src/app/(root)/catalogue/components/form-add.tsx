"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/lib/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { FormikConfig, useFormik } from "formik";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";

type Props = {};

function FormAdd({}: Props) {
  const [loadingSlug, setLoadingSlug] = useState(false);

  const catalogueConfig: FormikConfig<{
    name: string;
    description: string;
    slug: string;
    url: string;
  }> = {
    initialValues: {
      name: "",
      description: "",
      slug: "",
      url: "",
    },
    validationSchema: yup.object({
      name: yup.string().trim().required().max(64),
      description: yup.string().trim(),
      slug: yup.string().trim().required().max(64),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(catalogueConfig);

  const debouncedValue = useDebounce<string>(formik.values.slug, 500);

  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {debouncedValue}
      <div>
        <label htmlFor="name" className="font-medium inline-block mb-1">
          Title
        </label>
        <Input
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
            id="slug"
            placeholder="Slug"
            name="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn({
              "!ring-destructive border-destructive":
                formik.errors.slug && formik.touched.slug,
            })}
          />
          {formik.touched.slug && formik.errors.slug && (
            <span className="text-sm text-red-500">{formik.errors.slug}</span>
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
                https://google.com https://google.com https://google.com
                https://google.comffddwsfwf
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
        <Textarea id="desc" placeholder="Description" />
      </div>
      <div className="inline-block self-end">
        <Button variant="default">Publish Catalogue</Button>
      </div>
    </form>
  );
}

export default FormAdd;