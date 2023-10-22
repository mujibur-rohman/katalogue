import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

function FormAddProduct({}: Props) {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex gap-2 items-start">
        <div className="w-full">
          <label htmlFor="name" className="font-medium inline-block mb-1">
            Product Name
          </label>
          <Input
            autoComplete="off"
            id="name"
            placeholder="Name"
            name="name"
            //   value={formik.values.name}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   className={cn({
            //     "!ring-destructive border-destructive":
            //       formik.errors.name && formik.touched.name,
            //   })}
          />
          {/* {formik.touched.name && formik.errors.name && (
          <span className="text-sm text-red-500">{formik.errors.name}</span>
        )} */}
        </div>
        <div className="w-full">
          <label htmlFor="name" className="font-medium inline-block mb-1">
            Price
          </label>
          <Input
            autoComplete="off"
            id="price"
            placeholder="Price"
            name="price"
            //   value={formik.values.name}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   className={cn({
            //     "!ring-destructive border-destructive":
            //       formik.errors.name && formik.touched.name,
            //   })}
          />
          {/* {formik.touched.name && formik.errors.name && (
          <span className="text-sm text-red-500">{formik.errors.name}</span>
        )} */}
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
          //   value={formik.values.description}
          //   onChange={formik.handleChange}
        />
      </div>
    </form>
  );
}

export default FormAddProduct;
