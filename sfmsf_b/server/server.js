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

// const ojacks7 = path.join(__dirname, "ojacks7");
// const tgeor7 = path.join(__dirname, "tgeor7");
// const jdoe = path.join(__dirname, "jdoe");

let userO = "o";
let userT = "t";
let userJ = "j";

app.use(cors(corsConfig));
app.use(express.json());

// ( Custom Middleware )
app.use(logger);

let unique_ID = 0;
// Get File Name
let filename = "";

// ( Set Storage )
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    unique_ID++;
    // return cb(null, `${file.originalname}`); // ( By Name )
    filename += file.originalname;
    return cb(null, `${unique_ID}_${file.originalname}`); // ( By ID )
  },
  destination: function (req, file, cb) {
    // set destination logic here
    return cb(null, "./files");
  },
});
const upload = multer({ storage });

// ( Upload : POST Route(s) )
// app.post("/username/:username", (req, res) => {
//   const { message } = req.body;

//   // Do something with the message (e.g., log it)
//   console.log("Received message:", message);

//   // Send a response back to the client
//   res
//     .status(200)
//     .json({ success: true, message: "Message received successfully" });
// });
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

  console.log(req.files);
});

// ( Delete : DELETE Route(s) )
app.delete("/delete/:username/:fileName", (req, res) => {
  unique_ID--;
  // const { message } = req.body;
  const fname = req.params.fileName;
  console.log(`User Deleted File: ${fname}`);
  // console.log(`Filename : ${fname}`);
  const filePath = path.join(filesDirectory, fname);

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
