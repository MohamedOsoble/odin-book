import { io } from "socket.io-client";

export default function FileUpload(img, file) {
  //
}

export function dateToInput(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringMaxLength(string, n) {
  return string.slice(0, n);
}

export const socket = io("http://localhost:3000", {
  autoConnect: false,
  withCredentials: true,
});

export function chatDate(date) {
  const d = new Date(date);
  return d.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
