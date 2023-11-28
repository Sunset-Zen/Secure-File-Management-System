// Import Modules
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { logger, logEvents } = require("./middleware/logEvents");
const corsConfig = require("./config/corsConfig");
const path = require("path");
const fs = require("fs");

// ( Attributes )
const app = express();
const PORT = 5500;
const filesDirectory = path.join(__dirname, "files");
app.use(cors(corsConfig));
app.use(express.json());

// ( Custom Middleware )
app.use(logger);

let unique_ID = 0;

// ( Set Storage )
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./files");
  },
  filename: function (req, file, cb) {
    unique_ID++;
    // return cb(null, `${file.originalname}`); // ( By Name )
    return cb(null, `${unique_ID}_${file.originalname}`); // ( By ID )
  },
});
const upload = multer({ storage });

// ( Upload : POST Route )
app.post("/upload", upload.array("files"), (req, res) => {
  // As I iterate through uploaded files add a unique ID Key
  for (let i = 0; i < req.files.length; i++) {
    req.files[i].uid = i + 1;
  }
  console.log(req.files);
  console.log(req.body.uid);
});

// ( Delete : DELETE Route )
app.delete("/delete/:fileName", (req, res) => {
  unique_ID--;
  const fname = req.params.fileName;
  console.log(`Filename : ${fname}`);
  const filePath = path.join(filesDirectory, fname);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
