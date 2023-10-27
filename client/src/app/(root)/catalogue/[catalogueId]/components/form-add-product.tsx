/* eslint-disable @next/next/no-img-element */
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import ShowMainPhoto from "./show-main-photo";
import useValidationImage from "@/lib/hooks/use-validation-image";
import { FormikConfig, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { TypePayloadProduct, addProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import UploadingLists from "./uploading-lists";
import { TypeAttribute } from "@/actions/attribute";
import AttributeForm from "./attribute-form";
import { useParams, useRouter } from "next/navigation";

function FormAddProduct({ attributes }: { attributes: TypeAttribute[] }) {
  const [mainPhotoBlob, setMainPhotoBlob] = useState("");
  const [othersPhoto, setOthersPhoto] = useState<
    { imgFile: File; blob: string; id: number }[]
  >([]);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const { validateImage } = useValidationImage({
    extPermissions: ["image/jpg", "image/jpeg", "image/png", "image/PNG"],
    maxSize: 5000000,
  });
  const router = useRouter();
  const { catalogueId } = useParams();
  const { toast } = useToast();

  const productConfig: FormikConfig<TypePayloadProduct> = {
    initialValues: {
      name: "",
      description: "",
      price: "",
      thumbnailId: null,
      photos: null,
      attributes: null,
    },
    validationSchema: yup.object({
      name: yup.string().trim().required().max(64),
      description: yup.string().trim().required(),
      price: yup.string().trim().required().max(64),
      thumbnailId: yup.number().required("required photo"),
    }),
    onSubmit: async (values) => {
      try {
        await addProduct({ ...values, catalogueId: catalogueId as string });
        toast({
          variant: "success",
          description: "Product add successfully",
          duration: 2000,
        });
        router.replace("/catalogue/" + catalogueId + "/products");
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: error.message,
          duration: 2000,
        });
      }
    },
  };

  const formik = useFormik(productConfig);

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files?.length) return;
      const img = e.target.files[0];
      validateImage(img);
      const blob = URL.createObjectURL(img);
      setMainPhotoBlob(blob);
      setImgFile(img);
      e.target.value = "";
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
        duration: 2000,
      });
    }
  };
  const handleOthersPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files?.length) return;
      const tempFile: {
        imgFile: File;
        blob: string;
        id: number;
      }[] = [];
      const files = e.target.files;
      for (let index = 0; index < files.length; index++) {
        const blob = URL.createObjectURL(files[index]);
        tempFile.push({ imgFile: files[index], blob, id: Date.now() });
      }
      setOthersPhoto((prev) => [...prev, ...tempFile]);
      e.target.value = "";
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
        duration: 2000,
      });
    }
  };

  const deleteOtherPhoto = useCallback(
    (id: number) => {
      const newPhotos = othersPhoto.filter((photo) => photo.id !== id);
      setOthersPhoto(newPhotos);
    },
    [othersPhoto]
  );
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mb-5">
      <div className="flex gap-2 items-start flex-col md:flex-row">
        <div className="w-full">
          <label htmlFor="name" className="font-medium inline-block mb-1">
            Product Name
          </label>
          <Input
            autoComplete="off"
            id="name"
            placeholder="Name"
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
        <div className="w-full">
          <label htmlFor="name" className="font-medium inline-block mb-1">
            Price
          </label>
          <Input
            autoComplete="off"
            id="price"
            placeholder="Price"
            name="price"
            value={formik.values.price}
            onChange={(e) => {
              const regex = /^\d+$/;
              if (!regex.test(e.target.value) && e.target.value.length) return;
              formik.setFieldValue("price", e.target.value);
            }}
            onBlur={formik.handleBlur}
            className={cn({
              "!ring-destructive border-destructive":
                formik.errors.price && formik.touched.price,
            })}
          />
          {formik.touched.price && formik.errors.price && (
            <span className="text-sm text-red-500">{formik.errors.price}</span>
          )}
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
          onBlur={formik.handleBlur}
          className={cn({
            "!ring-destructive border-destructive":
              formik.errors.description && formik.touched.description,
          })}
        />
        {formik.touched.description && formik.errors.description && (
          <span className="text-sm text-red-500">
            {formik.errors.description}
          </span>
        )}
      </div>
      <FormikProvider value={formik}>
        <div>
          <label htmlFor="mainPhoto" className="font-medium inline-block mb-1">
            Main Photo
          </label>
          {/* Main Photo Blob */}
          {mainPhotoBlob ? (
            <ShowMainPhoto
              handleThumbnail={handleThumbnail}
              imgFile={imgFile}
              blobImg={mainPhotoBlob}
            />
          ) : (
            <div
              className={cn(
                "relative w-32 h-32 border-dashed border-[1px] flex justify-center items-center rounded-lg",
                {
                  "border-destructive":
                    formik.touched.thumbnailId && formik.errors.thumbnailId,
                }
              )}
            >
              <label
                htmlFor="mainPhoto"
                className="absolute inset-0 opacity-0 cursor-pointer"
              ></label>
              <input
                id="mainPhoto"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 hidden"
                onChange={handleThumbnail}
              />
              <PlusIcon className="text-gray-500" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="desc" className="font-medium inline-block mb-1">
            Others Photo
          </label>
          <div
            className={cn(
              "relative w-32 h-32 border-dashed border-[1px] flex justify-center items-center rounded-lg"
            )}
          >
            <label
              htmlFor="photos"
              className="absolute inset-0 opacity-0 cursor-pointer"
            ></label>
            <input
              multiple
              id="photos"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 hidden"
              onChange={handleOthersPhoto}
            />
            <PlusIcon className="text-gray-500" />
          </div>
        </div>
        {othersPhoto.length ? (
          <div className="border-[1px] rounded-lg p-3 flex flex-col gap-3">
            {othersPhoto.map((photo) => (
              <UploadingLists
                key={photo.id}
                blob={photo.blob}
                imgFile={photo.imgFile}
                id={photo.id}
                deletePhoto={deleteOtherPhoto}
              />
            ))}
          </div>
        ) : null}
        <div>
          <label className="font-medium inline-block mb-1">
            Choose Attributes
          </label>
          <AttributeForm attributes={attributes} />
        </div>
      </FormikProvider>

      <Button type="submit">Add Product</Button>
    </form>
  );
}

export default FormAddProduct;
