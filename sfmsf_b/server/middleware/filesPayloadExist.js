const filesPayloadExists = (req, res, next) => {
  // If no files
  if (!req.files)
    return res.status(400).json({ status: "error", message: "Missing files" });
  next();
};

/* This midddleware sees if we have supplied the files or not */
module.exports = filesPayloadExists;
