import { RefObject, useCallback, useEffect, useState } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement | null>) => {
  const [openModal, setOpenModal] = useState(false);
  
  const closeModal = useCallback((event: MouseEvent) => {
      if(!ref.current || !event.target) return
    if (ref.current.contains(event.target as HTMLElement) === false) {

      setOpenModal(false);
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener("click", closeModal);

    return () => window.removeEventListener("click", closeModal);
  }, [closeModal]);

  return { openModal, setOpenModal };
};
