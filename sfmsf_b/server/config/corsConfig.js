// (Cross Origin Resource Sharing : Configurations)
// -> Establish path our Client uses to recieve data from Server

// Attribute(s)
const clientLocation = "https://localhost:3000";

// Function(s)
const corsConfig = {
  origin: (origin, callback) => {
    // if domain isnt in whitelist let it pass
    if (clientLocation) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsConfig; // export function to be used in ( server.js )
