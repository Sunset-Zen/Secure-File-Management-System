// Import Modules ( Libraries )
const express = require("express");
const fsPromises = require("fs").promises;
const path = require("path");

// Attribute(s)
const app = express();
const PORT = 4444;

// Create API => localhost path && Import LDAP user pulled data here
app.get("/", (req, res) => {
  // JSON of LDAP User Data
  res.json({ message: "Secure File Management System Team B" });
});
// Create a PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
