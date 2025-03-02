import { createContext } from "react";

export type NotificationType = "success" | "info" | "warning" | "error";
type NotificationApi = {
  openNotification: (
    message: string,
    description: string,
    type: NotificationType
  ) => void;
};

export const NotificationsContext = createContext<NotificationApi>({
  openNotification: () => {},
});
