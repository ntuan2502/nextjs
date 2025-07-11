// hooks/useSocket.ts
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const socket = io("http://localhost:3001"); // địa chỉ server NestJS

export function useSocketNotification() {
  useEffect(() => {
    socket.on("connect", () => {
      toast(`🔌 Connected to socket: ${socket.id}`);
    });

    socket.on("notification", (data) => {
      toast(`🔔 Notification received: ${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
