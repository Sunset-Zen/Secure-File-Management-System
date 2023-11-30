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
const oDirectory = path.join(__dirname, "ojacks7");
const tDirectory = path.join(__dirname, "tgeor13");
const jDirectory = path.join(__dirname, "jdoe");

app.use(cors(corsConfig));
app.use(express.json());

// ( Custom Middleware )
app.use(logger);

let unique_ID = 0;
let o_ID = 0;
let t_ID = 0;
let j_ID = 0;

// ( Set Storage )
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // return cb(null, `${file.originalname}`); // ( By Name )
    let username = req.params.username;
    if (username.includes("ojacks7")) {
      // let prev = o_ID;
      o_ID++;
      return cb(null, `${o_ID}_${file.originalname}`);
    } else if (username.includes("tgeor13")) {
      // let prev = t_ID;
      t_ID++;
      return cb(null, `${t_ID}_${file.originalname}`);
    } else if (username.includes("jdoe")) {
      // let prev = j_ID;
      j_ID++;
      return cb(null, `${j_ID}_${file.originalname}`);
    }
  },
  destination: function (req, file, cb) {
    // set destination logic here -> based on username ( unsure )
    let username = req.params.username;
    if (username.includes("ojacks7")) {
      return cb(null, "./ojacks7");
    } else if (username.includes("tgeor13")) {
      return cb(null, "./tgeor13");
    } else if (username.includes("jdoe")) {
      return cb(null, "./jdoe");
    } else {
      return cb(null, "./files");
    }
  },
});

// ( Condition ) ? { ... } : { ... }
const upload = multer({ storage });

// ( Upload : POST Route(s) )
app.post("/login/:username", (req, res) => {
  const { message } = req.body;

  // Do something with the message (e.g., log it)
  console.log("User Logged In:", message);

  // Send a response back to the client
  res
    .status(200)
    .json({ success: true, message: `${message} logged in successfully` });
});
app.post("/logout/:username", (req, res) => {
  const { message } = req.body;

  // Do something with the message (e.g., log it)
  console.log("User Logged Out:", message);

  // Send a response back to the client
  res
    .status(200)
    .json({ success: true, message: `${message} logged out successfully` });
});
app.post("/upload/:username/:fileName", upload.array("files"), (req, res) => {
  // As I iterate through uploaded files add a unique ID Key
  for (let i = 0; i < req.files.length; i++) {
    req.files[i].uid = i + 1;
  }
  const fname = req.params.fileName;
  console.log(`User Uploaded File: ${fname}`);
  res.status(200).json({ message: "File(s) uploaded successfully" });
  console.log(req.files);
});

// ( Delete : DELETE Route(s) )
app.delete("/delete/:username/:fileName", (req, res) => {
  const fname = req.params.fileName;
  let username = req.params.username;
  let filePath = "";
  if (username.includes("ojacks7")) {
    o_ID--;
    filePath += path.join(oDirectory, fname);
  } else if (username.includes("tgeor13")) {
    t_ID--;
    filePath += path.join(tDirectory, fname);
  } else if (username.includes("jdoe")) {
    j_ID--;
    filePath += path.join(jDirectory, fname);
  } else {
    unique_ID--;
    filePath += path.join(filesDirectory, fname);
  }

  console.log(`User Deleted File: ${fname}`);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ( Download : GET Route(s) )
app.get("/download/:username/:fileName", (req, res) => {
  const fname = req.params.fileName;
  try {
    res.download(`./files/${fname}`);
    res.status(200).json({ message: "File downloaded successfully" });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  console.log(`User Uploaded File: ${fname}`);
});
// ( Fetch : GET Route(s) )
app.get("/ojacks7", (req, res) => {
  req.files;
  res.json({});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
