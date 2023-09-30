"use client";
import { addAttribute } from "@/actions/attribute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/lib/hooks/use-toast";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {};

function HeaderPage({}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [valueName, setNameValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await addAttribute({ name: valueName });
      toast({
        variant: "success",
        title: "Success",
        description: "Attribute Added",
        duration: 2000,
      });
      setLoading(false);
      setOpenModal(false);
      setNameValue("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Add Failed",
        description: error.message,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5 flex justify-between">
      <Modal
        title="New Attributes"
        isOpen={openModal}
        onClose={() => {
          setNameValue("");
          setOpenModal(false);
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Name"
            value={valueName}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
          <Button
            type="submit"
            disabled={!valueName || loading}
            className="self-end"
          >
            Add
          </Button>
        </form>
      </Modal>
      <span className="text-2xl font-bold">Atrributes</span>
      <Button className="flex gap-2" onClick={() => setOpenModal(true)}>
        <PlusIcon className="text-background" />
        <span>Add Attribute</span>
      </Button>
    </div>
  );
}

export default HeaderPage;
