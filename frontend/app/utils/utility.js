import { io } from "socket.io-client";

export default function FileUpload(img, file) {
  //
}

export function dateToInput(date) {
  const inputDate = new Date(date);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringMaxLength(string, n) {
  return string.slice(0, n);
}

export const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
