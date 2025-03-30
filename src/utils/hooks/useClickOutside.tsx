import { RefObject, useCallback, useEffect, useState } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement | null>) => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setOpenModal(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", closeModal);

    return () => window.addEventListener("click", closeModal);
  }, []);

  return { openModal, setOpenModal };
};
