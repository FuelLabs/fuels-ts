import { ReactNode, useRef } from 'react';

import { toast, Id, TypeOptions } from 'react-toastify';

/**
 * Hook to handle app notifications
 */
export const useNotification = () => {
  const notification = useRef<Id | null>(null);

  const onClose = () => {
    notification.current = null;
  };

  const showNotification = (render: string | ReactNode, type: TypeOptions) => {
    if (notification.current) {
      toast.update(notification.current, { render, type, onClose });
    } else {
      notification.current = toast.info(render, { onClose });
    }
  };

  return {
    infoNotification: (render: string | ReactNode) => showNotification(render, 'info'),
    successNotification: (render: string | ReactNode) => showNotification(render, 'success'),
    errorNotification: (render: string | ReactNode) => showNotification(render, 'error'),
  };
};
