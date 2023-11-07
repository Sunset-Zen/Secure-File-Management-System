/* Cross Origin List */

const whitelist = [
  "https://www.orjacksoniv.com",
  "https://www.google.com",
  "http://127.0.0.1:8080",
  "http://localhost:3000",
]; // list of domains that are allowed to access this backend server

const corsConfig = {
  origin: (origin, callback) => {
    // if domain ( website ) isn't in whitelist let it pass
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsConfig;
