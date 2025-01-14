import { toast, Zoom } from "react-toastify";

export const successAlert = (
  time: number,
  alertText: string,
  theme: string
) => {
  toast.success(alertText, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "Success",
    theme: theme,
    transition: Zoom,
  });
};

export const errorAlert = (time: number, alertText: string, theme: string) => {
  toast.error(alertText, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "error",
    theme: theme,
    transition: Zoom,
  });
};

export const warnAlert = (time: number, alertText: string, theme: string) => {
  toast.warn(alertText, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "warn",
    theme: theme,
    transition: Zoom,
  });
};
