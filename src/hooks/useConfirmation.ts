import { useState } from 'react';

export const useConfirmation = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [confirmationPromise, setConfirmationPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setConfirmationPromise({ resolve });  // taking reference of resolve // promise will wait for resolve
    });
  };

  const handleConfirm = () => {
    confirmationPromise?.resolve(true); // here we are resolving the promise
    setIsOpen(false);
  };

  const handleCancel = () => {
    confirmationPromise?.resolve(false);
    setIsOpen(false);
  };

  return {
    confirm,
    confirmationProps: {
      isOpen,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }
  };
};