import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "photos.json");

export default function handler(req, res) {

  // Read existing data
  let photos = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    photos = JSON.parse(data);
  }

  // GET → return photos
  if (req.method === "GET") {
    return res.status(200).json(photos);
  }

  // POST → add new photo
  if (req.method === "POST") {
    const { img, caption } = req.body;

    const newPhoto = {
      img,
      caption
    };

    photos.unshift(newPhoto);

    fs.writeFileSync(filePath, JSON.stringify(photos, null, 2));

    return res.status(200).json({ success: true });
  }
}