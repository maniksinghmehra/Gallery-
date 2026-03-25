import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "photos.json");

export default function handler(req, res) {

  let photos = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    photos = JSON.parse(data);
  }

  if (req.method === "GET") {
    return res.status(200).json(photos);
  }

  if (req.method === "POST") {
    const { img, caption } = req.body;

    // 🔥 VALIDATION (important)
    if (!img || !img.startsWith("https://res.cloudinary.com")) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const newPhoto = { img, caption };

    photos.unshift(newPhoto);

    fs.writeFileSync(filePath, JSON.stringify(photos, null, 2));

    return res.status(200).json({ success: true });
  }
}