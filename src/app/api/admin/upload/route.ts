import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

const ALLOWED_FOLDERS = new Set(["general", "contact"]);

export async function POST(req: Request) {
  try {
    await requireSession("editor");
  } catch {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folderRaw = formData.get("folder");
  const folder = typeof folderRaw === "string" && ALLOWED_FOLDERS.has(folderRaw) ? folderRaw : "general";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  try {
    const result = await uploadImage(file, folder);
    return NextResponse.json({ url: result.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Échec de l'envoi de l'image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
