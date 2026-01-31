import * as signalR from "@microsoft/signalr";
import { MeetingHub_URL } from "../api";

let connection: signalR.HubConnection;

export const startConnection = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(MeetingHub_URL as string) 
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => console.log("SignalR Connected"))
    .catch((err) => console.error("SignalR Connection Error:", err));

  return connection;
};

export const getConnection = () => connection;
