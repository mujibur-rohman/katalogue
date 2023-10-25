/* eslint-disable @next/next/no-img-element */
'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import ShowMainPhoto from './show-main-photo';
import useValidationImage from '@/lib/hooks/use-validation-image';
import { FormikConfig, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { TypePayloadProduct } from '@/actions/product';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/hooks/use-toast';

type Props = {};

function FormAddProduct({}: Props) {
  const [mainPhotoBlob, setMainPhotoBlob] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [errorThumbnail, setErrorThumbnail] = useState<string>('');
  const { validateImage } = useValidationImage({
    extPermissions: ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'],
    maxSize: 5000000,
  });
  const { toast } = useToast();

  const productConfig: FormikConfig<TypePayloadProduct> = {
    initialValues: {
      name: '',
      description: '',
      price: '',
      thumbnailId: null,
    },
    validationSchema: yup.object({
      name: yup.string().trim().required().max(64),
      description: yup.string().trim().required(),
      price: yup.string().trim().required().max(64),
      thumbnailId: yup.number().required('required photo'),
    }),
    onSubmit: async (values) => {
      console.log(values);
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
      e.target.value = '';
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message,
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
              '!ring-destructive border-destructive':
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
              formik.setFieldValue('price', e.target.value);
            }}
            onBlur={formik.handleBlur}
            className={cn({
              '!ring-destructive border-destructive':
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
            '!ring-destructive border-destructive':
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
          <label htmlFor="desc" className="font-medium inline-block mb-1">
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
                'relative w-32 h-32 border-dashed border-[1px] flex justify-center items-center rounded-lg',
                {
                  'border-destructive': formik.errors.thumbnailId,
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
      </FormikProvider>

      <Button type="submit">Add Product</Button>
    </form>
  );
}

export default FormAddProduct;