"use client";
import React, { createContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type OpenModal = {
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  children: React.ReactNode;
};

type Modal = {
  open: ({ children, title, description }: OpenModal) => void;
};

export const ModalContext = createContext<Modal>({
  open: () => {},
});

function ModalProvider({ children }: { children: React.ReactNode }) {
  //   const onChange = (open: boolean) => {
  //     if (!open) {
  //       onClose();
  //     }
  //   };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<React.ReactNode | string>();
  const [description, setDescription] = useState<React.ReactNode | string>();
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>();

  const openModal = ({ title, description, children }: OpenModal) => {
    setIsOpen(true);
    setTitle(title);
    if (description) {
      setDescription(description);
    }
    setChildrenModal(children);
  };

  return (
    <ModalContext.Provider value={{ open: openModal }}>
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{childrenModal}</div>
        </DialogContent>
      </Dialog>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
