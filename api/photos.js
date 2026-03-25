let photos = [];

export default function handler(req, res) {

  // GET → send photos to website
  if (req.method === "GET") {
    return res.status(200).json(photos);
  }

  // POST → receive from app
  if (req.method === "POST") {
    const { img, title, caption } = req.body;

    const newPhoto = {
      img,
      title,
      caption
    };

    photos.unshift(newPhoto);

    return res.status(200).json({ success: true });
  }
}