import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import config from "@/config";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasToken = Boolean(localStorage.getItem("accessToken"));
  const { data: userResponse } = useUserInfoQuery(undefined, { skip: !hasToken });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userResponse?.success && userResponse?.data) {
      const socketUrl = config.baseUrl || "http://localhost:5000";
      const newSocket = io(socketUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        // Provide placeholder auth token; middleware extracts full decoded JWT from HttpOnly cookie
        auth: {
          token: localStorage.getItem("accessToken") || "cookie-auth",
        },
      });

      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("Socket.io: Connected successfully, socket ID:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Socket.io: Disconnected");
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      setSocket(null);
      setIsConnected(false);
    }
  }, [userResponse]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
