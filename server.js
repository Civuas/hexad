import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/video/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../public", req.params.filename);
  res.sendFile(filePath, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": getMimeType(req.params.filename),
      "Accept-Ranges": "bytes",
    },
  });
});

function getMimeType(filename) {
  if (filename.endsWith(".m3u8")) return "application/x-mpegURL";
  if (filename.endsWith(".ts")) return "video/MP2T";
  return "application/octet-stream";
}

app.listen(PORT, () => {
  console.log(`🎥 HLS server running at port ${PORT}`);
});
