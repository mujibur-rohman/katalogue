"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profileApi from "@/lib/api/profile.api";
import { useToast } from "@/lib/hooks/use-toast";
import { ProfileType, ResponseProfile } from "@/lib/types/profile.type";
import { cn } from "@/lib/utils";
import { FormikConfig, useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

type Props = {
  profile: ResponseProfile;
};

export default function ProfileForm({ profile }: Props) {
  const { toast } = useToast();
  const [blobImg, setBlobImg] = useState("");
  const profileFormConfig: FormikConfig<ProfileType> = {
    initialValues: {
      name: profile.user.name,
      bio: profile.bio,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          // @ts-ignore
          formData.append(key, values[key]);
        }
        await profileApi.update({ userId: profile.userId, payload: formData });
        toast({
          variant: "success",
          title: "Profile Updated",
          description: "Update Successfully",
          duration: 2000,
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
          duration: 2000,
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().trim().required(),
      bio: yup.string().trim().required(),
    }),
  };

  const formik = useFormik(profileFormConfig);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center flex-col pt-5 px-3 md:px-12 gap-5"
    >
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-32 h-32">
          <AvatarImage src={blobImg || profile.profilePicture} />
          <AvatarFallback className="text-3xl">
            {profile.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <label
          htmlFor="profilePicture"
          className="cursor-pointer hover:bg-border transition-colors text-xs border-foreground/50 border-[1px] px-3 py-2 rounded"
        >
          Change Profile Picture
          <input
            id="profilePicture"
            type="file"
            name="profilePicture"
            className="invisible absolute"
            onChange={(event) => {
              if (event.target.files) {
                const file = event.target.files[0];
                formik.setFieldValue("profilePicture", file);
                const imgBlob = URL.createObjectURL(file);
                setBlobImg(imgBlob);
              }
            }}
          />
        </label>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Input
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
        <Textarea
          placeholder="Bio"
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={cn({
            "!ring-destructive border-destructive":
              formik.errors.bio && formik.touched.bio,
          })}
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          className="self-end"
        >
          {formik.isSubmitting ? "Loading" : "Save"}
        </Button>
      </div>
    </form>
  );
}
