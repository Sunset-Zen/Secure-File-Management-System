// Import Modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Attributes
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  // const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logItem = `${dateTime}\t${message}\n`;

  try {
    // If the logs directory doesn't exist -> create directory logs
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // If Logs directory already exists -> add a new file : logname
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// Function Logger ( anonymous function used in server.js)
const logger = (req, res, next) => {
  // message , file to create or write to
  // (message, filename)
  // if(req.method == 'POST' && req.path == '/login'){
  //   logEvents(``)
  // }
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
