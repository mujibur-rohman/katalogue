"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {
  return (
    <div className="flex items-center flex-col pt-5 px-3 md:px-12 gap-5">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-32 h-32">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-3xl">CN</AvatarFallback>
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
          />
        </label>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Input placeholder="Name" />
        <Textarea placeholder="Bio" />
        <Button className="self-end">Save</Button>
      </div>
    </div>
  );
}
