import { h, render } from "vue";
import Toast from "@/components/ui/Toast.vue";

interface ToastOptions {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export function useToast() {
  const showToast = (options: ToastOptions) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const vnode = h(Toast, {
      ...options,
      onVnodeUnmounted: () => {
        render(null, container);
        document.body.removeChild(container);
      },
    });

    render(vnode, container);

    setTimeout(() => {
      render(null, container);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, options.duration || 3000);
  };

  const success = (message: string, duration?: number) => {
    showToast({ message, type: "success", duration });
  };

  const error = (message: string, duration?: number) => {
    showToast({ message, type: "error", duration });
  };

  const warning = (message: string, duration?: number) => {
    showToast({ message, type: "warning", duration });
  };

  const info = (message: string, duration?: number) => {
    showToast({ message, type: "info", duration });
  };

  return {
    showToast,
    success,
    error,
    warning,
    info,
  };
}
