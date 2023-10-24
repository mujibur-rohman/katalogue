export default function useValidationImage({
  maxSize,
  extPermissions,
}: {
  maxSize: number;
  extPermissions: string[];
}) {
  const validateImage = (img: File) => {
    if (img) {
      if (!extPermissions.includes(img.type)) {
        throw new Error("image not valid");
      }
      if (img.size >= maxSize) {
        throw new Error("image too large");
      }
      return img;
    }
  };

  return { validateImage };
}
