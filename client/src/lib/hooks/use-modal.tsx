import { ModalContext } from "@/providers/modal-provider";
import { useContext } from "react";

export const useModal = () => {
  const { open } = useContext(ModalContext);

  return { open };
};
