import "server-only";

import { v2 as cloudinary } from "cloudinary";

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 Mo
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"]);

export interface UploadResult {
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
}

/**
 * Envoie un fichier image vers Cloudinary et retourne son URL sécurisée.
 * Valide le type MIME et la taille AVANT l'envoi pour échouer proprement
 * plutôt que de laisser Cloudinary rejeter un fichier trop lourd ou
 * inattendu avec une erreur peu compréhensible pour l'admin.
 */
export async function uploadImage(file: File, folder: string): Promise<UploadResult> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Le stockage d'images (Cloudinary) n'est pas configuré. Contactez le développeur pour ajouter les variables CLOUDINARY_* dans l'environnement de production."
    );
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Format d'image non supporté. Utilisez JPG, PNG, WEBP, GIF ou SVG.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image trop lourde (8 Mo maximum). Compressez l'image puis réessayez.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `el-baraka-voyage/${folder}`, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(new Error(error?.message ?? "Échec de l'envoi de l'image."));
          return;
        }
        resolve({
          url: result.secure_url,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          format: result.format,
        });
      }
    );
    stream.end(buffer);
  });
}
