// Import Modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import Middleware Functions
const filesPayloadExists = require("./middleware/filesPayloadExist");
const fileExtLimiter = require("./middleware/fileExtLimiter");

// Attributes
const app = express();
const PORT = 4000;
const corsConfig = require("./config/corsConfig");
const fileUpload = require("express-fileupload");

// ( Cross Origin Resource Sharing ) :  Establish path our Client uses to recieve data from Server
app.use(cors(corsConfig));
app.use(express.json());

// ( Middleware )

// Set Up Default API Route : (localhost:4000)
app.use("/", (req, res) => {
  res.json({});
});

// Set Up Upload Route : (localhost:4000/upload)
app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  console.log(files);

  // Write files to our server
  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "files", files[key].name);
    files[key].mv(filepath, (error) => {
      if (error)
        return res.status(500).json({ status: "error", message: error });
    });
  });

  return res.json({
    status: "success",
    message: Object.keys(files).toString(),
  });
});

/* ( Initiate Server ) : Set Up Listen Path */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Define Upload Router
// app.post(
//   "/upload",
//   fileUpload({ createParentPath: true }),
//   filesPayloadExists,
//   fileExtLimiter([".png", ".jpg", ".jpeg"]),
//   (req, res) => {
//     const files = req.files;
//     console.log(files);

//     // Write files to our server
//     Object.keys(files).forEach((key) => {
//       const filepath = path.join(__dirname, "files", files[key].name);
//       files[key].mv(filepath, (error) => {
//         if (error)
//           return res.status(500).json({ status: "error", message: error });
//       });
//     });
//     return res.json({
//       status: "success",
//       message: Object.keys(files).toString(),
//     });
//   }
// );
