//
const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;
    const fileExtensions = [];

    // Grabb the extension from each of the files inside the file Object
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Determine if File Extensions are allowed
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files are allowed.`.replaceAll(
          ",",
          ", "
        );
      return res, status(422).json({ status: "error", message });
    }

    next();
  };
};

module.exports = fileExtLimiter;
