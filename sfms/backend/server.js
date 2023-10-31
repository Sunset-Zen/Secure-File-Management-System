const express = require("express");
const cors = require("cors");
const fsPromises = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());

// Import / Read Files
const fileOps = async () => {
  try {
    // ( Reading the File )
    const fdata = await fsPromises.readFile(
      path.join(__dirname, "files", "lorem.txt"),
      "utf8"
    );
    // Create API => localhost path
    app.get("/api/home", (req, res) => {
      res.json({
        message: "Secure File Management System : Team B",
        file: fdata,
        people: ["File_1", "File_2", "File_3"],
      });
    });
    // Set up a listen path => start server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    if (error) throw error;
  }
};

fileOps(); // Calls File Managment System Operation
