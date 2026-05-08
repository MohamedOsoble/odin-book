export default function FileUpload(img, file) {
  const reader = new FileReader();
}

export function dateToInput(date) {
  const inputDate = new Date(date);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
