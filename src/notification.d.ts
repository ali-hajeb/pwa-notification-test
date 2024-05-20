/* eslint-disable no-var */
// notification.d.ts
interface ExtendedNotificationOptions extends NotificationOptions {
    renotify?: boolean;
    vibrate?: number[];
}

declare var Notification: {
    new (title: string, options?: ExtendedNotificationOptions): Notification;
};
